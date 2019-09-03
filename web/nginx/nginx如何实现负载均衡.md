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
