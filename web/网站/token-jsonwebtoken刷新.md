# jwt怎么刷新token？
* token即将过期的前5分钟，带着尚未过期的token来换取新的token。并更新用户信息表里记录的登录戳来保证本次登录token的唯一性，并可以让老的token无效。
* 失效其实是假失效。token的验证还是可以通过的。不过登录戳的验证就通不过了。所以可以保证token的唯一性。
    - 登陆戳：
    - jsonwebtoken生成新token，老token如果还没过期，是可以继续使用的。
    - 所以使用登陆戳进行校验可以让老token验证通不过。
    - 登陆戳我是存在user表中的。每次登录都修改登陆戳。
    - 登陆戳也可以用来做单设备登录(刷新token让token无效化其实做的就是单设备登录的功能)。
* 打了更新token的接口之后。客户端的token也要更新。

# 刷新token时怎么解决并发问题？
* 并发案例：多文件上传。
* 如果客户端并发了10条请求。发请求的时候。刚好赶上了需要刷新token。
    - 因他们发送的瞬间获取到的token和过期时间都是一致的。
    - 当其中某一条请求刷新完token之后，重新生成了新token以及登录戳。
    - 则其他请求的token都会验证失败(虽然生成新的token，老的token不会过期，但是登录戳改变了，所以登录戳的验证是通不过的，所以验证会失败)。
* 解决思路：
    - 先刷新token。再执行者10条请求。
* 解决方案：
    - 1、为了防止多次刷新token。先弄个计数器默认为0。需要刷新token时让计数器++，当计数器为1的时候才刷新token。刷新完重置为0。
        - 或者弄个isRefreshing默认为false的开关。和计数器原理是一样的。刷新时为true。刷新完重置为false。
    - 2、如果发现需要刷新token，则执行请求之前，把要请求的数据先存到一个数组中。当token刷新完毕之后，循环去发起请求。循环完毕再清空数组。
    - 3、防止刷新token的请求也走到刷新的内部逻辑中去。要添加入参控制。
        - 刷新的token的时候不判断token是否过期，要跳过请求的存储等逻辑。
* 简单代码实现(盲写，未测试)：
```
var requestArr = [];
var isRefreshing = false;
function ajax(opts){
    var isRefreshToken = Date.now() - Cookies.get('tokenExpiresTime') < 600; // 提前10分钟刷新token。
    // 这里如果不用opts.isValidateExpiresTime过滤一下，则刷新token的请求也会走到内部去。
    if(opts.isValidateExpiresTime !== false && isRefreshToken){
        requestArr.push(opts); // 存储请求。
        if(!isRefreshing){ // 防止客户端并发请求多次刷新token。
            isRefreshing = true;
            ajax({
                isValidateExpiresTime: false,
            }).then((res)=>{
                if(res.status === 'success'){
                    // 设置token到cookie等流程在这里执行。
                    Cookies.set('token', res.token, res.expiresDay);
                    Cookies.set('tokenExpiresTime', res.tokenExpiresTime, res.expiresDay);
                    // token刷新完毕。执行要触发的多条并发请求。
                    requestArr.forEach((opts2)=>{
                        ajax(opts2);
                    });
                }
                // 请求完成(不管是失败还是成功)则状态还原。
                isRefreshing = false;
                requestArr = [];
            })
        }
        return;
    }
    // 后面是正式发起请求的流程。略。
    // return $.ajax({}); // 略。
}

module.exports=ajax;
```
* 使用axios拦截器可以自动实现上述代码。
    - 代码如下：
    ```
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 注：请求拦截器中config.method的值默认为get(外部不设置method，method值为get)，所以如果要兼容type和method的话，应该把type放在前面。即：config.method = config.type || config.method || 'GET'
        // 在发送请求之前做些什么
        // return config; // config是请求的配置参数。重点：此处如果返回Promise对象，可以阻塞接口请求。如此直接就可以解决刷新token时的接口并发问题。
        // 以下是返回Promise对象的案例。
        // 注意：此处需要判断isInterceptRequest为false的话，直接return config，否则才return一个Promise对象。这么做的原因是因为刷新token的接口不需要拦截，否则会无线递归卡死。
        return new Promise(function (resolve, reject) {
            // 注意：此处判断token是否过期了。如果过期了做过期的处理。如果没过期做没过期的处理。
            setTimeout(function () { // 模拟等待refreshToken。注意：此处再次使用axios时，需要使用isInterceptRequest为false的字段过滤一下(实参)。否则会无限递归卡死。axios封装的函数中也要接收一下isInterceptRequest(形参)并给个默认值。
                resolve(config);
            }, 5000);
        });
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // const config = response.config; // config是请求的配置参数
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error.response); // error.response能读取到非200状态码中的响应数据。此行代码更换为`return error.response;`亦可。
    });
    ```
    - 问：响应拦截器中怎么获取配置数据？
    - 答：```response.config```。
    - 问：为什么请求拦截器中返回Promise对象就可以阻塞接口的请求？
    - 答：Promise可以被其他Promise锁定。axios内部应是做了更为细节的处理。
    ```
    Promise.resolve(
        new Promise((resolve,reject) => {
            console.log('inner Promise');
            resolve('123');
        }).then(data=>{
            console.log(1, typeof(data), data);
            return data+'4';
        })
    ).then(data=>{
        return Promise.resolve('Randy'+data);
    }).then(data=>{
        console.log(2, typeof(data), data)
    });
    ```
    输出
    ```
    inner Promise
    1 "string" "123"
    2 "string" "Randy1234"
    ```

# 交互体验1
* 过期弹窗提示：登录信息已过期。去新页面登录。登录完毕再回来继续操作。
    - 直接刷新会导致当前页面用户操作了但未保存的所有数据丢失。
* 建议：做个登录弹窗。
    - 普通接口报401，就跳到登录页。
    - 刷新token的接口如果提示token过期了则直接出登录弹窗让用户登录。
    - 如此可以减小因token过期导致数据没有来得及保存而使数据丢失的可能性。

# 交互体验2
* 如果想做的更好。可以把ajax中存储的未发送的请求导出来。等登录成功了。再重新触发之前因token过期而搁置的请求。
* 这样的话。ajax中刷新token的封装就需要改一下。要判断非401的请求下才进行requestArr变量的置空。
    - 存疑：外部修改模块内部变量的值。其他文件中引用这个模块时，这个值会变化么？
    - 解答：尚未尝试，如果导出的是对象应该是存在引用关系的。但是不建议修改模块内部对象的属性，因会很难查错，所以模块内部建议都当作只读的。
* 所以建议：还是请求完成就直接置空，但是置空前把requestArr深拷贝之后绑到响应结果中传出去。留着给外部登录完成之后使用。


# 如果想像session那样自动刷新token
* 功能：session可以做每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟。
* 实现：做有状态的token。第一步是生成随机token。然后用redis存储token。每次请求(所有携带了token的请求)时都重新设置token在redis上的过期时间。
    - 并不是所有请求都会携带token。所以无法完全做到像使用session时那样。
    - 思考：既然使用jsonwebtoken，就不应该把思想靠拢到session上。就应该做无状态的。不然的话直接使用session不就可以了？
    - 建议：在客户端有请求时，判断token是不是快要过期了，如果快要过期了。则刷新token。如果已经过期了。则重新登录。

# token注销以及修改密码和续签以及应用场景
摘自文章 https://blog.csdn.net/qq_28165595/article/details/80214994
## 应用场景：推荐
    - 一次性验证：比如用户注册后需要发一封邮件让其激活账户，通常邮件中需要有一个链接，这个链接需要具备以下的特性：能够标识用户，该链接具有时效性（通常只允许几小时之内激活），不能被篡改以激活其他可能的账户…这种场景就和 jwt 的特性非常贴近，jwt 的 payload 中固定的参数：iss 签发者和 exp 过期时间正是为其做准备的。
    - restful api 的无状态认证：使用 jwt 来做 restful api 的身份认证也是值得推崇的一种使用方案。客户端和服务端共享 secret；过期时间由服务端校验，客户端定时刷新；签名信息不可被修改…spring security oauth jwt 提供了一套完整的 jwt 认证体系，以笔者的经验来看：使用 oauth2 或 jwt 来做 restful api 的认证都没有大问题，oauth2 功能更多，支持的场景更丰富，后者实现简单。
## 应用场景：使用 jwt 做单点登录+会话管理(不推荐)
在《八幅漫画理解使用JSON Web Token设计单点登录系统》一文中提及了使用 jwt 来完成单点登录，本文接下来的内容主要就是围绕这一点来进行讨论。如果你正在考虑使用 jwt+cookie 代替 session+cookie ，我强力不推荐你这么做。
首先明确一点：使用 jwt 来设计单点登录系统是一个不太严谨的说法。首先 cookie+jwt 的方案前提是非跨域的单点登录(cookie 无法被自动携带至其他域名)，其次单点登录系统包含了很多技术细节，至少包含了身份认证和会话管理，这还不涉及到权限管理。如果觉得比较抽象，不妨用传统的 session+cookie 单点登录方案来做类比，通常我们可以选择 spring security（身份认证和权限管理的安全框架）和 spring session（session 共享）来构建，而选择用 jwt 设计单点登录系统需要解决很多传统方案中同样存在和本不存在的问题。以下一一详细罗列。
* jwt token泄露了怎么办？
    - 前面的文章下有不少人留言提到这个问题，我则认为这不是问题。传统的 session+cookie 方案，如果泄露了 sessionId，别人同样可以盗用你的身份。扬汤止沸不如釜底抽薪，不妨来追根溯源一下，什么场景会导致你的 jwt 泄露。
    - 遵循如下的实践可以尽可能保护你的 jwt 不被泄露：使用 https 加密你的应用，返回 jwt 给客户端时设置 httpOnly=true 并且使用 cookie 而不是 LocalStorage 存储 jwt，这样可以防止 XSS 攻击和 CSRF 攻击（对这两种攻击感兴趣的童鞋可以看下 spring security 中对他们的介绍CSRF,XSS）
* secret如何设计
    - jwt 唯一存储在服务端的只有一个 secret，个人认为这个 secret 应该设计成和用户相关的属性，而不是一个所有用户公用的统一值。这样可以有效的避免一些注销和修改密码时遇到的窘境。
    - secret 应该设计成和用户相关的属性(例如和用户被加密后的密码以及唯一id相关联)，不同用户不同 secret。如此，即使某个用户的secret被破解了，其他用户的secret还是安全的。
* 注销和修改密码
    - 传统的 session+cookie 方案用户点击注销，服务端清空 session 即可，因为状态保存在服务端。但 jwt 的方案就比较难办了，因为 jwt 是无状态的，服务端通过计算来校验有效性。没有存储起来，所以即使客户端删除了 jwt，但是该 jwt 还是在有效期内，只不过处于一个游离状态。分析下痛点：注销变得复杂的原因在于 jwt 的无状态。我提供几个方案，视具体的业务来决定能不能接受。
    - 仅仅清空客户端的 cookie，这样用户访问时就不会携带 jwt，服务端就认为用户需要重新登录。这是一个典型的假注销，对于用户表现出退出的行为，实际上这个时候携带对应的 jwt 依旧可以访问系统。
    - 清空或修改服务端的用户对应的 secret，这样在用户注销后，jwt 本身不变，但是由于 secret 不存在或改变，则无法完成校验。这也是为什么将 secret 设计成和用户相关的原因。
    - 借助第三方存储自己管理 jwt 的状态，可以以 jwt 为 key，实现去 redis 一类的缓存中间件中去校验存在性。方案设计并不难，但是引入 redis 之后，就把无状态的 jwt 硬生生变成了有状态了，违背了 jwt 的初衷。实际上这个方案和 session 都差不多了。
    - 修改密码则略微有些不同，假设号被到了，修改密码（是用户密码，不是 jwt 的 secret）之后，盗号者在原 jwt 有效期之内依旧可以继续访问系统，所以仅仅清空 cookie 自然是不够的，这时，需要强制性的修改 secret。在我的实践中就是这样做的。
* 续签问题
    - 续签问题可以说是我抵制使用 jwt 来代替传统 session 的最大原因，因为 jwt 的设计中我就没有发现它将续签认为是自身的一个特性。传统的 cookie 续签方案一般都是框架自带的，session 有效期 30 分钟，30 分钟内如果有访问，session 有效期被刷新至 30 分钟。而 jwt 本身的 payload 之中也有一个 exp 过期时间参数，来代表一个 jwt 的时效性，而 jwt 想延期这个 exp 就有点身不由己了，因为 payload 是参与签名的，一旦过期时间被修改，整个 jwt 串就变了，jwt 的特性天然不支持续签！
        * 如果你一定要使用 jwt 做会话管理（payload 中存储会话信息），也不是没有解决方案，但个人认为都不是很令人满意
    - 1.每次请求刷新 jwt
        * jwt 修改 payload 中的 exp 后整个 jwt 串就会发生改变，那…就让它变好了，每次请求都返回一个新的 jwt 给客户端。太暴力了，不用我赘述这样做是多么的不优雅，以及带来的性能问题。但，至少这是最简单的解决方案。
    - 2.只要快要过期的时候刷新 jwt
        * 一个上述方案的改造点是，只在最后的几分钟返回给客户端一个新的 jwt。这样做，触发刷新 jwt 基本就要看运气了，如果用户恰巧在最后几分钟访问了服务器，触发了刷新，万事大吉；如果用户连续操作了 27 分钟，只有最后的 3 分钟没有操作，导致未刷新 jwt，无疑会令用户抓狂。
    - 3.完善 refreshToken
        * 借鉴 oauth2 的设计，返回给客户端一个 refreshToken，允许客户端主动刷新 jwt。一般而言，jwt 的过期时间可以设置为数小时，而 refreshToken 的过期时间设置为数天。我认为该方案并可行性是存在的，但是为了解决 jwt 的续签把整个流程改变了，为什么不考虑下 oauth2 的 password 模式和 client 模式呢？
        * 步骤：后端生成返回俩个token给前端：accessToken、refreshToken。前者用于访问鉴权，后者用于刷新token。区别在于前者过期时间短，后者过期时间长。具体时长自己开心就好。
        * refreshToken也需要一个无效化的戳(登陆戳)。建议存在账号密码表中，因每个用户都有每个用户自己的refreshToken，建议命名为```loginStampRefreshToken```。accessToken的失效戳建议命名为```loginStampAccessToken```。如果用的session。建议命名为```loginStampSession```。
        * 问：为什么要用refreshToken而不是直接把accessToken设置为一个很长的时间？
        * 答：出于安全考虑才如此设计(相对安全)。因accessToken可以用来访问敏感数据。而refreshToken只有刷新token的接口使用(如此，刷新token的接口就要做成不登录也能使用的接口)。
        * 客户端刷新token的流程：接口如果返回401则打刷新token的接口进行token刷新，如果刷新token的接口也返回401则进行重新登录操作。其中还涉及到并发多条请求时要对请求进行存储以及当前是否正在进行token的刷新等一些细节处理。
        * 问：如果是在接口返回401之后处理。那要怎样存储并发的接口呢？
        * 答：思路错误，不应该在请求返回之后处理，应该在请求之前根据过期时间进行处理(建议提前5分钟刷新，这样可以防止临界值时间接口401)。任何接口响应了401(按照流程应该是只有刷新token的接口会返回401。因为token过期了应该先调刷新token的接口并阻塞其他接口)，都应该去重新登录。如果refreshToken过期就没必要打刷新token的接口了，直接重新登录即可。
            - 注：以上有误，其实不提前5分钟也没关系，因为是请求前进行拦截。但是过期时间的判断一定要有！
    - 4.使用 redis 记录独立的过期时间
        * 实际上我的项目中由于历史遗留问题，就是使用 jwt 来做登录和会话管理的，为了解决续签问题，我们在 redis 中单独会每个 jwt 设置了过期时间，每次访问时刷新 jwt 的过期时间，若 jwt 不存在与 redis 中则认为过期。
        * 同样改变了 jwt 的流程，不过嘛，世间安得两全法。我只能奉劝各位还未使用 jwt 做会话管理的朋友，尽量还是选用传统的 session+cookie 方案，有很多成熟的分布式 session 框架和安全框架供你开箱即用。
## 总结
在 web 应用中，使用 jwt 代替 session 存在不小的风险，你至少得解决本文中提及的那些问题，绝大多数情况下，传统的 cookie-session 机制工作得更好。jwt 适合做简单的 restful api 认证，颁发一个固定有效期的 jwt，降低 jwt 暴露的风险，不要对 jwt 做服务端的状态管理，这样才能体现出 jwt 无状态的优势。
