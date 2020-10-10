# 自我认知:代理的原理
* 注:代理和协议无关,无论你是什么协议,代理只认ip地址和端口号

* 当前服务 127.0.0.1:5556
* 目标服务 127.0.0.1:5555

# 疑问:vue单页面开发时我请求目标服务上的数据，这一定会跨域，接口请求会失败
* 解决方案:服务器代理
* 服务器把请求路径都当做是对目标服务的路径进行处理,处理的方式是服务器与服务器之间通信(不涉及到跨域问题),
* 例如:
* 我请求的路径是/api/list/?nowPage=1     
* 对于当前服务而言完整的路径就是  http://127.0.0.1:5556/api/list/?nowPage=1
* 此时如果当前服务不是直接响应而是发送一个到目标服务的请求 http://127.0.0.1:5555/api/list/?nowPage=1
* 等目标服务给出响应之后把响应结果再返回给当前服务的请求http://127.0.0.1:5556/api/list/?nowPage=1
* 这样开发阶段就避免了跨域的问题
* 这种功能开发阶段的webpack-dev-server模块内部的服务已经自带了这种功能,只需要简单配置即可,具体配置自行搜索

# 疑问:涉及到跨域的几种情况
1. 主域名不同
2. 端口不同
3. 协议不同
4. 域名和域名对应的ip之间
5. 主域名相同,子域名不同(所有子域的domain设置成主域即可进行跨域)

# 解决方案:
1. 后台设置header进行跨域
```
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
 res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 if (req.method == 'OPTIONS') {
     res.send(200);
 }
```
2. postMessage
3. jsonp  仅支持GET
4. domain
5. 服务器代理

# Fiddler抓包的原理
* 开启了Fiddler之后，谷歌浏览器会自动设置代理。
* 假如浏览器本来是要向百度的服务器发送一条请的，设置了代理之后。
* 浏览器的请求就发送给了Fiddler服务器，Fiddler再转发给百度的服务器，接收到响应之后，Fiddler再反馈给浏览器。
* 所以Fiddler中可以看到所有的用户请求，至于拦截和篡改请求，就是Fiddler的开发人员开发的功能了。这些功能可以方便开发人员的调试。

# Fiddler抓HTTPS请求
* 教程：https://www.cnblogs.com/joshua317/p/8670923.html
* 证书安装：
  - 电脑安装Fiddler证书：`Fiddler` -> `Tools` -> `Options` -> `HTTPS` -> `Actions` -> `Trust Root Certificate` -> `Yes`
  - 手机安装Fiddler证书：打开手机浏览器，在浏览器地址输入代理服务器IP和端口，会看到一个Fiddler提供的证书页面。
* 问题：手机上抓包一直失败，有机会的话试试使用`Charles`软件进行抓包吧。
