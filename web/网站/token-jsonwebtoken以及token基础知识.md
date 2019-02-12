# token的两种解决方案
* 解决方案1：
    - token就是口令，比如一次会话的口令。
    - 用户再登陆时会得到服务器返回的一个token，以后其他需要登陆才能访问的接口需要传递此token，这样服务器就能知道你的登陆状态以及识别身份。
    - jsonwebtoken就是这种方案下的应用。
* 解决方案2：
    - token就是凭证
    - 首次用户访问你，通过了认证，你随机生成一个token凭证，返回给用户；
    - 用户再次访问，附带token凭证，你检查该凭证是否有效来确认用户身份。
    - 通过token省却了用户不断的认证过程。
    - 因为http协议的无状态性，服务端需要持久化token，一般是放在数据库和缓存中。

# jsonwebtoken官网
* https://jwt.io/

# jsonwebtoken认知
* http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

# nodejs使用jsonwebtoken库生成token
* https://github.com/auth0/node-jsonwebtoken

# 存储
* 解决方案1是存客户端。过期时间jsonwebtoken内部会自行处理。
* 解决方案2是存redis数据库。过期时间需要用redis处理。

# jsonwebtoken简单摘要
* 格式：```Header.Payload.Signature```
* Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
* Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。
```
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```
除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
* Signature 部分是对前两部分的签名，防止数据篡改。

# Base64URL算法
JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符```+```、```/```和```=```，在 URL 里面有特殊含义，所以要被替换掉：```=```被省略、```+```替换成```-```，```/```替换成```_``` 。这就是 Base64URL 算法。

# 应用
* 适用于认证服务器
* 适用于前后端分离的项目
