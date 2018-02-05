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
* 启动mongodb数据库
```
brew services start mongodb 
```
* 停止mongodb数据库 
```
brew services stop mongodb 
```
* 配置文件的位置 
```
/usr/local/etc/mongod.conf
```
*日志的位置
```
/usr/local/var/log/mongodb/mongo.log
```
* 数据的位置 
```
/usr/local/var/mongodb/
```
* 输入mongo命令,链接成功,则表示mongodb服务是启动状态
* 可视化工具
  - Studio 3T

# windows