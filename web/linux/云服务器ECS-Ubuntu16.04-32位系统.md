# ssh登录远程服务器
```
ssh root@ip
```

# apt-get的使用
1. apt-get update | apt update
2. apt-get install software | apt install software
3. apt-get remove software | apt remove software

# 安装软件
* apt-get install software | apt install software

# 安装nodejs并切换版本
* 安装老版本，因为只有老版本
```
apt-get install nodejs-legacy
apt-get install npm
npm i -g n
```
* 更新nodejs到6.11.4版本
```
n 6.11.4
```
* 更新nodejs到最新稳定版
```
n stable
```

# 安装mongodb
1. apt install mongodb
2. service mongodb start
3. service mongodb stop
4. mongo --version

# 安装redis
1. apt install redis-server
2. service redis-server start
3. service redis-server stop
4. redis-server --version

# 安装nginx
* apt install nginx

# 安装php
* apt install php

# 安装mysql
* apt install mysql-server
* service mysql start

# 安装docker
* apt install -y docker.io
    - -y 默认yes 不询问我
