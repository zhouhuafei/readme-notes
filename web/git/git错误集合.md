# git克隆vue的源码项目时报如下错误
> git clone https://github.com/vuejs/vue.git
```
Cloning into 'vue'...
remote: Enumerating objects: 2, done.
remote: Counting objects: 100% (2/2), done.
remote: Compressing objects: 100% (2/2), done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```
* 原因：移动宽带网络问题
* 解决方案：使用手机热点
