## 如何安装依赖？
* 运行命令时，如果没安装，则系统会提示你安装。
* 例如你运行`docker --version`命令，但是你没安装`docker`，此时系统会提示你安装`apt install docker.io`。

## 如何部署的简易工具集？
* 除了nodejs服务是本地部署。
* 其他均是使用docker-compose部署。

## nginx容器为啥无法代理本机的124.71.136.111:6661端口？
* 因为安全组没放开6661端口。

## 如何修改redis容器中的数据？
* 先运行`docker exec -it redis bash`命令进入redis容器。
* 后运行`redis-cli`命令修改redis容器中的数据。
```
redis-cli -n 1
KEYS *
```

## 如何修改mongo容器中的数据？
#### db version v4.0.0之前
* 先运行`docker exec -it mongo bash`命令进入mongo容器。
* 后运行`mongo`命令连接数据库。
#### db version v4.0.0之后
* 先运行`docker exec -it mongo bash`命令进入mongo容器。
* 后运行`mongosh`命令连接数据库。
#### 常用命令
```shell
show dbs
use easy-tool-set
show collections
db.Hello.find()
```
