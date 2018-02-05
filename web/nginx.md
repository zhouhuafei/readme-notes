# mac
* 安装
```
brew install nginx
```
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
* nginx80端口转发其他端口
  - 找到存放配置的文件夹，新建一个配置文件，然后写入下面的代码，就可以转发端口了
  - ip的配置和host的配置请不要忘记，否则nginx代理之后，请求信息request带过来的ip和host就变成匿名的了
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
* 禁止某些ip访问我的网站
  - 找到你对应的网站的配置
  - 在location参数的起始位置添加
  - deny 禁止 
  - allow 允许
```
server {
        listen 80;
        server_name www.xxx.com xxx.com;
        location / {
            deny 192.168.51.93;
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header x-real-ip $remote_addr;
            proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
            proxy_set_header host $http_host;
        }
}
```
* 检测nginx配置是否异常
```
nginx -t
```
* 无异常重启nginx
```
nginx -s reload
```