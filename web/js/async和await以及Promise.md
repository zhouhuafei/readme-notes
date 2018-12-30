# async
* async定义的方法返回值是一个Promise。

# await
* await后面调用的方法需要返回一个Promise。

# Promise之axios和jq的ajax最新版
* return axios().then().catch()之后。如果后续还接着使用.then()的话。即使失败了。也是会走进then()的。所以我才先catch处理再then处理。
    - catch时把错误的数据整理好。return出去。最后统一走到then里。想处理就二次处理。

# Promise.all
* Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
* Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。
* 需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

# Promise.race
* 顾名思义，Promse.race就是赛跑的意思，意思就是说，```Promise.race([p1, p2, p3])```里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
