* centos版本
    - 6.8

* yum install -y nodejs

* yum install -y php
    - yum 安装 php5.6版本 还请自行搜索教程

* yum install -y nginx
    - service nginx start

* yum install -y redis
    - service redis start

* yum install -y mongod-org
    - service mongod start

* yum install mysql-server
    - service mysqld start

* 安装npm中canvas模块需要的依赖
    - yum install -y cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel

* 安装docker
    - yum install -y yum-utils device-mapper-persistent-data lvm2
    - yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    - yum makecache fast
    - yum install -y docker-ce
* 查看docker版本
    - docker --version
* 启动docker服务
    - service docker start
* hello-world
    - docker run hello-world
* 安装docker-compose
    - yum install -y docker-compose
* 查看docker-compose版本
    - docker-compose --version
