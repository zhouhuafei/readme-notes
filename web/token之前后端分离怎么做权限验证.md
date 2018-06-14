# token
* 登录，后端会返回一个token。
* 后续请求带上这个token即可。
    - 因为跨主域cookie带不过去，所以绑定到cookie上只是方便前端后续拿token，带给后端是带不过去的。
    - token的有效时间应该要和后端确认，对应的cookie也要存对应的时长。
    - 接口应该有个验签权限，并不是任何人都可以请求。

# 接口验签的原理
* 待续...

# 后端生成token的原理
* 首先网站要允许被跨域请求 Access-Control-Allow-Origin: *
* 待续...

# token的存储
* 待续...

# token的更新
* 待续...

# token的安全性
* 别人拿到token和uid，也就拿到了登录权限。
