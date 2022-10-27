# key
* 键

# value
* 值

# expires
* cookie不设置过期时间，则关闭浏览器后就过期。
    - (亲测火狐)如果利用浏览器的```恢复先前浏览状态```功能又打开之前的页面。则cookie依然会存在。
    - (亲测谷歌)关闭浏览器之后，cookie就自动清除了。不存在上述火狐类似的问题。
* sessionStorage则是关闭tab窗口就过期。

# domain
* 主域，不可以跨主域设置cookie，不过可以通过一些技术手段让，让需要被跨的那个站，配合一下进行实现，请继续往下看，下面有个解决方案1，可以让你做到跨域设置cookie。
    - A站请求C站的接口，此时跨了域（不管是跨子域还是主域，这种情况下都设置不上），C站即使响应了cookie也是设置不到A站上的。
* 给当前站点设置cookie时，让cookie可以跨子域携带过去。
    - 当前域设置cookie的时候主域前加个点即可，例如把cookie的domian设置成.sbxx.top那么凡是这个域名下的子域，都可以使用这个cookie。

# path
* 当访问网页的`/`路径时。
  - 只可以获取path为`/`的cookie。
  - 只可以删除path为`/`的cookie。
  - 设置cookie时可以随意指定path。不指定时则path默认为`/`。
* 当访问网页的`/goods`路径时。
  - 可以获取path为`/`和path为`/goods`的所有cookie。
  - 可以删除path为`/`和path为`/goods`的所有cookie。不指定path时则path默认为`/goods`。
  - 设置cookie时可以随意指定path。不指定时则path默认为`/goods`。
* 当访问网页的`/`路径时，在开发者工具中看不到`/goods`路径下的cookie。
  - 单页应用，从`/`路径跳转到`/goods`路径，也看不到`/goods`路径下的cookie。在控制台刷新cookie也看不到。
  - 只有在`/goods`路径下进行一次页面刷新才能看到`/goods`路径下的cookie。
* 二级path下的cookie可以获取和删除一级path下的cookie，依次类推，反之则不行。
* 建议path设置为`/`，这样在别的路径下也可以进行读写。
#### 做超导管理系统时 - 我踩了个关于path坑 - 下述为摘取的部分代码
```javascript
this.jumpToken();
if (!this.apiUserInfo.appId) {
  // 下述仅以商品清单编辑页举例，其他编辑页按照下述流程同样可以复现。
  // 开发环境，直接在浏览器地址栏贴入商品清单编辑页时，本地存储的homePage.apiUserInfo会先被this.jumpToken()设置为空，导致代码走入到此处。
  await this.getUserInformation();
  // 然后this.getUserInformation()会从cookie中读取accessToken并重新设置accessToken（问题出在此处，因重新设置accessToken时其path变成了/goods）。
  // 问题复现：回首页 - 刷新页面 - 后点击右上角退出登录 - 重新登录 - 在浏览器地址栏贴入/goods下的任意页面路径 - 进入页面失败 - 回到登录页。
  // 问题本质：在/路径下无法删除/goods下的cookie。在/goods下获取cookie时会优先获取/goods下的cookie。而/goods下的accessToken因重新登录已经失效了。
  // 解决方案：设置cookie时，path统一设置为/。出现上述问题的开发人员，在此文件的顶部打个断点后，去对应的路径下手动删除一下path为非/的cookie即可（手动删或等cookie过期）。
}
```

# 限制访问 Cookie
* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies#%E9%99%90%E5%88%B6%E8%AE%BF%E9%97%AE_cookie
#### HttpOnly属性
* JavaScript document.cookie API 无法访问带有 HttpOnly 属性的 cookie；此类 Cookie 仅作用于服务器。
#### Secure属性
* 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。它永远不会使用不安全的 HTTP 发送（本地主机除外），这意味着中间人攻击者无法轻松访问它。不安全的站点（在 URL 中带有 http:）无法使用 Secure 属性设置 cookie。但是，Secure 不会阻止对 cookie 中敏感信息的访问。例如，有权访问客户端硬盘（或，如果未设置 HttpOnly 属性，则为 JavaScript）的人可以读取和修改它。

# SameSite属性
> http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html
* Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。它可以设置三个值：`Strict、Lax、None`。
* Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。
* Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
* Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
  - 下面的设置无效。
  ```
  Set-Cookie: key=value; SameSite=None
  ```
  - 下面的设置有效。
  ```
  Set-Cookie: key=value; SameSite=None; Secure
  ```

# 跨域
跨域访问，简单来说就是 A 网站的 javascript 代码试图访问 C网站，包括提交内容和获取内容。由于安全原因，跨域访问是被各大浏览器所默认禁止的。跨域是浏览器的限制。

# 那么问题来了， 例如我当前在访问A站点，因为我等会儿要跳到C站点去登陆，但是我想知道我登陆前做了什么
* 解决方案1 - 已实践，此方案行得通
    - 把这些信息记录到C站点的cookie上，这时候就需要跨域设置cookie
    - 首先，我需要和C站点的后端配合，在他那边要有一个页面setCookie.html，负责接收postMessage传递过去的消息，并设置cookie
    - 其次，我当前站点有个隐藏的iframe，iframe的scr是C站点里的setCookie.html，当我执行一些操作想要记录的时候，我就通过这个iframe去postMessage一些信息过去，对方负责接收并设置cookie，就可以达到跨域设置cookie的效果了
    - 总结：前端通过postMessage解决cookie跨主域接收和设置的问题。在客户端可以对目标主域进行cookie设置。也可以让目标主域对当前主域进行cookie设置。
* 解决方案2 - 未实践，按理说行的通
    - 当我执行一些操作想要记录的时候，我就直接打C站的接口，让C站自行记录，但是这个接口要允许跨域，其实不允许跨域也没关系，毕竟我的消息是能传过去的，跨域导致的问题只是收到响应不能使用罢了。但是C站如果直接记录的话，也不妥，应该要判断域名，A站传过来的才记录。
    - 总结：后端允许跨域。和cookie无关。
* 解决方案3 - 未实践，按理说行的通
    - 当我执行一些操作想要记录的时候，我就直接打A站的接口，让A站的后端，通过服务端通信把数据带给C站的后端，当然这就是他们两个后端的事了，但是无论哪一种方案，都少不了你前端，看把你厉害的，先自行得瑟一会儿把
    - 总结：前端通过服务端通信解决跨主域携带数据的问题。通过这种方案也可以解决cookie跨主域传递和接收的问题。在客户端可以接收别的主域的接口想要带过来的cookie并设置到当前域。但是无法在客户端把cookie设置到目标域上。传递不代表可以设置。是否设置要看对方服务器和对方客户端的操作。

# 其他
* cookie的存储只和域名domain以及路径path有关。
* cookie的存储和端口port以及协议protocol无关，并不会因为不同的端口或不同的协议而导致cookie不一致。

# 服务端nodejs设置跨域
```
/*
express
设置跨域访问：此处配置的是全部请求('*')都允许跨域，其实应该指定某些接口允许跨域。
可以去api-super里，响应之前设置某一类接口都允许跨域。
也可以去某一个控制器里，单独对某一个接口设置跨域。
app.all的第一个参数'*'号换成特定的路由，也是可以的。例如：'/admin/'，'/admin/*'，'/admin/log*n/'，'/a*n/login/'。
app.all的第一个参数'*'号换成数组匹配多个路由，也是可以的。例如：['/admin/', '/admin/login/']。
app.all的第一个参数'*'号表示任意可有可无的单个或多个字符。
*/
app.all('*', function (req, res, next) {
    /*
    # Access-Control-Allow-Origin：允许指定域名跨域，本地开发需配置域名。*号表示全部域名。
    * 线上配置被允许跨域的域名案例：
        - http://s438520.m.whd.weishangye.com
    * 本地配置被允许跨域的域名案例：
        - http://127.0.0.1:5552
        - http://m.fy.shopex.loc.whd.cn:9056
    * 本地如果配置了虚拟域名，绑定了host，那么把这个虚拟域名填入即可。
    */
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5552');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Access-Control-Allow-Credentials', true); // 允许带cookie(则Access-Control-Allow-Origin不允许是*号)(不加这行浏览器会拦截掉请求并抛错导致跨主域携带cookie的请求无效化)
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
```

# xhr跨域携带cookie
> 案例：https://github.com/zhouhuafei/hello-world_cookie
* 服务端nodejs代码
```
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const cors = require('@koa/cors')


const app = new Koa()

app.use(cors())
app.use(koaBody())

router.get('/', async (ctx, next) => {
  // 服务端设置cookie(此处不涉及到跨域也不能跨域) ------ 开始
  const myDate = new Date()
  const myTime = myDate.getTime()
  const expires = 1
  myDate.setTime(myTime + expires * 24 * 60 * 60 * 1000) // 单位是天 1天 1/24天(1小时)
  myDate.setDate(myDate.getDate() + 1)
  ctx.cookies.set('key', 'value', {
    // secure: true, // 需要为https，否则sameSite的设置无效。
    // sameSite: 'none', // 不设置这个跨域请求携带cookie会报警告。
    path: '/',
    expires: myDate,
    httpOnly: false
  })
  // 服务端设置cookie(此处不涉及到跨域也不能跨域) ------ 结束
  console.log(`请求首页`, `ctx.cookies.get('key')`, ctx.cookies.get('key')) // 获取请求头里带过来的cookie。
  ctx.response.body = ctx.request
})

router.get('/cookie', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true) // 不加这行，浏览器会拦截掉请求并抛错，导致跨主域携带cookie的请求无效化。
  console.log(`请求cookie页`, `ctx.cookies.get('key')`, ctx.cookies.get('key')) // 获取请求头里带过来的cookie。
  ctx.response.body = ctx.request
})

app.use(router.routes()).use(router.allowedMethods())

console.log('http://127.0.0.1:3000')
app.listen(3000)
```
* web端js代码
```
// ajax
$.ajax({ url: 'http://127.0.0.1:3000/cookie?type=jquery', xhrFields: { withCredentials: true } })
// axios
axios.defaults.withCredentials = true // withCredentials为true表示允许携带cookie
axios({ url: 'http://127.0.0.1:3000/cookie?type=axios' })
```

# set-cookie的大小写问题
* axios应用在服务端和服务端通信的时候，可以使用```response.headers['set-cookie']```获取到要设置的cookie。
    - set-cookie小写？
    - 是的。axios会把headers中所有的字段都转成小写格式。
* axios应用在客户端和服务端通信的时候，无法使用```response.headers['set-cookie']```获取到要设置的cookie。
    - 换成大写也获取不到，因为根本没有对应字段。
    - 本质原因是xhr的协议规定客户端的response中不返回set-cookie字段。
* 服务端响应的时候，在响应头里设置时，Set-Cookie两个单词一般都是首字母大写。
    - 因在Chrome浏览器请求的响应头里看到过全小写的set-cookie。所以我不能确定首字母是否要必须大写。
* 真理补充：
    - http协议规定，Method是区分大小写的,而Header是不区分的。
    - 所以请求时设置GET/POST/PUT/DELETE等需要大写。
    - 响应时设置set-cookie大写小写都行。
    - 服务端接收request.headers中的信息时，headers中的键一般都是小写。
    - 客户端接收response.headers中的信息时，headers中的键一般都是小写。

# js - 删除全部的cookie
* https://github.com/js-cookie/js-cookie
    - 没提供删除全部cookie的方法
    - 但是提供了获取全部cookie的方法
    - 代码案例：
    ```
    const Cookies = require('js-cookie')
    Cookies.get() // { a: '1', b: '2' }
    ```
* 获取到每个cookie对应的key。然后一个一个的`Cookies.remove(keyName)`即可。
* 删除cookie的原理：让cookie对应的key过期即可。
