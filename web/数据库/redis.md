# redis默认多久存储到硬盘一次?
* save 900 1 900秒以内有1个键进行了修改,就持久化存储到硬盘
* save 300 10 300秒以内有10个键进行了修改,就持久化存储到硬盘
* save 60 10000 60秒以内有10000个键进行了修改,就持久化到硬盘

# redis停止服务,会不会把内存里的数据存储到硬盘?
* 用shutdown停止服务时可以持久化存储到硬盘(默认save) shutdown [save] [nosave]
* 用redis-server --service-stop停止服务时不可以持久化存储到硬盘

# 什么是redis
* redis用来存session，日志，验证码，高迸发队列(促销活动)，都是挺不错的选择，用来存经常被访问但是不经常被更改的数据最为合适，把数据缓存到redis减轻其他数据库的压力

# windows
* 下载windows版本的Redis
* 安装Redis(解压到指定目录即可) 
* 先配置系统的环境变量,否则redis-serve命令和redis-cli命令只能在redis安装目录下使用
* 启动命令 
```
redis-server redis.windows.conf
```
* 上面虽然启动了redis，但是只要一关闭cmd窗口，redis就会消失。所以要把redis设置成windows下的服务。 
* 设置Redis服务
```
redis-server --service-install redis.windows-service.conf --loglevel verbose
```
* 启动Redis服务
```
redis-server --service-start
```
* 测试redis是否启动成功
```
redis-cli
ping
```
* 出现PONG表示启动成功

## 数据保存到了哪里
* redis.windows.conf 文件里有句话 dbfilename dump.rdb(这个文件就是数据保存的地方)

## 常用的redis服务命令
* 卸载服务
```
redis-server --service-uninstall
```
* 开启服务
```
redis-server --service-start
```
* 停止服务：
```
redis-server --service-stop
```
* 可视化工具
  - Redis Desktop Manager

# mac
* 安装
```
brew install redis 
```
* 开机启动redis命令 (配置开机自启)
```
$ ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
```
* 使用launchctl启动redis server (启动开机自启)
```
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```
* 使用配置文件启动redis server （手动启动服务）
```
$ redis-server /usr/local/etc/redis.conf
```
* 停止redis server的自启动
```
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```
* redis 配置文件的位置
```
/usr/local/etc/redis.conf
```
* 数据的存放位置
```
/usr/local/var/db/redis/
```
* 卸载redis和它的文件
```
brew uninstall redis rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```
* 测试redis server是否启动
```
$ redis-cli ping
```
* 查看存储的所有键
```
redis-cli
keys *
```

# 应用
* Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。
```shell
set key 123
# 会输出 "123"
get key
set key '{"a":1,"b":2}'
# 会输出 "{\"a\":1,\"b\":2}"
get key
del key
```
* 我在nodejs中使用的redis模块
```
redisClient.set('key', 123); // 存储，这里其实也是异步的
redisClient.get('key', function(error, value){}); // value是'123'
redisClient.set('key', {a: 1, b: 2}); // 存储，这里其实也是异步的
redisClient.get('key', function(error, value){}); // value是'[object Object]' - 因存储时会把对象转为字符串 - 使用JSON序列化可以规避这个问题
```

## redis-cli
#### 启动redis-cli
* 运行`redis-cli`命令即可。
#### 使用某个库 - 默认使用第0个库
* 运行`SELECT 1`命令即可。或运行`redis-cli -n 1`命令。
#### 查看使用的哪个库
* `redis-cli`无对应命令。
#### 查看指定库的所有key
* 运行`KEYS *`命令即可。
