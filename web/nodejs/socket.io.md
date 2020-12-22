# 文档
* https://socket.io/docs/
* websocket是可以和http共用监听端口的，也就是它可以公用端口完成socket任务。
# 客户端基础
* clinet.emit('event',data); // 给服务端发消息
* client.on('event',function(data){}); // 接收服务端发过来的消息

# 服务端基础
* io.sockets.emit('event',data); // 针对所有的客户端(广播)
* io.sockets.socket(socketid).emit('event',data); // 给指定的客户端发送消息(单播)
* clinet.broadcast.emit("msg",data); // 针对除了自己之外的客户端(广播)
* clinet.emit('event',data); // 针对请求的那个客户端(单播)
* clinet.on('event',function(data){}); // 监听客户端发来的请求

 # 遇到过的问题
* 浏览器第几次滚动到底部,数据就重复加载几次,原因是每次滚动到浏览器底部我都on了一下,问题虽小,依然需要注意

# 原生WebSocket
* `开源库`：https://github.com/lukeed/sockette
* `CloseEvent.code`：https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent

# 前端的WebSocket心跳检测需要后端配合才能实现-约定一个消息类型为心跳类型即可
* 方案1：直接`setInterval`配合`ws.readState === WebSokcet.OPEN`配合`ws.send`配合`ws.onmessage`。
  - `WebSokcet.OPEN`的值是1，相当于`ws.onopen`之后。
* 方案2：`ws.onopen`之后配合`ws.send`配合`setTimeout`配合`递归`配合`ws.onmessage`。
