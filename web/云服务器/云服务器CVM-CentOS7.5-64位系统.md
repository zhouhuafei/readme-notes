# ssh登录远程服务器
```
ssh root@ip
```

# 更新yum
* yum update

# 检索可被安装的软件
* yum list redis*

# 安装nginx
* yum install -y nginx
* 启动：systemctl start nginx.service
* 开机自启动：systemctl enable nginx.service
* 静态资源默认目录：/usr/share/nginx/html
* 配置文件默认目录：/etc/nginx/conf.d
* 把本地文件拷贝到服务器：`scp ./http_comic.sbxx.top.conf root@115.159.148.99:/etc/nginx/conf.d/`

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

# 安装mongodb
> 参考文档：https://www.cnblogs.com/jiayoubobo/p/11176818.html
* 创建yum源文件：vim /etc/yum.repos.d/mongodb-org-4.0.repo
* 文件中写入如下内容（使用阿里云的源）
```
[mngodb-org]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/
gpgcheck=0
enabled=1
```
* 安装：yum install -y mongodb-org
* 启动：systemctl start mongod.service
* 重启：systemctl restart mongod.service
* 开机自启动：systemctl enable mongod.service
* 禁止开机自启动：systemctl disable mongod.service
* 停止：systemctl stop mongod.service
* 查看状态：systemctl status mongod.service
* 启动Mongo shell：mongo
* 查看数据库：show dbs

# 安装mysql
> 参考文档：https://www.cnblogs.com/brianzhu/p/8575243.html
* 下载包管理工具：wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
* 安装包管理工具：yum install -y mysql57-community-release-el7-10.noarch.rpm
* 安装：yum install -y mysql-community-server
* 启动：systemctl start mysqld.service
* 重启：systemctl restart mysqld.service
* 开机自启动：systemctl enable mysqld.service
* 查看密码：grep "password" /var/log/mysqld.log
* 连接数据库：mysql -u root -p
* 修改密码（MySQL默认必须修改密码之后才能操作数据库）：mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
  - 密码需要设置的很复杂。否则会报错：ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
  - 输入如下命令则可以允许设置简单密码：
  ```
  mysql> set global validate_password_policy=0;
  mysql> set global validate_password_length=1;
  ```
  - 把密码设置为root：mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';

# 查看开机自启动列表
* systemctl list-unit-files|grep enabled
