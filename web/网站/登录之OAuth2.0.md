参考文档：http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

参考文档：https://www.cnblogs.com/flashsun/p/7424071.html

# OAuth2.0登录
OAuth是一个关于授权（authorization）的开放网络标准，在全世界得到广泛应用，目前的版本是2.0版。

# 授权过程简单梳理
* 1、
待续...

# 疑问
* 为什么OAuth2.0中access_token不能被直接返回，code可以。
    - 因为浏览器的redirect_uri是一个不安全的信道，虽然HTTPS安全但是可能会存在浏览器的cache或者log文件中，这就给攻击者盗取access_token带来了很多机会。但authorization_code不像access_token那么敏感。因为交换access_token不仅需要authorization_code还需要认证client的身份（即app_id，app_secret等）
* 回调域名是否需要在白名单里？
    - 在白名单里可以防止任何回调域名都可以接收到code。但是如此的话，本地开发就是个问题。
    - 不在白名单里，安全问题也可以不用担心吧。毕竟还有app_id和app_secret要验证。
    - 看情况自行斟酌吧。
