# jwt怎么刷新token？
* token即将过期的前5分钟，带着尚未过期的token来换取新的token。并更新用户信息表里记录的登录戳来保证本次登录token的唯一性，并可以让老的token无效。
* 失效其实是假失效。token的验证还是可以通过的。不过登录戳的验证就通不过了。所以可以保证token的唯一性。
    - 登陆戳：
    - jsonwebtoken生成新token，老token如果还没过期，是可以继续使用的。
    - 所以使用登陆戳进行校验可以让老token验证通不过。
    - 登陆戳我是存在user表中的。每次登录都修改登陆戳。
    - 登陆戳也可以用来做单设备登录。
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
    - 3、防止刷新token的请求也被存储起来。需要在入参中控制一下。
* 简单代码实现(盲写，未测试)：
```
var requestArr = [];
var isRefreshing = false;
function ajax(opts){
    var isRefreshToken = Date.now() - Cookies.get('tokenExpiresTime') < 600; // 提前10分钟刷新token。
    if(isRefreshToken){
        // 存储请求，此处会把刷新token的数据也存储起来。需要通过传参再特殊处理一下。
        if(opts.isSaveRequestWhenRefreshToken !== false){
            requestArr.push(opts);
        }
        // 刷新token，此处会无限递归。因为其他并发的请求会走到这里。刷新token的请求也会走到这里。所以需要一个变量做开关。
        if(!isRefreshing){
            isRefreshing = true;
            ajax({
                isSaveRequestWhenRefreshToken:false,
            }).then((res)=>{
                if(res.status === 'success'){
                    // 设置token到cookie等流程在这里执行。
                    Cookies.set('token', res.token, res.expiresDay);
                    Cookies.set('tokenExpiresTime', res.tokenExpiresTime, res.expiresDay);
                    // token刷新完毕。执行要触发的多条并发请求。
                    requestArr.forEach((opts2)=>{
                        ajax(opts2);
                    });
                    // 状态还原。
                    isRefreshing = false;
                    requestArr = [];
                }
            })
        }
        return;
    }
    // 后面是正式发起请求的流程。略。
}

module.exports=ajax;
```

# 交互体验
* 过期弹窗提示：登录信息已过期。去新页面登录。登录完毕再回来继续操作。
    - 直接刷新会导致当前页面用户操作了但未保存的所有数据丢失。

# 如果想像session那样自动刷新token
* 功能：session可以做每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟。
* 实现：做有状态的token。第一步是生成随机token。然后用redis存储token。每次请求(所有携带了token的请求)时都重新设置token在redis上的过期时间。
    - 并不是所有请求都会携带token。所以无法完全做到像使用session时那样。
    - 思考：既然使用jsonwebtoken，就不应该把思想靠拢到session上。就应该做无状态的。不然的话直接使用session不就可以了？
    - 建议：在客户端有请求时，判断token是不是快要过期了，如果快要过期了。则刷新token。如果已经过期了。则重新登录。
