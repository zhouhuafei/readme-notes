# mac 安装
```
brew install nginx
```

# 常用命令
* 启动
```
nginx
```
* 重启
```
nginx -s reload
```
* 停止
  - 找到主进程master process的id
  - 杀死主进程
```
ps aux | grep nginx
kill id
```
* 无异常重启nginx
```
nginx -s reload
```
* 检测nginx配置是否异常
```
nginx -t
```

# nginx80端口转发其他端口
* 找到存放配置的文件夹，新建一个配置文件，然后写入下面的代码，就可以转发端口了
* ip的配置和host的配置请不要忘记，否则nginx代理之后，请求信息request带过来的ip和host就变成匿名的了
```
server {
        listen 80;
        server_name www.xxx.com xxx.com;
        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header x-real-ip $remote_addr;
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
            proxy_set_header host $http_host;
        }
}
```

# nginx配置独立域名
* 问题1：静态资源访问不到。
    - 解决方案：nginx通过location进行代理。
* 问题2：路由错误，重定向错误，api路由错误。
    - nginx通过rewrite进行路由重定向。
* 问题3：api重定向时post变成了get
    - 如果要保证重定向后的请求方法，需要在服务端返回307(临时)或者308(永久)状态码，这两个状态码不会更改原请求方法（需要客户端支持）
* rewrite导致出来了问题2和问题3，实在没有解决方案。配置return 307 或者 return 308一直失败。所以我就使用了location ^~ /admin/ 代理。
    - 此时跳转路由和请求接口不会报404，但是路由上会有多余的路径/admin/。因为我在程序里写的路由是/admin/。本想通过308或者307重定向解决。奈何一直没有找到解决方案(已有解决方案，在下面的代码配置里，尚未进行测试待续...)。
    - 所有还是去程序代码里处理吧。毕竟就算我通过307或者308重定向成功了。我还是要去程序里修改的。因为我不喜欢重定向。
* 建议：
    - 路由的处理在程序代码里处理，当是生产环境时，更改路由前缀。
    - 最好的解决方案是，让开发环境和生产环境路由保持一致。
* 307(临时) 或者 308（永久）重定向，会保留原有的请求方式。不像301(永久) 或者 302(临时)重定向，会把请求方式变成get。
```
server {
    # 端口
    listen 80;

    # 配置独立域名
    server_name admin.sbxx.com;

    # 代理/
    location ^~ / {
        proxy_pass http://127.0.0.1:5551/admin/;
        proxy_set_header x-real-ip $remote_addr;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header host $http_host;
    }

    # 代理/static-cache/路径
    location ^~ /static-cache/ {
        proxy_pass http://127.0.0.1:5551/static-cache/;
        proxy_set_header x-real-ip $remote_addr;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header host $http_host;
    }

    # 代理/static-no-cache/路径
    location ^~ /static-no-cache/ {
        proxy_pass http://127.0.0.1:5551/static-no-cache/;
        proxy_set_header x-real-ip $remote_addr;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header host $http_host;
    }

    # 代理的方法无法改变程序内部的路由。
    #location ^~ /admin/ {
        #proxy_pass http://127.0.0.1:5551/admin/;
        #proxy_set_header x-real-ip $remote_addr;
        #proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        #proxy_set_header host $http_host;
    #}

    # 重定向的这种写法会导致只能使用get方式的请求
    #location ^~ /admin/ {
    #    rewrite ^/admin/(.*)$ /$1 permanent;
    #}

    # 307和308的正确配置应该如下，尚未测试(http://127.0.0.1:5551是不是应该去掉才对)待续...
    location ~ ^/admin/(?<method>.*)$ {
        if ($request_method != get) {
            return 308 http://127.0.0.1:5551/$method$is_args$args;
        }
        rewrite ^/admin/(.*)$ /$1 permanent;
    }
}
```
* 禁止用户通过服务器的ip地址直接访问nginx的服务
  - 找到默认配置
  - 在默认配置里的server里最后面加一句return 403;
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name _;
        location / {
                try_files $uri $uri/ =404;
        }
        return 403;
}
```

# 禁止某些ip访问我的网站
* 找到你对应的网站的配置
* 在location参数的起始位置添加
* deny 禁止
* allow 允许
```
server {
        listen 80;
        server_name www.xxx.com xxx.com;
        location / {
            deny 192.168.51.93;
            deny 192.168.51.94;
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header x-real-ip $remote_addr;
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
            proxy_set_header host $http_host;
        }
}
```

# 开启nginx目录文件列表显示功能
* 修改nginx目录下的nginx.conf文件
```
http {
    include       mime.types;
    default_type  application/octet-stream;

    # 自动显示目录
    autoindex on;
    # 默认为on，显示出文件的确切大小，单位是bytes。改为off后，显示出文件的大概大小，单位是kB或者MB或者GB
    autoindex_exact_size off;
    # 默认为off，显示的文件时间为GMT时间。改为on后，显示的文件时间为文件的服务器时间
    autoindex_localtime on;
}
```

# location
* 前缀含义
    - =  ：精确匹配（必须全部相等）
    - ~  ：大小写敏感
    - ~* ：忽略大小写
    - ^~ ：只需匹配uri部分
    - @  ：内部服务跳转

# rewrite
* 语法
    - rewrite regex replacement [flag];
    - 重写 正则 替换内容 标识
* flag
    - last，本条规则匹配完成后，继续向下匹配新的location URI规则
    - break，本条规则匹配完成即终止，不再匹配后面的任何规则
    - redirect，返回302临时重定向，浏览器地址会显示跳转后的URL地址
    - permanent，返回301永久重定向，浏览器地址栏会显示跳转后的URL地址
