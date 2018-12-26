# token的两种解决方案
* 解决方案1：
    - token就是口令，比如一次会话的口令。
    - 用户再登陆时会得到服务器返回的一个token，以后其他需要登陆才能访问的接口需要传递此token，这样服务器就能知道你的登陆状态以及识别身份
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
