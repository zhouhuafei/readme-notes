# 教程
http://www.runoob.com/docker/docker-tutorial.html
http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html

# 下载
* Docker for Windows 在Windows上运行Docker。系统要求，Windows10x64位，支持Hyper-V。
* Docker for Mac 在Mac上运行Docker。系统要求，OS X 10.10.3 或者更高版本，至少4G内存，4.3.30版本以前的VirtualBox会与Docker for Mac产生冲突，所以请卸载旧版本的VitrualBox。
* 如果您的电脑版本过旧，可以使用 Docker Toolbox 在Windows或者Mac上运行Docker。适用于Mac OS X 10.8+ 或者 Windows 7/8.1。
* https://get.daocloud.io/#install-docker-for-mac-windows

# 官网
* 注册账号 https://hub.docker.com/

# Windows7 安装
* 下载Docker Toolbox。
* 一路next即可完成安装。
* 我是win7，所以是按照这种方式安装的，下面的Windows10x64 安装，我并没有进行亲自尝试。
* 本人参考了这篇博客 https://blog.csdn.net/qq2712193/article/details/54576313

# Windows10x64 安装
* 安装
```
choco install docker-for-windows --pre
```
* 安装目录
    - chocolatey的安装路径在哪，通过choco安装的东西就会在对应的地方。
    - 我本地把chocolatey的安装路径定制到了D盘。
    - 详情请参阅同级目录里的chocolatey.md文件。
    - https://chocolatey.org/packages/docker-for-windows
    ```
    D:\chocolatey\lib\docker-for-windows\tools\
    tools\chocolateyinstall.ps1
    tools\chocolateyuninstall.ps1
    ```
* 更新
```
choco upgrade docker-for-windows --pre
```

# docker镜像
docker镜像是一个构建容器的只读模板，它包含了容器启动所需的所有信息，包括运行程序和配置数据。
* 官方提供的镜像 https://hub.docker.com/explore/

# docker容器
docker容器可以理解为在沙盒中运行的进程。这个沙盒包含了该进程运行所必须的资源，包括文件系统、系统类库、shell 环境等等。但这个沙盒默认是不会运行任何程序的。你需要在沙盒中运行一个进程来启动某一个容器。这个进程是该容器的唯一进程，所以当该进程结束的时候，容器也会完全的停止。

# docker基础命令
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
    - -t:在新容器内指定一个伪终端或终端。
    - -i:允许你对容器内的标准输入 (STDIN) 进行交互。
    - -d:让容器在后台运行。
    - -p:将容器内部使用的网络端口映射到我们使用的主机上。
* docker run -it centos
    - 此时我们已进入一个 centos 系统的容器
* 使用 docker stop 命令来停止容器
* 通过运行 exit 命令或者使用 Ctrl + d 来退出容器。

# Dockerfile 创建自定义的Docker镜像
* .dockerignore文件 作用和 .gitignore 类似。
* 创建Dockerfile文件，无后缀，名字就是Dockerfile。
* 以下配置和docker的一个容器一个进程的原则有冲突。
```
# 从一个基础镜像centos:6.8开始构建
FROM centos:6.8

# 维护者信息
MAINTAINER zhouhuafei "1123486116@qq.com"

# 创建项目目录
RUN mkdir -p /home/suibianxiexie/
# 指定项目目录
WORKDIR /home/suibianxiexie/
# 复制当前目录下所有文件到项目目录
COPY . /home/suibianxiexie/

# 安装nginx
RUN yum install -y nginx
# 运行nginx
RUN service nginx start

# 安装redis
RUN yum install -y redis
# 运行redis
RUN service redis start

# 安装mongodb
RUN yum install -y mongodb-org
# 运行mongodb
RUN service mongod start

# 安装nodejs
RUN yum install -y nodejs

# 安装npm中canvas模块需要的依赖
RUN yum install -y cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel
# 安装npm的全局模块
RUN npm install -g nrm
RUN npm install -g bower
RUN npm install -g jest
RUN npm install -g n
RUN npm install -g pm2
RUN npm install -g nodemon
RUN npm install -g gulp
RUN npm install -g webpack
RUN npm install -g vue-cli
# 安装npm的其他模块
RUN npm install

# 暴露5551端口
EXPOSE 5551

# 使用命令 pm2 start app.js 之后, pm2 默认在后台运行, 如果使用了Docker后,容器运行并立即退出,需要手动给“pm2”指定参数 --no-daemon
CMD pm2 start pm2.json --no-daemon
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
* 这岂不是很麻烦？
* 我个人觉的docker不适合本地的项目开发。
* 把项目做成docker镜像，相当于把本地代码拿到了服务器里的一个容器里，两者没有关联。
* 能做的也就是，创建一个项目运行所需要的环境镜像，镜像里可能会包含了redis，mongodb，mysql，nodejs，npm的依赖等
    - 然后运行容器。
    - 去容器的命令行里克隆代码安装依赖。启动项目。
    - 修改代码需要使用vim编辑器。
    - 没有IDE可以用，改起代码不方便，而且这样做和docker的一个容器一个进程的原则有冲突。
* 我觉的也就是项目开发完之后，打包成一个新版本的镜像发到dockerhub上，然后到服务器上把这个镜像更新一下，也就实现了代码的更新。别人如果也想部署。也就是pull个镜像的事。但这是部署方便，不代表开发方便。
