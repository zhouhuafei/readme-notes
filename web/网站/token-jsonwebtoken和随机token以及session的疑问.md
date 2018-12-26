# jsonwebtoken
* jwt生成token之后，怎么让token手动过期？例如做单设备登录则需要这个特性。
    - 登录的时候，往数据库里存一个登录的时间戳，放到token的payload中。
    - 验证token的时候。如果验证通过则比对时间戳，如果相同则算是有效的token。
    - 因登录戳的唯一性。所以可以保证本次登录之后。上次的token即使验证通过了，也无法通过登录戳这一步，如此就相当于上次的token失效了。
* 退出登录之后怎么注销token？
    - 方案1：修改时间戳。此方案和上面呼应(推荐)。
    - 方案2：退出登录的时候把token拉入黑名单。例如放到redis中。并设置上剩余的过期时间。验签的时候判断如果redis中存在这个token。则表示这个token是无效的。此方案要加多余的验签以及数据库操作(不推荐)。
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
* 总结：随机token类似session。都需要在服务端存储。

# jsonwebtoken对比session的区别
* jsonwebtoken在服务端不需要存储。是无状态的。拿到客户端带来到token进行解密即可。
* session在服务端需要存储。拿到客户端带来的sessionid之后再去session中查找有没有记录。

# jsonwebtoken对比session的优缺点
* jsonwebtoken优势：
    - 可扩展性强。因无状态。不存储在服务端。所以在分布式系统中不用考虑token共享的问题。
* jsonwebtoken弊端：
    - jsonwebtoken存在客户端安全性相对较弱。
    - 登录状态需要续签。token过期之前拿老token换新token。
    - 退出登录无法自动注销token。解决方案上面已经给了。
* session优势：
    - session存在服务端安全性相对较高。
* session弊端：
    - cooike的安全性不好，攻击者可以利用本地cookie进行欺骗和CSRF攻击。
    - 使用cookie，在多个域名的情况下会出现跨域的问题。
        - 通过客户端跨主域设置和接收cookie可以使用iframe的postMessage。
        - 通过服务端跨主域传递和接收cookie可以使用服务器代理。传递不代表可以设置。是否设置要看对方服务器和对方客户端的操作。
    - session存放在服务器端，短时间内如果有大量的用户，会影响服务器的性能。可以存redis。
    - 可扩展性弱。在分布式系统(多台服务器)中。要考虑session共享的问题。session共享可以使用redis集群解决。
* 应用：
    - 自家网站使用session和token都行。
    - 如果是和第三方对接。则token更方便。

# 个人对于第三方对接的理解：
* 使用session和第三方对接。第三方打我们的登录成功之后存储sessionid(在```response.headers['set-cookie']```中获取)。下次请求时带在请求头的cookie上。如果过期则重新登录。
    - 使用axios在服务端互打接口是可以获取到```response.headers['set-cookie']```的。
    - 使用axios在客户端获取不到，无论我是使用'set-cookie'或者'Set-Cookie'都获取不到，和httpOnly的值也无关，因为我把httpOnly设置为false也没获取到。
    - 别人测试在微信小程序客户端的响应里使用```response.headers['set-cookie']```可以获取到'set-cookie'。手机中需要使用大写的```response.headers['Set-Cookie']```获取。
* 使用token和第三方对接。第三方打我们的登录成功之后存储token(在```response.data```中获取)。下次请求时带在请求头的Authorization上。如果过期则重新登录。

# 别人对于session和token以及第三方对接的理解：
在存储过等同的情况下，在只是简单运用上，我只能说session与token没有本质的区别，二者不都是一串被加密过的字符串，拿他来做校验都一样。以上，是因为你把token拿来当作用户是不是当事人做这么一个简单的校验的情况下。当然，如果我们抛开一些比较极端的操作，token比session也有很大的区别：token可以存在任何位置（cookie、local storage）token比session更容易跨域。CORS预检查时token比较更简单。token有更多的控制权，比如当token过期时，你可以拿通过刷新token，让用户一直保持有效登录等。其实如果你只是单纯拿着token做一下自己网站内用户登录检验的话是无太多区别的。但假如token指的是OAuth Token提供认证和授权这类机制的话，那么就可以把session甩开N条街了，甚至是已经完全是两种不同的概念。假设有这么一个场景，你们用户在你们网站产生的订单，而另一家公司是专业ERP公司；而你的用户希望他的订单同时授权给这家ERP公司使用的情况下，难道你希望用户拿在你家网站的用户名和密码给这家ERP公司吗？这时候OAuth Token就有意义了，OAuth Token的授权大概是这样的：ERP需要调用我们提供的登录界面。用户输入用户名和密码后，我们再向ERP发送一个TOKEN。ERP拿TOKEN换数据。总之，如果你只是在自己网站内部上使用二者没有什么太多区别。而如果你的API是在不同终端上使用，token会更方便。

* Authorization: Bearer token
    - 格式为什么要这样？

# 其他
* token存在哪？
    - 存在localStorage里无法做单点登录。
    - 存在cookie里domain设置成顶级域名可以做单点登录。
    - 视场景而定。
* 用户信息应该每次都从数据库里读取么？
    - 注册的时候用户信息是存到mongodb或者mysql数据库里的。
    - 如果登录的时候把用户信息存到jsonwebtoken或者session或者redis里。
    - 后续直接从以上三个地方读取数据的话。读取的相当于是缓存起来的数据。
    - 如果用户信息更新了。这三个地方没更新的，那这三处的数据就是不正确的。
    - 如果用户信息更新了。这三个地方都要更新的话，操作成本太高。
    - 所以这三个地方应该只存储用户的唯一标识。需要查询用户信息的时候。再根据这个标识进行查询才是正确的操作。
    - 上述的三个地方其实是指三种方案。总结下来就是：如果从缓存中读取用户信息的话，如果用户信息修改了，则缓存里的用户信息也要做对应的修改。
