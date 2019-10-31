# nginx高可用概念
> nginx做为负载机，分发请求，但是如果nginx服务器宕机了呢？为了防止这种情况出现，于是就有了所谓的nginx高可用概念。
* 原理：主服务器上配置一份nginx，从服务器(备份服务器)上配置一份nginx，当主服务器宕机了，就切到从服务器上。
  - 用户访问虚拟ip。主从服务器都需要配置`keepalived`和绑定虚拟ip。
* 工具：`keepalived`。搜索关键字`keepalived nginx`即可得到相关知识点。
