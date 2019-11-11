# 教程
http://www.runoob.com/docker/docker-tutorial.html
http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html

# 官网
* https://www.docker.com
* https://hub.docker.com

# Windows7 安装
* 下载Docker Toolbox。
* 一路next即可完成安装。

# docker镜像
docker镜像是一个构建容器的只读模板，它包含了容器启动所需的所有信息，包括运行程序和配置数据。
* 官方提供的镜像 https://hub.docker.com/explore/

# docker容器
docker容器可以理解为在沙盒中运行的进程。这个沙盒包含了该进程运行所必须的资源，包括文件系统、系统类库、shell 环境等等。但这个沙盒默认是不会运行任何程序的。你需要在沙盒中运行一个进程来启动某一个容器。这个进程是该容器的唯一进程，所以当该进程结束的时候，容器也会完全的停止。

# docker基础命令
* docker-machine ls -> 查看详情，里面包含ip和端口
* docker-machine ip default -> 命令查看docker默认ip 默认ip 192.168.99.100

* docker search 镜像名字 -> 命令搜索可用的docker镜像。
* docker pull 镜像名字 -> 命令下载镜像。
* docker push -> 命令可以将某一个镜像发布到官方网站。
* docker images -> 命令可以列出所有安装过的镜像。
* docker rmi 镜像id -> 命令可以删除镜像。
    - docker images -a
    - docker rmi e38bc

* docker ps -> 命令可以查看所有正在运行中的容器列表。
    - docker ps
    - docker ps -a
* docker inspect 容器id -> 命令查看容器的信息。无需拷贝完整的id，通常来讲最开始的三至四个字母即可区分。
* docker rm 容器id -> 命令可以删除容器。
    - docker ps -a
    - docker rm f070
    - docker rm db19
* docker commit 容器id -> 命令保存对容器的修改。无需拷贝完整的id，通常来讲最开始的三至四个字母即可区分。

# docker删除镜像的注意点
* 删除前需要保证容器是停止的 stop
* 需要注意删除镜像和容器的命令不一样。 docker rmi ID，其中 容器(rm) 和 镜像(rmi)
* 需要先删除容器

# 容器操作
* docker run 容器名 运行一个容器
* docker run -it 容器名 通过docker的两个参数 -i -t，让docker运行的容器实现"对话"的能力
    - -t: 在新容器内指定一个伪终端或终端。
    - -i: 以交互模式运行容器，通常与 -t 同时使用。允许你对容器内的标准输入(STDIN)进行交互。
    - -d: 让容器在后台运行。
    - -p: 将容器内部使用的网络端口映射到我们使用的主机上。
    - --name="containerName": 为容器指定一个名称。
* docker run -it centos
    - 此时我们已进入一个 centos 系统的容器
* docker run -ti node
    - 进入nodejs的命令行交互界面
* docker run -ti node bash
    - 进入node镜像所在系统的命令行交互界面
* docker exec -it containerID bash
    - /bin/bash
    - 进入容器的命令行交互界面
    - `docker exec`：在运行的容器中执行命令。
* `docker run -it nginx:latest /bin/bash`
  - 使用镜像nginx:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。
  - 这样写和上边是一样的效果：`docker run -it nginx bash`
* 使用 docker stop 命令来停止容器
* 通过运行 exit 命令或者使用 Ctrl + d 来退出容器。

# Dockerfile 创建自定义的Docker镜像
* .dockerignore文件 作用和 .gitignore 类似。
* 创建Dockerfile文件，无后缀，名字就是Dockerfile。具体配置还请自行搜索。
```
# 从一个基础镜像centos:6.8开始构建
FROM centos:6.8

# 维护者信息
MAINTAINER zhouhuafei "1123486116@qq.com"

# 安装git
RUN yum install -y git

# 安装nodejs
RUN yum install -y nodejs

# 在centos里安装npm中canvas模块需要的依赖
RUN yum install -y cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel
```
* 通过 | docker Build 命名 路径 | 创建镜像。
    - 命令读取指定路径下（包括子目录）所有的Dockefile，并且把目录下所有内容发送到服务端，由服务端创建镜像。
    - docker build -t friendly-hello .
* 运行应用程序，使用以下命令将计算机的端口4000映射到容器的已发布端口5551 -p：
    - docker run -p 4000:5551 friendly-hello

# 使用docker请尽量遵从一个容器一个进程的原则
* 容器里如果一个进程都没有，则会自动停止。

# docker适不适合用在开发环境？
* 我本地代码更新了，镜像里的没变化，需要重新生成镜像，重新运行容器。
* 这岂不是很麻烦？如果能挂载本地目录，实现文件共享就行了。
* 如果不能，我个人觉的docker不适合本地的项目开发，如果能做到，那才是我想要的。
* 把项目做成docker镜像，相当于把本地代码拿到了服务器里的一个容器里，两者没有关联。
* 能做的也就是，创建一个项目运行所需要的环境镜像，镜像里可能会包含了redis，mongodb，mysql，nodejs，npm的依赖等
    - 然后运行容器。
    - 去容器的命令行里克隆代码安装依赖。启动项目。
    - 修改代码需要使用vim编辑器。
    - 改完之后更新镜像。
    - 没有IDE可以用，改起代码不方便，而且这样做和docker的一个容器一个进程的原则有冲突。
    - 如果一个容器一个进程，则只能把项目本身做声镜像。但是改代码还是要去容器里改。毕竟和本地没有关联。
* 我觉的也就是项目在本地开发完之后，打包成一个新版本的镜像发到dockerhub上，然后到服务器上把这个镜像更新一下，也就实现了代码的更新。别人如果也想部署。也就是pull个镜像的事。但这是部署方便，不代表开发方便。
    - 每次开发完都要重新生成新的镜像。发到dockerhub。
    - 然后到服务器上更新镜像。
* 我想要的无非是docker挂载本地目录，实现文件共享，就是这样。
* docker可以做到目录挂载，并可以通过一个文件方便的部署项目所需要的环境，进而管理多个容器。
    - -v 参数了解一下
    - docker-compose 了解一下
* docker适合本地开发，保证了生产环境和开发环境的一致性

# docker 启动，端口映射，挂载本地目录
* docker run -it -p 8070:8080 -v /e/www/suibianxiexie/:/root/suibianxiexie/ --privileged=true docker.io/centos /bin/bash
    - -it 创建一个交互式的容器
    - -p 映射端口8070 本机的端口 映射的容器的端口
    - -v 本地目录:容器目录，在创建前容器是没有software目录的，docker容器会自己创建
    - --privileged=true 关闭安全权限，否则你容器操作文件夹没有权限
    - 容器名称
    - CMD
* 通过-v参数，冒号前为宿主机目录，必须为绝对路径，冒号后为镜像内挂载的路径。
* 数据库中数据的存储位置都可以使用挂载，挂载到本地目录。

# 注意
* 容器内部的改动，停止之后，再开启就没了，因为还是老的容器。
  - 解决方案1. 停止之前，把改动之后的容器进行commit，变成新的镜像，开启新的容器。
  - 解决方案2. 挂载到宿主机。 -v

# win7 - docker挂载踩坑
* 在windows系统下面使用Docker Toolbox的vitualbox创建的默认虚拟主机默认只挂载了c盘到虚拟主机上。
  - 所以在使用docker run -v参数挂载数据卷的时候，只能挂载windows下的c盘到容器中。
  - 如果需要挂载e盘到虚拟主机，需要到vitualbox的设置下面去设置共享文件夹。增加e盘的共享。然后重启虚拟机。
* linux系统下只需要把用户加进docker分组就行 sudo usermod -aG docker 用户名。

# docker-compose
* Compose 是一个用户定义和运行多个容器的 Docker 应用程序。
* 在 Compose 中你可以使用 YAML 文件来配置你的应用服务。
* 然后，只需要一个简单的命令，就可以创建并启动你配置的所有服务。
* 在某个目录创建一个docker-compose.yml文件并写配置。以下是我尝试配置的一些东西。
    - https://github.com/zhouhuafei/docker-compose-config
    - 上面的配置里还记录了一些坑点，以及一些配置教程，还请自行参阅。
* docker-compose up
    - -d 后台运行

# 在`ubuntu`中使用`Docker`
```
# 安装docker-ce(社区版-免费) docker-ee(企业版-收费)
sudo apt-get install docker-ce

# 启动docker
sudo service docker start

# 停止docker
sudo service docker stop

# 重启docker
sudo service docker restart
```
