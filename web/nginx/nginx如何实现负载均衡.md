> 摘自：https://zhuanlan.zhihu.com/p/65393365

# nginx如何实现负载均衡
```
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
server {
    server_name  fe.server.com;
    listen 80;
    location /api {
        proxy_pass http://balanceServer;
    }
}
```
* 轮询策略
    - 默认情况下采用的策略，将所有客户端请求轮询分配给服务端。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。
    ```
    upstream balanceServer {
        server 10.1.22.33:12345;
        server 10.1.22.34:12345;
        server 10.1.22.35:12345;
    }
    ```
* 最小连接数策略
    - 将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。
    ```
    upstream balanceServer {
        least_conn;
        server 10.1.22.33:12345;
        server 10.1.22.34:12345;
        server 10.1.22.35:12345;
    }
    ```
* 最快响应时间策略
    - 依赖于NGINX Plus，优先分配给响应时间最短的服务器。
    ```
    upstream balanceServer {
        fair;
        server 10.1.22.33:12345;
        server 10.1.22.34:12345;
        server 10.1.22.35:12345;
    }
    ```
* 客户端ip绑定
    - 来自同一个ip的请求永远只分配一台服务器，有效解决了动态网页存在的session共享问题。
    ```
    upstream balanceServer {
        ip_hash;
        server 10.1.22.33:12345;
        server 10.1.22.34:12345;
        server 10.1.22.35:12345;
    }
    ```

# 其他
* 负载均衡时，如果某个服务器down掉了，会被自动剔除。
* weight(权重)默认为1，权重越高，被分配的客户端越多。
```
upstream balanceServer {
    server 10.1.22.33:12345 weight=1;
    server 10.1.22.34:12345 weight=5;
    server 10.1.22.35:12345 weight=10;
}
```

# 多台服务器怎么实现文件同步？
* 使用软件`rsync`。
* 假设有四台服务器，则四台服务器上都要安装`rsync`。
* 使用四台服务器中的一台做为主服务器，在主服务器上进行`rsync`的详细配置。
* 配置完毕，主服务器上的文件会根据配置规则同步到其他服务器上。
* 建议：主要服务都进行开机自启动，当然`rsync`也建议开启自启动。
