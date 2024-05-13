# mac
* 安装
```
brew install mongodb
```
* 开机启动mongodb命令 (配置开机自启)
```
$ ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
```
* 使用launchctl启动mongodb server (启动开机自启)
```
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```
* 使用配置文件启动mongodb server （手动启动服务)
* 注:不能关闭终端窗口,否则会服务会被中断,因为默认配置里没有写入后台守护进程fork
```
$ mongod -f /usr/local/etc/mongod.conf
```
* 可以自定义配置 - 修改mongod.conf
```
dbpath =  /usr/local/mongodb/data/
logpath = /usr/local/mongodb/log/mongodb.log
fork = true
```
* 停止mongodb server的自启动
```
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```
* 我亲测，上面的停止mongodb server的自启动无效，需要进行如下次操作才行。
```
rm /Users/zhouhuafei/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```
* 启动mongodb数据库：`brew services start mongodb`。
* 停止mongodb数据库：`brew services stop mongodb`。
* 配置文件的位置：`/usr/local/etc/mongod.conf`。
* 日志的位置：`/usr/local/var/log/mongodb/mongo.log`。
* 数据的位置：`/usr/local/var/mongodb/`。
* 输入mongo命令，连接成功，则表示mongodb服务是启动状态。
* 可视化工具：`Studio 3T`。
#### 启动mongodb数据库
* 运行`mongod`命令即可。
#### 连接mongodb数据库
* `MongoDB 4.0`版本之前使用`mongo`命令。
* `MongoDB 4.0`版本之后使用`mongosh`命令。
#### 查看mongodb数据库的版本号
* 查看MongoDB数据库服务器的版本：`mongod --version`。
* 查看MongoDB命令行客户端`mongo shell`的版本：`mongo --version`。
* 查看MongoDB命令行客户端`mongosh shell`的版本：`mongosh --version`。

# windows
