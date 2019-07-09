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
* Signature 部分是对前两部分的签名，防止数据被篡改。
* 总结：
    - JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。
    - JWT生成规则
    ```
    base64UrlEncode(Header) + '.' + base64UrlEncode(Payload) + '.' + Signature
    ```
    - Signature生成规则：首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。
    ```
    HMACSHA256(base64UrlEncode(Header) + "." + base64UrlEncode(Payload), secret)
    ```
    - JWT验证token是否有效的时候，也要把密钥（secret）传入进去进行验证的。

# Base64URL算法
> JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符```+```、```/```和```=```，在 URL 里面有特殊含义，所以要被替换掉：```=```被省略、```+```替换成```-```，```/```替换成```_``` 。这就是 Base64URL 算法。
* 提出疑问：字符被替换掉了，那反解码的时候怎么解？
* 给出解答：
    - 标准的Base64算法编码后，可能出现字符```+```和```/```但是不会出现字符```-```和```_```，因标准的Base64算法字符集中不包含```-```和```_```。
    - 标准的Base64算法编码后，```=```号只可能出现在最后且编码后的长度一定是4的倍数。所以就算```=```号被省略了也没关系。只需解码时判断下解码串长度是否为```4```的倍数，如果不是4的倍数则补```=```号至4的倍数即可。
    - 综上所述，Base64URL算法是在标准的Base64算法上进行的。即使字符被替换掉了。也是可以反推进行解码的。

# 应用
* 适用于认证服务器
* 适用于前后端分离的项目

# jsonwebtoken每次生成的token是一致的么？
* 生成token时，如果入参是一致的，则生成的token就是一致的。
* 如果带过期时间呢？如果生成token时没有时间差或者时间差小于临界值，则生成的token是一致的。如果有时间差，则生成的token就是不一致的。
    - 时间差的临界值是多少？
    - 答：不清楚！经测试，setTimeout设置为500毫秒以下时，true的几率大于false。设置为900毫秒时，true的几率小于false。设置为1000毫秒时，就已经全是false了。
    - 以上测试结果是和exp对应的值有关的。因为exp对应的值是秒级别的。
    - 总结：生成token时，如果入参是一致的，则生成的token就是一致的。
* 总结：其实生成的token就是函数的返回值罢了，入参一致的情况下，只要函数内部参与运算的部分没有掺杂随机数和时间戳，返回结果肯定一致。
```javascript
const jwt = require('jsonwebtoken');
const token1 = jwt.sign({foo: 'bar'}, 'shhhhh');
const token2 = jwt.sign({foo: 'bar'}, 'shhhhh');
const token3 = jwt.sign({foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'shhhhh');
const token4 = jwt.sign({foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'shhhhh');
console.log('token1', token1);
console.log('token2', token2);
console.log('token3', token3);
console.log('token4', token4);
console.log('token1===token2', token1 === token2); // true
console.log('token3===token4', token3 === token4); // true
setTimeout(() => {
    const token5 = jwt.sign({foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'shhhhh');
    console.log('token4===token5', token4 === token5); // false 此处比对结果和setTimeout设置的时间有关，具体测试，请看上述言论。
}, 1000);
```
