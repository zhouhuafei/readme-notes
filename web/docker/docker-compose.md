# 案例
```
version: '3'

services:
  nginx:
    container_name: nginx
    image: nginx:latest
    restart: always
    ports:
      - 80:80
    volumes:
      - ./config/nginx/conf.d:/etc/nginx/conf.d
      - ../../:/usr/share/nginx/html # bind mount 会清空容器内的文件，挂载宿主机的文件。
  mongo:
    container_name: mongo
    image: mongo:latest
    restart: always
    volumes:
      - mongo-data:/data/db # named volume 会把容器内的文件拷贝到宿主机上，同名文件以宿主机的为准。挂载位置一般在宿主机的 /var/lib/docker/volumes 目录里。
    ports:
      - 27017:27017
  redis:
    container_name: redis
    image: redis:latest
    restart: always
    volumes:
      - redis-data:/data
    ports:
      - 6379:6379
  mysql:
    container_name: mysql
    image: mysql:latest
    restart: always
    volumes:
      - mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root # 必须要配置，否则启动不了。
    ports:
      - 3306:3306
volumes:
  mongo-data:
  redis-data:
  mysql-data:
```

# docker-compose官方文档
https://docs.docker.com/compose/
# docker-compose.yml配置文件编写详解
https://blog.csdn.net/qq_36148847/article/details/79427878

# docker-compose常用配置参数
* images 表示使用的镜像
* restart 容器异常退出会进行重启
* volume 表示挂载宿主机的路径作为卷，冒号左边为宿主机路径，右边为镜像内路径
* ports 指定主机开放的端口
* environment 为环境变量，每个容器都有自己定义的环境变量，详情请查看各个镜像的手册
* links 指向其他容器中的服务
* expose 表示暴露端口，但不发布到宿主机上
* build 指定 Dockerfile 所在文件夹的路径（文件夹的路径）
* command 将覆盖默认的命令
* 更多 https://docs.docker.com/compose/compose-file/

# docker-compose常用命令
* `docker-compose up`：创建并启动所有容器。
* `docker-compose down`：停止并删除所有容器。
* `docker-compose restart`：重启所有容器。

# docker常用命令
* `docker ps`：显示所有运行的容器。
* `docker ps -a`：显示所有的容器，包括未运行的。
* `docker container ls`：显示所有运行的容器。
* `docker container ls -a`：显示所有的容器，包括未运行的。
* `docker volume ls`：查看所有卷标。
* `docker volume inspect docker-compose-config_nginx-config`：查看具体的volume对应的真实地址。
* `docker cp 容器id或者容器名称:要拷贝的文件在容器里面的路径 要拷贝到宿主机的相应路径`：拷贝容器中的文件到宿主机。
* `docker run -it nginx:latest bash`：使用镜像`nginx:latest`以交互模式启动一个容器，并进入容器的命令行交互界面。
  - `-t`：为容器重新分配一个伪输入终端，通常与`-i`同时使用。
  - `-i`：以交互模式运行容器，通常与`-t`同时使用。
  - `-d`：让容器在后台运行。
  - `-p`：将容器内部使用的网络端口映射到宿主机上。
  - `--name`：为容器指定一个名称。
  - `--volume|-v`：绑定一个卷。
* `docker exec -it containerID|containerName bash`：进入运行中容器的命令行交互界面。
  - `Ctrl + D`：退出容器的命令行交互界面。

# docker使用原则
* 使用docker请尽量遵从一个容器一个进程的原则。容器里如果一个进程都没有，则会自动停止。
