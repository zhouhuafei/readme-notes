# 请求方式TRACE
* HTTP的TRACE方法，该方法会返回浏览器发给服务器的所有请求信息，但该方法不能带body，主要是利于debug。

# XST是什么
* XST(Cross-Site Tracing)：跨站追踪。

# 触发XST攻击的主要条件
* 请求方式使用了TRACE。

# 攻击明细
* 该攻击主要是在网站存在XSS漏洞。但设置了cookie的HttpOnly属性的时候结合TRACE请求方式进行攻击。
    - cookie设置上HttpOnly属性可以防止XSS攻击盗取cookie。但是不能防止XST攻击盗取cookie。
* 如果某网站存在XSS漏洞，那比如用户点击a标签会执行一段脚本，那么该脚本可以异步发起一个TRACE请求，因为是同域，所以会带上cookie，然后服务器会把浏览器请求的信息全部返回来，其中包括cookie，我们可以在回调函数里解析然后上传到我们的服务器上去。
    - 如此，攻击就完成了。

# 建议
* 不要使用TRACE请求方式。

