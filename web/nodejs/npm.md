* 使用默认的配置来创建package.json文件
```
npm init --yes
```
* 全局安装
```
npm i -g module
```
* 注:下面的描述里,凡是带-g都表示全局环境,不带-g就表示在当前项目,
* 查看当前项目里哪些包需要被更新
```
npm outdated
```
* 查看全局环境下哪些包需要被更新
```
npm outdated -g
```
* 项目内安装
```
npm install module
```
* 简写
```
npm i module
```
* 项目内安装并写入package.json的开发依赖
```
npm i --save-dev module
```
* 简写
```
npm i -D module
```
* 项目内安装并写入package.json的生产依赖
```
npm i --save module
```
* 简写
```
npm -S module
```
* 查看全局环境下安装过哪些包
```
npm list -g --depth 0
```
* 查看全局环境下哪些包需要被更新
```
npm outdated -g
```
* 更新全局环境下的包
```
npm update -g
```
* 只安装dependencies而不安装devDependencies，这样你只是单纯的使用这个包而不需要进行一些改动测试之类。
```
npm install --production
```

* nodejs版本管理，切换安装其他版本(个人倾向这个) https://yarnpkg.com/zh-Hans/package/n
* nodejs版本管理，切换安装其他版本 https://yarnpkg.com/zh-Hans/package/nvm
* git提交之前进行检测 https://www.npmjs.com/package/husky
* git提交之前把代码按照eslint的规范进行格式修复 https://www.npmjs.com/package/lint-staged

# 打不推荐使用标识
> 语法
```
npm deprecate <pkg>[@<version>] <message>
```
> 案例
```
npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"`
```

# 线上
* 2018/10/11
* npm上zhf.xxx系列我总共发布了64个包，github上zhf.xxx系列我总共发布了60个包
* 其中4个是重命名的 64 - 4 = 60
    - zhf.event 重命名为了 zhf.event-emitter
    - zhf.dom-create 重命名为了 zhf.html-to-dom
    - zhf.str-type 重命名为了 zhf.check-str
    - zhf.ip 重命名为了 get-client-ip
* 其中有6个包打了不推荐使用标识
    - 因重命名不再维护：zhf.event，zhf.dom-create，zhf.str-type，zhf.ip
    - 因纯依赖不再维护：zhf.tools，zhf.applications

# npm报错
* ```npm i```时报错：```npm ERR! Unexpected end of JSON input while parsing near```
    - 网上的解决方案：删```package-lock.json```文件，然后```npm cache clean --force```。
    - 我的解决方案：先```npm i -g cnpm```然后```cnpm i```。
* sass报错：```Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (57) For more information on which environments are supported please see:```。
    - 解决方案：gulp-sass升级到3版本以上。

# 版本
* ```~```会匹配最近的小版本依赖包，比如```~1.2.3```会匹配所有```1.2.x```版本，但是不包括```1.3.0```
* ```^```会匹配最新的大版本依赖包，比如```^1.2.3```会匹配所有```1.x.x的```包，包括```1.3.0```，但是不包括```2.0.0```

# 设置环境变量
* Linux：```export NODE_ENV=production```
* Windows：```set NODE_ENV=production```
* 跨平台：https://github.com/kentcdodds/cross-env

# package.json指定路径为github上的路径
* 方式1：package.json中配置`"sass-export": "git://github.com/zhouhuafei-team/sass-export.git#master"`。
* 方式2：`npm i git://github.com/zhouhuafei-team/sass-export.git#master`。`npm i`默认是`--save`。
* 潜在问题：若工具包的文件入口在dist目录里，而github的仓库又忽略了dist目录。这种场景怎么破？
* 解决方案：在仓库的`package.json`中使用`prepare`钩子。
    - `prepare`钩子会在两种情况前运行，一是`npm publish`命令前，二是`npm install(不带任何参数)`命令前；它会在`prepublish`之后、`prepublishOnly`之前执行。注：`cnpm i`不行。
    - `prepublishOnly`钩子，是`npm 4`到`npm 5`时，过渡`prepublish`和`prepare`时才有的。
    - 使用案例如下：
    ```
    "scripts": {
      "build": "gulp build",
      "prepare": "npm run build"
    }
    ```
* 测试`prepare`钩子是否是解决问题的关键。
    - 我把`sass-export`项目里的`prepare`钩子删掉之后。
    - 再通过`npm i`去安装`github`上的`sass-export`包时，发现包里无`dist\`目录了。
    - 证实`prepare`钩子是解决问题的关键。
* 测试`package.json`的`files`属性是否是控制指定的目录才会被发到npm上的关键。
    - 我把`sass-export`项目里的`files`属性删掉之后。
    - 再通过`npm i`去安装`github`上的`sass-export`包时，发现包里多了很多开发时的目录，例如：`src`目录、`exported-examples`目录、`test`目录。
    - 证实`package.json`的`files`属性是控制npm上传和下载哪些目录的关键。
* 其他钩子具体请参考下述：`npm 钩子`。
  
# npm 钩子
> ###### 参考文档：http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
> ###### 参考文档：https://segmentfault.com/a/1190000008832423
* `npm`脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。
* 用户执行`npm run build`的时候，会自动按照下面的顺序执行。
```
npm run prebuild && npm run build && npm run postbuild
```
* `npm`默认提供下面这些钩子。
```
prepublish，postpublish // 在npm publish命令执行前后触发
preinstall，postinstall // 在npm install命令执行前后触发
preuninstall，postuninstall // 在npm uninstall命令执行前后触发
preversion，postversion // 在改变包的version前后触发 提交之前
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```
* 自定义的脚本命令也可以加上`pre`和`post`钩子。比如，`myscript`这个脚本命令，也有`premyscript`和`postmyscript`钩子。不过，双重的`pre`和`post`无效，比如`prepretest`和`postposttest`是无效的。
* 注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install(不带任何参数)`命令之前运行。这种行为很容易让用户感到困惑，所以 `npm 4` 引入了一个新的钩子`prepare`，行为等同于`prepublish`，而从 `npm 5` 开始，`prepublish`将只在`npm publish`命令之前运行。

# package.json属性
> 参考文档：https://www.cnblogs.com/tzyy/p/5193811.html
* main
    - 指定程序的主入口文件。
* files
    - "files"属性的值是一个数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来（除非文件被另一些配置排除了）。
    - 你也可以在模块根目录下创建一个".npmignore"文件（windows下无法直接创建以"."开头的文件，使用linux命令行工具创建如git bash），写在这个文件里边的文件即便被写在files属性里边也会被排除在外，这个文件的写法".gitignore"类似。
    - 注：配置了这个属性，则只有指定的目录会被发到npm上。
    - 例如sass-export有以下配置。`npm publish`之后，我安装的`sass-export`包中，只有`bin\`,`dist\`,`LICENSE`,`package.json`,`README.md`文件。
    ```
    "files": [
      "bin",
      "dist"
    ]
    ```
* bin
    - 很多模块有一个或多个需要配置到PATH路径下的可执行模块，npm让这个工作变得十分简单（实际上npm本身也是通过bin属性安装为一个可执行命令的）。
    - 如果要用npm的这个功能，在package.json里边配置一个bin属性。bin属性是一个已命令名称为key。
    ```
    "bin": {
      "sass-export": "./bin/sass-export"
    }
    ```
  
# github的LICENSE文件
* MIT 许可证 -- 只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。
* Apache 许可证 -- 类似 MIT 许可证，但它同时还包含了贡献者向用户提供专利授权相关的条款。
* GPL 许可证 -- 这是一种copyleft许可证，要求修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。V3版本与V2类似，但其进一步约束了在某些限制软件更改的硬件上的使用范围。
* 创建LICENSE文件，GitHub有提供最直接的创建方式。
    - 1、点击`Create new file`按钮。
    - 2、在输入`LICENSE`后会自动出现`Choose a license template`选项按钮，点击此按钮。
    - 3、以`MIT License`为例，选择`MIT License`，选好所需许可后点击`Review and submit`按钮。
    - 4、在页面下方会有两个选择
        - 选择一 `Commit directly to the master branch.`直接将此许可证提交到`master`分支。
        - 选择二 `Create a new branch for this commit and start a pull request.`新建立一个分支。
        - 我们选择`Commit directly to the master branch.`提交到`master`分支的选项，然后点击`Commit new file`即可创建完成。

# 四个常用的 npm 脚本有简写形式。
* `npm start`是`npm run start`的简写。
* `npm stop`是`npm run stop`的简写。
* `npm test`是`npm run test`的简写。
* `npm restart`是`npm run stop && npm run restart && npm run start`的简写。
* `npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop、restart、start`。
