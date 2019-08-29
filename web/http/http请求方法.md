# 摘自《图解HTTP》
* GET
    - 获取资源
* POST
    - 传输实体主体
* PUT
    - 传输文件
* HEAD
    - 获取报文首部
* DELETE
    - 删除文件
* OPTIONS
    - 询问支持的方法
* TRACE
    - 追踪路径
* CONNECT
    - 要求用隧道协议连接代理

# PATCH
> https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PATCH
* 在HTTP协议中，请求方法 PATCH  用于对资源进行部分修改。
* 在HTTP协议中， PUT 方法已经被用来表示对资源进行整体覆盖， 而 POST 方法则没有对标准的补丁格式的提供支持。不同于  PUT 方法，而与 POST 方法类似，PATCH  方法是非幂等的，这就意味着连续多个的相同请求会产生不同的效果。
* 要判断一台服务器是否支持  PATCH 方法，那么就看它是否将其添加到了响应首部 Allow 或者 Access-Control-Allow-Methods （在跨域访问的场合，CORS）的方法列表中 。
* 另外一个支持 PATCH 方法的隐含迹象是 Accept-Patch 首部的出现，这个首部明确了服务器端可以接受的补丁文件的格式。
