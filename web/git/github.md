### 目录
* [目录](#目录)
* [目录原理](#目录原理)
* [github自动执行脚本时，本地没有服务，也可以发送请求么？](#github自动执行脚本时本地没有服务也可以发送请求么)
* [GitHub Actions](#github-actions)
* [GitHub Pages](#github-pages)

### 目录原理
* 语法：`[任意文案](#锚点文案)`。
* 目录原理其实就是`a`标签锚点定位原理，直接使用一个`#`号即可实现。
* 注意：如果锚点文案包含标点符号的话，在锚点里需要把所有的标点符号去掉，否则锚点无效。可参考[目录](#目录)第三条的使用方式。
* 锚点文案注意事项：
  - 空格要更换为中划线。
  - 大写字母要更换为小写字母。
  - 不能包含标点符号。
  - 不能包含特殊符号。

### github自动执行脚本时，本地没有服务，也可以发送请求么？
* 当然可以发送请求啊。
* 使用浏览器发送请求时也没有说新建一个本地服务啊。直接用的xhr。
* 如果是nodejs，直接用http模块就可以发送请求啊。
* 因为请求方是客户端，只要服务端存在，客户端肯定是可以直接进行请求的啊。
* 如果客户端也是一个服务器，那一般都是充当代理服务器的角色，没有这个角色也是可以直接请求的。

### GitHub Actions
* 介绍：http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
* 案例：https://github.com/zhouhuafei2/UnicomTask/

### GitHub Pages
* 官网：https://pages.github.com/
