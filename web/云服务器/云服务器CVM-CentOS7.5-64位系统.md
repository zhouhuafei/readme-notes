# ssh登录远程服务器
```
ssh root@ip
```

# 安装nginx
* yum install -y nginx
* 启动：systemctl start nginx.service
* 开机自启动：systemctl enable nginx.service
* 静态资源默认目录：/usr/share/nginx/html
* 配置文件默认目录：/etc/nginx/conf.d

# 安装git
* yum install -y git

# 安装nodejs
* yum install -y nodejs

# 安装redis
* yum install -y redis
* 启动：service redis start 或者 systemctl start redis
* 开机自启动：systemctl enable redis
* 停止：service redis stop
* 测试是否启动成功：键入 redis-cli 之后再键入 ping 如果出现 PONG 说明启动成功

# 安装mongodb 待续....
* yum install -y mongodb-org

# 安装mysql 待续....
* yum install -y mysql
* 启动：systemctl start mysqld
* 开机自启动：systemctl enable mysqld
