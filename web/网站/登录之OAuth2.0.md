参考文档：http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

参考文档：https://www.cnblogs.com/flashsun/p/7424071.html

# OAuth2.0登录
OAuth是一个关于授权（authorization）的开放网络标准，在全世界得到广泛应用，目前的版本是2.0版。

# 授权过程简单梳理
拿豆瓣的第三方授权登录之qq授权登录举例子。
* 0、去腾讯开发平台。申请授权权限。
    - 绑定域名。
    - 申请app_id和app_secret。
* 1、在豆瓣网站点击qq授权登录。
    - 回跳到qq的授权登录页面，并带上回调地址。
* 2、跳到qq的授权登录页。输入qq的账号和密码。登录之后回跳到豆瓣。
    - 回跳到豆瓣其实是回跳到豆瓣的接收code码的地址。
    - 也就是第一步中设定的回调地址。
* 3、豆瓣拿到code码之后。用app_id和app_secret以及code去换取access_token。
* 4、然后再用access_token去换取qq的用户信息。
* 5、拿到qq的用户信息之后，标记为qq授权登录进来的。存到数据库里。
* 6、剩下的就是豆瓣这边自己的操作了。例如生成jsonwebtoken返回给客户端。组织用户信息返回给客户端等。

# 疑问
* 为什么OAuth2.0中access_token不能被直接返回，code可以。
    - 因为浏览器的redirect_uri是一个不安全的信道，虽然HTTPS安全但是可能会存在浏览器的cache或者log文件中，这就给攻击者盗取access_token带来了很多机会。但authorization_code不像access_token那么敏感。因为交换access_token不仅需要authorization_code还需要认证client的身份（即app_id，app_secret等）
* 回调域名是否需要在白名单里？
    - 在白名单里可以防止任何回调域名都可以接收到code。但是如此的话，本地开发就是个问题。
    - 不在白名单里，安全问题也可以不用担心吧。毕竟还有app_id和app_secret要验证。
    - 看情况自行斟酌吧。
    
# 云起微商城的OAuth之内嵌iframe进行登录
* iframe的链接是用户平台的授权页面。但是回跳地址是当前应用对应域名下的页面。不存在跨域行为。
* 如此，在回跳地址页面，使用window.top进行页面跳转即可。
* 微商城用户平台的登陆页是使用表单(form)自带的submit进行提交的。后端处理的重定向。
    - xhr提交只能接收到响应结果，并不会主动进行页面重定向。如果服务端返回的是重定向的结果，那么在xhr中接收到的无非就是这个结果罢了。
    - 如果使用xhr登陆，则用户平台的登陆需要返回code码，然后再使用js携带code码进行重定向(重定向就是一条GET请求)。再然后就是微商城的服务使用这个code码去换token和用户信息。
    - 如果用户平台支持xhr登陆，只要满足用户平台的登陆规则，没必要内嵌iframe进行登陆，可以直接打用户平台的登陆接口拿code。然后交给服务端去换取token和用户信息。
    - 不过不建议如此做法，内嵌iframe是最利于维护的一种做法。请继续往下看。下文有解释。
* 为什么要内嵌iframe？直接form表单提交不行么？form表单的submit提交又不存在跨域问题。为什么不这么做呢？请继续往下看。下文有解释。

# 嵌套iframe vs 不嵌套iframe
> 表单form提交，不存在跨域问题，问什么不直接使用form表单，进行用户平台的登陆操作？而要使用内嵌iframe么？
* 内嵌iframe
    - 内嵌iframe不用自己的应用去维护登录页。全部都是用户平台那边去维护。
    - 内嵌iframe不用关心登陆页有没有csrftoken处理。
    - 内嵌iframe不用关心登陆页后续会不会加验证码。
    - 场景
    ```
    管理系统一般都是内嵌iframe，例如微商城的登陆。
    第三方平台的授权登陆一般都是跳到第三方平台的登录页面去登陆，例如qq授权登陆。
    两者的登陆原理一样的，都是登陆完毕(登陆平台)进行地址回跳，在回跳页和自家后端进行交互，交互完(登陆自家应用)再跳业务需要跳往的页面。区别就是前者被嵌套在iframe内，需要让window.top跳。后者window直接跳，做下兼容即可。
    ```
* 不嵌套iframe
    - 不管是直接使用ajax直接打用户平台的登陆，还是通过form表单的submit提交，都需要自己的应用去维护登陆。
    - 如果用户平台的登陆加了一个验证码，我方应用就要加一个验证码。这很不利与维护，很不人性化。

# 单页面登录
* 登录页内嵌iframe，iframe是第三方平台的登录页。
* 登陆完，页面会回跳到当前应用指定的路由，这个路由因是前端控制，所以前端要去拿code，拿到之后打后端登陆接口。
    - 后端得到code之后，带着code和第三方的access_token去拿用户信息。
    - 拿到用户信息之后返回当前应用的token给前端。
    - 前端存储token并跳到应用对应的业务页面。

# 第三方授权登陆
* 如果是用户端的第三方授权登陆，则需要跳到第三方平台的授权登录页去登陆。可以让用户有安全感。总不在自家平台让用户输入qq的账号和密码对吧。这对用户来说很不安全。
* 如果是自家的管理系统，要用自家的用户平台账号登陆，则内嵌iframe更为合适。
    - 自家的管理系统打用户中心的接口，是为了拿一些用户的数据进行同步，例如账号有没有到期，有没有续费等数据。其他数据还是存在当前应用对应的数据库中的。

# 案例：草动商城h5页面(单页面应用)进行微信授权登陆
* 步骤
    - 1、打接口时，带上当前页面的url(命名为callUrl且如果url上带有token则需要过滤掉)，接口检测此条请求有没有带token，如果没带token则返回302，并给一个重定向地址。js跳入这个地址，这个地址就是微信的授权地址，其中会附带上redirectUrl和callUrl。
    - 2、用户点击授权按钮，微信那边会跳入redirectUrl并附带code码。
    - 3、后端根据code码和秘钥换取access_token，然后再用access_token去换取微信的当前用户信息。再然后就是后端重定向到callUrl的链接，并附带当前应用的token。
    - 4、前端从url上拿到token。并存储token。后续打接口带上这个token即可。
* 优化：好处在于token不会暴露于url上。
    - 1、打接口时如果没有token，则前端拼接并跳往微信授权页，并附带callUrl和redirectUrl。
    - 2、用户点击授权按钮，微信那边会跳入redirectUrl并附带code码。
    - 3、前端在redirectUrl页接收code，并附带code码去打后端login接口。后端根据code码和秘钥换取access_token，然后再用access_token去换取微信的当前用户信息。并返回前端当前应用的token。
    - 4、前端从xhr的响应中拿到token。并存储token。后续打接口带上这个token即可。
* 官方文档：
    - https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
    - https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318590&token=&lang=zh_CN
* 链接分解
```
https://open.weixin.qq.com/connect/oauth2/authorize
?appid=wxbe39e7b6d26ff982
&redirect_uri=https://apiuat.icaodong.com/miniapp/wechat/login_callback
&response_type=code
&scope=snsapi_userinfo
&state=https%3A%2F%2Fh5.icaodong.com%2Ftest%2Ftask%2Farticle%3FtaskId%3D252%26ruleId%3D327%26step%3D4%26userId%3D8%26empId%3D31580
&component_appid=wxb2674d5aa8163384
#wechat_redirect
```
