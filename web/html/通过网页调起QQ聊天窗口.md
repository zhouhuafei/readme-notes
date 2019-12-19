# 通过网页(浏览器)调起可执行程序(桌面应用)
> 自定义`URL Protocol`
* 通过浏览器调用可执行程序，主要是修改注册表，注册`URL Protocol`。
* 案例：下述`tencent://message/?uin=目标QQ号&Site=qq&Menu=yes`就属于自定义的`URL协议(URL Protocol)`。
### 通过网页(浏览器)调起QQ聊天窗口
```
<a href="tencent://message/?uin=目标QQ号&Site=qq&Menu=yes">点我调用QQ聊天窗口</a>
```
### URL Protocol
> URL协议，简单说是点击一个网页的链接，通过这个链接执行计算机上的一个指定程序，并向其传递相应的信息数据。

# 通过网页(浏览器)调起原生APP应用(Native APP)
> 自定义`URL Scheme`
* h5发起一个自定义`URL Scheme`请求，app拦截这个请求后，进行相应的操作。
### h5可以直接跳转到知乎APP。其原理是？
* 其原理是使用了`URL Scheme`，这是一种特殊的链接，通过它可建立与应用之间的关联。
* 通常的超链接格式是：`<a href="https://www.baidu.com">百度</a>`。
* 但一些预先定义好的链接会被其关联的应用打开。比如：
  - `<a href="tel://13812345678">联系我们</a>` 这会自动加载手机的拨号应用。
  - `<a href="dianping://shopinfo?id=67422355">进入龙湖</a>` 打开大众点评并直接进入该店页面。
* 知乎应该也类似，需要提前定义好`URL Scheme`，关联到知乎应用上即可。
### URL Scheme
> URL Scheme是为方便app之间互相调用而设计的。我们可以通过系统的OpenURL来打开该app，并可以传递一些参数。
