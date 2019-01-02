# 文档
* http://nginx.org/en/docs/
* http://www.nginx.cn/doc/

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
    - 解决方案：nginx通过rewrite进行路由重定向。
    - 存在问题：问题3。
* 问题3：api重定向时POST变成了GET。
    - 如果要保证重定向后的请求方法，需要在服务端返回307(临时)或者308(永久)状态码，这两个状态码不会更改原请求方法（需要客户端支持）。
    - 解决方案：待续...
* rewrite导致出来了问题3，实在没有解决方案。配置return 307 或者 return 308一直失败。所以我就使用了location ^~ /admin/ 代理。
    - 此时跳转路由和请求接口不会报404，但是路由上会有多余的路径/admin/。因为我在程序里写的路由是/admin/。本想通过308或者307重定向解决。奈何一直没有找到解决方案(已有解决方案，在下面的代码配置里，尚未进行测试待续...)。
    - 所有还是去程序代码里处理吧。毕竟就算我通过307或者308重定向成功了。我还是要去程序里修改的。因为我不喜欢重定向。
* 建议：
    - 路由的处理在程序代码里处理，当是生产环境时，更改路由前缀。
    - 最好的解决方案是，让开发环境和生产环境路由保持一致。
* 307(临时) 或者 308（永久）重定向，会保留原有的请求方式。不像301(永久) 或者 302(临时)重定向，会把请求方式变成GET。
```
server {
    # 端口
    listen 80;

    # 配置独立域名
    server_name admin.sbxx.top;

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

    # 301和302重定向，这种写法会导致POST方式的请求变成GET方式的请求。
    #location ^~ /admin/ {
    #    rewrite ^/admin/(.*)$ /$1 redirect;
    #}

    # 307和308重定向，才是正确的思路。正确配置应该如下。
    location ^~ /admin/ {
        return 307 /login;
    }
}
```
* 发现：
    - 301 和 307 对应（永久）。
    - 302 和 308 对应（临时）。
    - 上面nginx配置307的地方如果配置成308的话会报错：
    ```
    无法访问此网站
    网址为 http://local.admin.sbxx.com/admin/ 的网页可能暂时无法连接，或者它已永久性地移动到了新网址。
    ERR_INVALID_RESPONSE
    ```。
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

# 踩坑
* ```sudo nginx -s reload```报错：```nginx: [error] open() "/usr/local/var/run/nginx.pid" failed (2: No such file or directory)```
    - 解决方案：找到你的nginx.conf的文件夹目录，然后运行这个```sudo nginx -c /usr/local/etc/nginx/nginx.conf```命令，再运行```sudo nginx -s reload```，就可以了

# server_name
* saas服务，给server_name配置```*.h5.sbxx.top```。是个不错的解决方案，但是还不够完善。
    - s39210.h5.sbxx.top
* server_name还可以通过正则配置：这个是saas服务配域名的正确解决方案。
    - ```~^s\d+\.h5.sbxx\.top$```
    - 虚拟主机必须以波浪线```~```起始，否则该名字会被认为是个确切的名字。

# 开启```Content-Encoding: gzip```
```
    #开启Gzip
    gzip on;
    #不压缩临界值，大于1K的才压缩，一般不用改
    gzip_min_length 1k;
    #buffer，就是，嗯，算了不解释了，不用改
    gzip_buffers 4 16k;
    #用了反向代理的话，末端通信是HTTP/1.0，有需求的应该也不用看我这科普文了；有这句的话注释了就行了，默认是HTTP/1.1
    #gzip_http_version 1.0;
    #压缩级别，1-10，数字越大压缩的越好，时间也越长，看心情随便改吧
    gzip_comp_level 2;
    #进行压缩的文件类型，缺啥补啥就行了，JavaScript有两种写法，最好都写上吧，总有人抱怨js文件没有压缩，其实多写一种格式就行了
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    #跟Squid等缓存服务有关，on的话会在Header里增加"Vary: Accept-Encoding"，我不需要这玩意，自己对照情况看着办吧
    gzip_vary off;
    #IE6对Gzip不怎么友好，不给它Gzip了
    gzip_disable "MSIE [1-6]\.";
```

# 开启```Cache-Control: public, max-age=31536000```
* 待续...
```
```
