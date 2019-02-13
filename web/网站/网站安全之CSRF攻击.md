# CSRF是什么？
* CSRF(Cross-site request forgery)。
* 中文名称：跨站请求伪造。
* 也被称为：one click attack/session riding，缩写为：CSRF/XSRF。

# CSRF可以做什么？
* 攻击者盗用了你的身份，以你的名义发送恶意请求。
* CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账等。
* 造成的问题包括：个人隐私泄露以及财产安全。

# 原理
* 第一步，用户访问普通网站A并在普通网站A登录。服务端返回sessionid记录到cookie，因设置cookie时有httpOnly，所以不用担心cookie被盗取。
* 第二步，用户访问攻击网站B。虽说攻击网站B无法获取到用户在普通网站A中的cookie(不是因为cookie设置的有httpOnly，而是因为浏览器限制了cookie无法跨主域携带)。
    - 但是重点是：从浏览器向普通网站A发出的任何请求中(此处特指以表单的submit形式进行提交的请求以及普通url触发的get请求)，默认都会携带普通网站A的cookie，无论是从哪个网站发出(划重点)。
* 第三步，利用第二步的原理。攻击网站B中请求了普通网站A中的一个点赞接口。
    - 请求方式可以是普通的url触发的get请求，例如：```<img src="http://www.a.com/praise" />```。
    - 请求方式可以是表单的submit方法触发的get请求和post请求。```<form method="post" action="http://www.a.com/praise"><button type="submit"></button></form>```
    - 普通网站A则会认为是用户点的赞。其实A并没有主动点赞。是攻击网站B冒充A点的赞。
    - 至此，一次攻击就完成了。
* 例外：xhr请求(ajax)例外。但是攻击者肯定不会使用xhr进行攻击的。
    - 因为ajax请求无法跨主域。
    - 如果允许跨主域，那么跨主域请求的时候默认不会携带cookie。
    - xhr请求不跨主域默认是会携带cookie的，跨子域想携带cookie需要把cookie的domain设置成```点+顶级域名```。

# 防御
* get一般不需要防御。所以功能型的接口不要使用get类型的请求。get应只用来做查询。但是要小心SQL注入。请看另一篇文章```./网站攻击之SQL注入.md```。
* 方案1：判断请求头中的 Referer 如果来源是自己网站的。才允许请求。
    - 客户端使用xhr发送请求时，请求头上的```Referer```能否被篡改？
    - 不能。修改会导致报错：```Refused to set unsafe header "Referer"```
    - 所以可以用请求头上的```Referer```属性防止CSRF攻击。
* 方案2：在请求参数中加入```csrftoken```字段。
    - npm网站的登录页使用的字段就是```csrftoken```。
    - 服务端生成一个随机token存储到redis。过期时间设置为30分钟即可。然后渲染到表单的隐藏域中。提交的时候验证token。验证失败则提示对应的错误。
    - 可以参考```./token-防止表单重复提交.md```。
    - 感觉和图文验证码机制有相似之处。
* 方案3(推荐)：使用jsonwebtoken做登录认证。jsonwebtoken在服务端验证时不依赖cookie中的数据。天生就可以防御。

# 客户端使用xhr发送请求时不允许被设置的请求头字段
w3c规定，当请求的header匹配以下不安全字符时，将被终止。
```
Accept-Charset
Accept-Encoding
Connection
Content-Length
Cookie
Cookie2
Content-Transfer-Encoding
Date
Expect
Host
Keep-Alive
Origin
Referer
TE
Trailer
Transfer-Encoding
Upgrade
User-Agent
Via
```
