# location
* 前缀含义(匹配)
    - =    ：精确匹配（必须全部相等）
    - ~    ：大小写敏感
    - ~*   ：忽略大小写
    - ^~   ：只需匹配uri部分
    - @    ：内部服务跳转
* 注：location的前缀含义中，只有上述5种匹配的语法，不存在取反语法。
* 但是if中是存在取反。
```
server {
    listen 80;
    server_name local.test.com;
    location / {
        if ($request_uri !~ ^/test/$) {
            return 403;
        }
    }
}
```
