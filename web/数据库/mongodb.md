# mac
#### 安装mongodb数据库
* 运行`brew install mongodb`命令即可。
* 配置文件的位置：`/usr/local/etc/mongod.conf`。
* 数据的位置：`/usr/local/var/mongodb/`。
* 日志的位置：`/usr/local/var/log/mongodb/mongo.log`。
* 可视化工具：`Studio 3T`。
#### 手动启动mongodb数据库
* 使用`brew`命令启动mongodb数据库：`brew services start mongodb`。
* 使用`brew`命令停止mongodb数据库：`brew services stop mongodb`。
* 使用`mongod`命令启动mongodb数据库：`mongod -f /usr/local/etc/mongod.conf`。
  - 注：不能关闭终端窗口，否则会服务会被中断，因为默认配置里没有写入后台守护进程fork。
  - 可以自定义配置：修改`mongod.conf`。
  ```
  dbpath = /usr/local/var/mongodb/
  logpath = /usr/local/var/log/mongodb/mongo.log
  fork = true
  ```
* 使用`mongod`命令停止mongodb数据库：`mongod --shutdown`。
#### 开机自启动mongodb数据库
* 配置开机自启：`ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents`。
* 使用launchctl启动开机自启：`launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist`。
* 使用launchctl停止开机自启：`launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist`。
  - 亲测发现上面的停止开机自启无效。
  - 需要这样操作才可以停止开机自启：`rm /Users/zhouhuafei/Library/LaunchAgents/homebrew.mxcl.mongodb.plist`。
#### 连接mongodb数据库
* `MongoDB 4.0`版本之前使用`mongo`命令，连接成功，则表示mongodb服务是启动状态。
* `MongoDB 4.0`版本之后使用`mongosh`命令，连接成功，则表示mongodb服务是启动状态。
#### 查看mongodb数据库的版本号
* 查看MongoDB数据库服务器的版本：`mongod --version`。
* 查看MongoDB命令行客户端`mongo shell`的版本：`mongo --version`。
* 查看MongoDB命令行客户端`mongosh shell`的版本：`mongosh --version`。

# windows
