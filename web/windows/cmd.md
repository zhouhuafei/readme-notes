# 查看进程的端口和pid
* 查询
```
netstat -ano
```
* 筛选
```
netstat -ano | findstr 7001
```
* 参数
  - `-a`：显示所有链接和监听端口
  - `-n`：以数字显示ip和端口号
  - `-o`：显示相关进程
