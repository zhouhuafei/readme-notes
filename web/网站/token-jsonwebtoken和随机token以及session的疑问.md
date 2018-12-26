# jsonwebtoken
* jwt生成token之后，怎么让token手动过期？例如做单设备登录则需要这个特性。
    - 登录的时候，往数据库里存一个登录的时间戳，放到token的payload中。
    - 验证token的时候。如果验证通过则比对时间戳，如果相同则算是有效的token。
    - 因登录戳的唯一性。所以可以保证本次登录之后。上次的token即使验证通过了，也无法通过登录戳这一步，如此就相当于上次的token失效了。
* jwt怎么刷新token？
    - token即将过期的前5分钟，带着尚未过期的token来换取新的token。并更新用户信息表里记录的登录戳来保证本次登录token的唯一性，并可以让老的token无效。
    - 失效其实是假失效。token的验证还是可以通过的。不过登录戳的验证就通不过了。所以可以保证token的唯一性。
    - 打了更新token的接口之后。客户端的token也要更新。

# 随机token
* 图文验证码为什么适合使用随机token配合redis？
    - 因图文验证码使用一次就要过期。
    - 而jsonwebtoken无法灵活的让token手动过期。需要配合数据库。既然要配合数据库。我直接随机生成一个token配合redis不就可以了？
    - 所以图文验证码应该使用随机token作为键配合redis。或者使用jsonwebtoken生成的token作为键值配合redis。
    - 总结：使用token的情况下，图文验证码需要配合redis来实现。
* 随机token可以模拟session么？
    - 不跨主域的情况下，把token带到Set-Cookie中返回，并设置上httponly，可以说很类似session了。

# token对比session的优缺点
* token优势：
* token弊端：
* session优势：
* session弊端：

# 其他
* 用户信息应该每次都从数据库里读取么？
    - 注册的时候用户信息是存到mongodb或者mysql数据库里的。
    - 如果登录的时候把用户信息存到jsonwebtoken或者session或者redis里。
    - 后续直接从以上三个地方读取数据的话。读取的相当于是缓存起来的数据。
    - 如果用户信息更新了。这三个地方没更新的，那这三处的数据就是不正确的。
    - 如果用户信息更新了。这三个地方都要更新的话，操作成本太高。
    - 所以这三个地方应该只存储用户的唯一标识。需要查询用户信息的时候。再根据这个标识进行查询才是正确的操作。
