# 使用`$host`时报错了，报错信息如下
```
nginx: [emerg] unknown directive "if($host)" in /usr/local/etc/nginx/servers/test.conf:5
```

# 报错原因
> `nginx`对语法的格式比较严格，使用`$host`时，`if`与`$host`之间需要空格隔开。

# 正确案例
```
server {
    listen 80;
    server_name local.test.com;
    location / {
        if ( $host ~ "local.test.com" ) {
            return 500;
        }
        if ($request_uri ~ ^/test/$) {
            return 403;
        }
    }
}
```
