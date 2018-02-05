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
