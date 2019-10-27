# 文档
* http://www.nginx.cn/
* http://www.nginx.cn/nginx-how-to
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
* 停止 - 方式1
  - 找到主进程master process的id
  - 杀死主进程
```
ps aux | grep nginx
kill id
```
* 停止 - 方式2
```
nginx -s stop
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
* 问题1：视图路由太丑。
    - 解决方案：nginx通过location进行代理。
* 问题2：api路由404。
    - 解决方案：nginx通过rewrite进行路由重定向。
* 问题3：nginx的rewrite重定向会导致api的POST请求变成GET请求。
    - 解决方案：如果要保证重定向后的请求方法，需要在服务端返回307(临时)或者308(永久)状态码，这两个状态码不会更改原请求方法(需要客户端支持)。
* 总结：
    - 独立域名需要通过nginx配置location进行代理。路由看起来才好看。
    - 307(临时) 或者 308（永久）重定向，会保留原有的请求方式。不像301(永久) 或者 302(临时)重定向，会把请求方式变成GET。
    - 如果不使用nginx代理的话，如果生产环境需要配置独立域名，则需要更改程序内部配置好的路由，还要保证admin的路由不会和h5的路由冲突(建议nginx重定向)。
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

    # 代理的方法无法改变程序内部的路由，导致路由看起来很丑(代理也可以解决api请求404的问题，只需/admin/api/匹配一下。但是路由看起来会很丑)。
    #location ^~ /admin/ {
    #    proxy_pass http://127.0.0.1:5551/admin/;
    #    proxy_set_header x-real-ip $remote_addr;
    #    proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    #    proxy_set_header host $http_host;
    #}

    # 301和302重定向，这种写法会导致POST方式的请求变成GET方式的请求。
    #location ^~ /admin/ {
    #    rewrite ^/admin/(.*)$ /$1 redirect;
    #}

    # 307和308重定向，才是正确的思路。但又因使用308重定向需要跳到一个新网址。所以正确配置应该如下(不完美)。
    #location ^~ /admin/ {
    #    set $url_query /;
    #    if ($request_uri ~ ^/admin/(.*)$) {
    #        set $url_query /$1;
    #    }
    #    return 307 $url_query;
    #}

    # 上面的307配置无法匹配：/admin、/admin?a=1、/admin#a=1。下面这种写法可以完美兼容(很完美)。
    location ^~ /admin {
        if ($request_uri ~ ^/admin$) {
            return 307 /;
        }
        if ($request_uri ~ ^/admin\?(.*)$) {
            return 307 /?$1;
        }
        # 震惊，不写这句也能匹配到/admin#a=1并重定向为/#a=1。
        #if ($request_uri ~ ^/admin#(.*)$) {
        #    return 307 /#$1;
        #}
        if ($request_uri ~ ^/admin/(.*)$) {
            return 307 /$1;
        }
    }
}
```
* 发现：
    - 301 和 307 对应（永久）。
    - 302 和 308 对应（临时）。
    - 上面nginx配置307的地方如果配置成308的话会报错（308重定向需要跳到一个新网址）：
    ```
    无法访问此网站
    网址为 http://local.admin.sbxx.com/admin/ 的网页可能暂时无法连接，或者它已永久性地移动到了新网址。
    ERR_INVALID_RESPONSE
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
* 前缀含义(匹配)
  - ~     ：波浪线表示执行一个正则匹配，区分大小写。
  - ~*    ：表示执行一个正则匹配，不区分大小写。
  - ^~    ：^~表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录。
  - =     ：进行普通字符精确匹配。
  - @     ："@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files。
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
* @ 用来定义一个命名 location。主要用于内部重定向，不能用来处理正常的请求。其用法如下：
```
location / {
    try_files $uri $uri/ @custom
}
location @custom {
    # ...do something
}
```
* 上例中，当尝试访问 url 找不到对应的文件就重定向到我们自定义的命名 location(此处为 custom)。值得注意的是，命名 location 中不能再嵌套其它的命名 location。

# location 匹配的优先级(与location在配置文件中的顺序无关)
* = 精确匹配会第一个被处理。如果发现精确匹配，nginx停止搜索其他匹配。
* 普通字符匹配，正则表达式规则和长的块规则将被优先和查询匹配，也就是说如果该项匹配还需去看有没有正则表达式匹配和更长的匹配。
* ^~ 则只匹配该规则，nginx停止搜索其他匹配，否则nginx会继续处理其他location指令。
* 最后匹配理带有"~"和"~*"的指令，如果找到相应的匹配，则nginx停止搜索其他匹配；当没有正则表达式或者没有正则表达式被匹配的情况下，那么匹配程度最高的逐字匹配指令会被使用。

# if语句中的判断条件
* ~    ：与指定正则表达式模式匹配时返回“真”，  判断匹配与否时区分字符大小写。
* ~*   ：与指定正则表达式模式匹配时返回“真”，  判断匹配与否时不区分字符大小写。
* !~   ：与指定正则表达式模式不匹配时返回“真”，判断匹配与否时区分字符大小写。
* !~*  ：与指定正则表达式模式不匹配时返回“真”，判断匹配与否时不区分字符大小写。

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
* 1、saas服务，给server_name配置通配符```*.h5.sbxx.top```。是个不错的解决方案。例如可以匹配到：s39210.h5.sbxx.top。
    - 以上亲测可用。但是还不够精确。
    - 想要精确匹配。可以看第2条。如下所示：
* 2、server_name还可以通过正则配置：这个是saas服务配域名的正确解决方案。
    - ```~^s\d+\.h5.sbxx\.top$```
    - 虚拟主机必须以波浪线```~```起始，否则该名字会被认为是个确切的名字(亲测，确实如此，必须以波浪线```～```起始)。

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
* 请求头：`Accept-Encoding: gzip`
* 响应头：`Content-Encoding: gzip`

# 开启```Cache-Control: public, max-age=31536000```
```
location / {
    #客户端缓存1年，有修改时则向服务器请求最新文件。
    add_header Cache-Control public, max-age=31536000;
}
```
* public
    - 因为默认值是private，表示其他代理都不要缓存，只有服务器缓存。
    - 设置public的意思就是允许其他各级代理缓存资源。
* 关于Cache-Control的体现(nodejs express下的体现)
    - 应和响应头有关，此处就不深究了，直接看结果吧。
    - 静态html页面。返回：```304 Not Modified```。
    - 静态css，js，img，视频，音频等。返回：```200 OK (from memory cache)```。

# vue-router
> History 模式
```
location / {
  try_files $uri $uri/ /index.html;
}
```

# nginx反向代理vue访问时浏览器加载失败，出现```ERR_CONTENT_LENGTH_MISMATCH```问题。
* nginx在做代理时，其工作进程对大文件做了缓存，这个缓存在 %nginx%/proxy_temp 目录下，主进程在读取缓存的时候由于权限问题而无法访问。
* 可以: ```sudo chmod 777 proxy_temp ```。

# nginx负载均衡
```
upstream tomcats {
    server 127.0.0.1:9001;
    server 127.0.0.1:9002;
}

server {
    listen 80;
    server_name  www.lianggzone.com;
    location / {
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_pass http://tomcats;
    }
}
```

# http重定向到https
```
server {
	listen 80;
	server_name www.sbxx.top sbxx.top;
    return 301 https://$server_name$request_uri;
}
```

# nginx 配置comic.sbxx.top的静态服务器时，出现403。
> 一定要先看错误日志。否则只是白白浪费时间。
* 在nginx.conf中可以看到访问日志和错误日志。
    - access_log /var/log/nginx/access.log;
    - error_log /var/log/nginx/error.log;
* 错误日志表示：nginx没有访问```/root/hello-world_crawler/pages/```目录的权限。
* 配置如下：
```
server {
	listen 80;
	server_name comic.sbxx.top;
    root /root/hello-world_crawler/pages/;
    index index.html;
}
```
* 解决方案1：在nginx.conf中把```user www-data;```改为```user root;```。
* 解决方案2：把```/root/hello-world_crawler/pages/```目录的权限改为755。
* 完整配置
> 下述代码示例中包含防盗链的代码
```
server {
	listen 80;
	server_name comic.sbxx.top;
    root /root/hello-world_crawler/pages/;
    index index.html;
    gzip on;
    location / {
        add_header Cache-Control max-age=31536000;
        add_header X-Frame-Options SAMEORIGIN;
    }
    location /1/ {
        valid_referers none blocked comic.sbxx.top;
        if ($invalid_referer) {
            return 403;
        }
        proxy_pass https://bnpic.comic123.net/;
        proxy_set_header referer https://m.bnmanhua.com;
    }
    location /2/ {
        valid_referers none blocked comic.sbxx.top;
        if ($invalid_referer) {
            return 403;
        }
        proxy_pass https://res.nbhbzl.com/;
        proxy_set_header referer https://www.manhuaniu.com;
    }
}
```

# 配置跨域
```
location / {
    add_header Access-Control-Allow-Origin *;
    # add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Headers Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,PATCH,OPTIONS;
}
```

# 正向代理和反向代理
> 反向代理与正向代理是相对的。正向代理是替代客户端去发起请求，而反向代理是替代服务器接受客户端的请求。
* 正向代理案例
    - 翻墙
    - Shadowsocks
    - 各种上网代理/VPN
* 反向代理案例
    - nginx
    - 负载均衡
    - 上面的nginx代理配置都属于反向代理，都是替代服务器接受客户端的请求。
    - nginx也可以用来配置正向代理。但是主要是用来做反向代理的。
