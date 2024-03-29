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
  - 经测试，在系统自带的`命令行工具`中或者`Git Bash`中，只有`全局安装`npm包后才可以直接在命令行运行对应命令。
  - 非全局安装可以在`package.json的scripts字段`中运行。因会在`node-modules/.bin/`目录中查找。
  - 非全局安装也可以用`npx`进行运行。因会在`node-modules/.bin/`目录中查找。
  - 非全局安装也可以在`WebStorm的命令行`中可以直接运行。因会在`node-modules/.bin/`目录中查找。
* 3、发布、安装、使用。
* 说明：
    - `npm install`在`./node_modules/.bin/`目录中会生成`wx-get-pages-json`文件和`wx-get-pages-json.cmd`文件。
    - `cmd`文件是一个`windows`内核脚本文件，可以直接双击运行。而`window`下`npm run`调用的也是这个`cmd`文件。
    - 无后缀文件是给`linux`系统使用的shell脚本文件。文件内容第一行是：`#!/bin/sh`。

# 开发阶段
* 问题：开发npm包时，想安装之后，运行看看，但是又不想发布到npm上。
* 我的位置-运行命令时所处路径：`/Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test`。
* 解决方案-1：`npm link`别名`npm ln`。不推荐：因不会在`package.json`中增加依赖，不方便多人协作开发和调试。
    - `npm link`：Symlink(符号链接即软链接)一个package文件夹。`npm link`命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包。
    - 本地`npm link`之后，会在全局的`npm`目录中会生成`wx-get-pages-json`文件和`wx-get-pages-json.cmd`文件(不同系统全局文件所在位置不同)。在全局的`npm/node_modules`目录中，会生成对应的`wx-get-pages-json`软链接目录。
    ```
    npm link ../wx-get-pages-json
    # 等同于
    npm link ../
    # 不等同于(会报错)
    npm link ..
    # 如果所处位置为wx-get-pages-json目录可直接运行
    npm link
    # 等同于
    npm link ./
    ```
* 解决方案-2：`npm install`别名`npm i`。推荐：因会在`package.json`中增加依赖，方便多人协作开发和调试。
    - 本地安装之后，对应目录的`./node_modules/.bin/`目录中会生成`wx-get-pages-json`文件和`wx-get-pages-json.cmd`文件。在`./node_modules`目录中，会生成对应的`wx-get-pages-json`软链接目录。
    - 也可本地进行全局安装，`npm i`带`-g`参数即可。全局安装，效果等同于`npm link`。
    ```
    npm install file:../../wx-get-pages-json
    # 等同于
    npm install file:../
    # 等同于
    npm install file:..
    ```
* 上述建立的链接都是软链接，相当于快捷方式。开发包中的文件内容改变了，软链接中的文件内容亦会跟着改变。

# 命令行中的命令一般都有一些使用说明
> https://github.com/tj/commander.js
* commander包是node.js命令行界面的完整解决方案。
* 可以用来生成命令行的使用说明。
* 在入口文件中使用```commander```包可以帮助你生成使用说明。

# 其他包
* 解析命令行参数：https://github.com/yargs/yargs
* 控制台字符样式：https://github.com/chalk/chalk

# 什么是`#!`？
* `#!`：这个符号的名称，叫做`Shebang`或者`Sha-bang`。长期以来，`Shebang`都没有正式的中文名称。Linux中国翻译组的GOLinux将其翻译为`释伴`，即`解释伴随行`的简称，同时又是`Shebang`的音译。

# ```#!/usr/bin/node``` 和 ```#!/usr/bin/env node``` 的区别？
* ```#!/usr/bin/node```是告诉操作系统执行这个脚本的时候，调用```/usr/bin```下的node解释器。
* ```#!/usr/bin/env node```这种用法是为了防止操作系统用户没有将node装在默认的```/usr/bin```路径里。当系统看到这一行的时候，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
* ```#!/usr/bin/node```相当于写死了node路径。
* ```#!/usr/bin/env node```会去环境设置寻找node目录，推荐这种写法。

# `/bin/bash`和`/bin/sh`的区别？
* `/bin/sh`是`/bin/bash`的软连接，在一般的linux系统当中，使用sh调用执行脚本相当于打开了bash的POSIX标准模式，也就是说`/bin/sh`相当于`/bin/bash --posix`。
* `/bin/sh`执行过程中，若出现命令执行失败，则会停止执行。`/bin/bash`执行过程中，若命令执行失败，仍然会继续执行。
