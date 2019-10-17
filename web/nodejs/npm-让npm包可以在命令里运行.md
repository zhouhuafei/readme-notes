# 让自己发布的包可以在命令行运行
* 1、在`package.json`中的`bin`属性中，指定命令的入口文件。
```
{
  "bin": {
    "wx-get-pages-json": "../bin/index.js"
  }
}
```
* 2、bin的入口文件的顶部加一句话`#!/usr/bin/env node`。
* 3、发布、安装、使用。
* 原理(windows)：在`./node_modules/.bin/`目录中会生成`wx-get-pages-json`文件和`wx-get-pages-json.cmd`文件。
    - cmd文件 是 一个 windows 内核脚本文件，可以直接双击运行
    - 而 window 下 npm run 调用的也是这个 cmd 文件
* 原理(linux)：待续...

# 开发阶段
* 问题：开发npm包时，想安装之后，运行看看，但是又不想发布到npm上。
* 解决方案1：本地局部安装。待续...
```
npm install file:../wx-get-pages-json
```
* 解决方案2：本地全局安装。待续...
```
npm link ../wx-get-pages-json
```

# 命令行中的命令一般都有一些使用说明
> https://github.com/tj/commander.js
* commander包是node.js命令行界面的完整解决方案。
* 可以用来生成命令行的使用说明。
* 在入口文件中使用```commander```包可以帮助你生成使用说明。

# 其他包
* 解析命令行参数：https://github.com/yargs/yargs
* 控制台字符样式：https://github.com/chalk/chalk

# 什么是`#!`
* `#!`：这个符号的名称，叫做`Shebang`或者`Sha-bang`。长期以来，`Shebang`都没有正式的中文名称。Linux中国翻译组的GOLinux将其翻译为`释伴`，即`解释伴随行`的简称，同时又是`Shebang`的音译。

# ```#!/usr/bin/node``` 和 ```#!/usr/bin/env node``` 的区别
* ```#!/usr/bin/node```是告诉操作系统执行这个脚本的时候，调用```/usr/bin```下的node解释器。
* ```#!/usr/bin/env node```这种用法是为了防止操作系统用户没有将node装在默认的```/usr/bin```路径里。当系统看到这一行的时候，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
* ```#!/usr/bin/node```相当于写死了node路径。
* ```#!/usr/bin/env node```会去环境设置寻找node目录，推荐这种写法。
