# XSS是什么？
* XSS, 即为（Cross Site Scripting）, 中文名为跨站脚本, 是发生在目标用户的浏览器层面上的，当渲染DOM树的过程成发生了不在预期内执行的JS代码时，就发生了XSS攻击。
* XSS攻击全称跨站脚本攻击，是为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS，XSS是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。
* 跨站脚本的重点不在‘跨站’上，而在于‘脚本’上。大多数XSS攻击的主要方式是嵌入一段远程或者第三方域上的JS代码。实际上是在目标网站的作用域下执行了这段js代码。
* 和SQL注入类似。

# 原理
* 注入js脚本。伺机进行一系列攻击。

# 反射型 XSS
反射型XSS：非持久化，需要欺骗用户自己去点击链接才能触发XSS代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面。
* 总结：把js脚本注入到url的查询字符串中。

# 存储型 XSS
存储型XSS：存储型XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种XSS比较危险，容易造成蠕虫，盗窃cookie（虽然还有种DOM型XSS，但是也还是包括在存储型XSS内）。
* 总结：把js脚本注入到数据库中存储。渲染模板的时候，则会触发。
* DOM型XSS案例：```<img src="null" onerror='alert(document.cookie)' />```

# 危害
* 通过document.cookie盗取cookie。
* 使用js或css破坏页面正常的结构与样式。
* 流量劫持（通过访问某段具有window.location.href定位到其他页面）。
* Dos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应。
* 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作。

# 供给渠道
* 留言板中输入js代码。如果后端渲染时不做处理，则js代码就会被触发。
* 富文本中输入js代码。如果后端渲染时不做处理，则js代码就会被触发。

# 个人总结
* 代码不严谨才会被XSS攻击。用户输入的东西都应该当做字符串处理。

# 防御
* 给关键cookie设置httpOnly上防止cookie被盗。
* 使用成熟的富文本插件。因成熟的富文本插件自带XSS防御能力。例如：wangEditor。https://github.com/wangfupeng1988/wangEditor/
    - 如果富文本有源码编辑能力。那么请不要使用。因为源码编辑能力更容易遭到XSS攻击(如果后端接收内容时或者前端接收内容时没有对内容进行过滤的话)。
* 后端接收的内容和前端接收的内容都可以使用 https://github.com/leizongmin/js-xss 进行过滤之后再使用。
* 使用成熟的框架：像vue这种框架默认就可以防止XSS攻击。
* 后端渲染：使用成熟的模板渲染插件。因成熟的模板渲染插件自带XSS防御能力。例如：ejs。https://github.com/mde/ejs
    - ejs模板的防御能力也是有限的。
    - 建议1：非富文本内容，使用```<%- content %>```渲染。
    - 建议2：富文本内容使用 https://github.com/leizongmin/js-xss 过滤之后再使用```<%= content %>```进行渲染。
* 前端渲染：innerHTML可以防御XSS攻击，但是防御能力有限。
    - 例如可以防御```<script>alert(document.cookie)</script>```。
    - 例如无法防御```<img src="null" onerror='alert(document.cookie)' />```。
    - 建议1：非富文本内容，使用innerText进行渲染。
    - 建议2：富文本内容使用 https://github.com/leizongmin/js-xss 过滤之后再使用innerHTML进行渲染。
* 不要使用```document.write```去渲染。因为```document.write```无法防御XSS攻击。
* 不要使用eval方法。
