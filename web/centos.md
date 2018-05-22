* yum install -y nodejs

* yum install -y php

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
