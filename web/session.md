# session存放在哪里?
* 服务器端的内存中。

# 那么Session在何时创建呢？
* 当然还是在服务器端程序运行的过程中创建的，不同语言实现的应用程序有不同创建Session的方法。
* 在创建了Session的同时，服务器会为该Session生成唯一的Session id，而这个Session id在随后的请求中会被用来重新获得已经创建的Session。
* 在Session被创建之后，就可以调用Session相关的方法往Session中增加内容了，而这些内容只会保存在服务器中，发到客户端的只有Session id；当客户端再次发送请求的时候，会将这个Session id带上，服务器接受到请求之后就会依据Session id找到相应的Session，从而再次使用之。

# pm2自动刷新重启,会不会导致session丢失?
* 会丢失

# pm2重启session会丢失么？
* 会

# session为什么要存数据库里?
* 为了持久化存储

# 用户登录信息存session一定很安全么？
* 只是相对于cookie存储会安全点,如果别人拿到cookie里存储的sessionid,依然可以进行冒充登录的,不过一般会设置cookie的httponly属性,这样后端设置的cookie,前端通过js是读不到的,且前端设置cookie不能增加httponly属性,所以理论上是很安全的
* 但是并不是绝对安全的,例如我登陆了页面之后,去了躺厕所,别人在你退出登陆之前把你的cookie看走了,然后模拟请求,把这段cookie也带了过去,那么服务端会把这个请求当作你登陆后的请求,并给予正确的返回信息的,所以说并非绝对安全,但是这种几率是很低的,有这种记忆能力的人,可以去参加最强大脑了
