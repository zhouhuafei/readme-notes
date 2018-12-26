# key
* 键

# value
* 值

# expires
* 过期时间

# domain
* 主域，不可以跨主域设置cookie，不过可以通过一些技术手段让，让需要被跨的那个站，配合一下进行实现，请继续往下看，下面有个解决方案1，可以让你做到跨域设置cookie。
    - A站请求C站的接口，此时跨了域（不管是跨子域还是主域，这种情况下都设置不上），C站即使响应了cookie也是设置不到A站上的。
* 给当前站点设置cookie时，让cookie可以跨子域携带过去。
    - 当前域设置cookie的时候主域前加个点即可，例如把cookie的domian设置成.sbxx.top那么凡是这个域名下的子域，都可以使用这个cookie。

# path
* 路径建议设置为/，这样就可以在别的路径下也可以读写

# secure属性
* 当设置为true时，表示创建的cookie会被以安全的形式向服务器传输，也就是只能在HTTPS连接中被浏览器传递到服务器端进行会话验证，如果是HTTP连接则不会传递该信息，所以不会被窃取到cookie的具体内容

# httponly
* 后端用这个属性设置cookie，前端用js无法读取被后端设置的cookie

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
* cookie的存储只和域名domain以及路径path有关，和端口无关，并不会因为不同的端口而导致cookie不一致。

# 后端允许ajax跨域请求，以及ajax请求携带cookie。
* 注意：经测试，ajax跨域携带cookie，Firefox浏览器支持，Chrome浏览器不支持，所以用此法验证登录不可行。
* nodejs使用cors模块或者如下：
```
# express
/*
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
    res.header('Access-Control-Allow-Credentials', true); // 允许带cookie(则Access-Control-Allow-Origin不允许是*号)(亲测Firefox浏览器支持，Chrome浏览器不支持)
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
```
* jq的ajax
```
$.ajax({
    url: 'http://127.0.0.1:5551/admin/api/verify-code-canvas/',
    xhrFields: {
        withCredentials: true, // 允许带cookie
    },
    crossDomain: true, // 允许跨域
});
```
* 总结：在后端允许，以及ajax请求设置上允许携带cookie以后。(Firefox浏览器支持，Chrome浏览器不支持，此法行不通)
    - 请求头里会有cookie信息。
    - 响应头里也可以进行set-cookie。
    - 此时跨主域设置cookie就没有任何问题了。那跨主域验证登录也就不成问题了。
    - 注意：Firefox浏览器支持，Chrome浏览器不支持，所以此法还是行不通的。
