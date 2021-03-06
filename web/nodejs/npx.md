> 摘自：http://www.ruanyifeng.com/blog/2019/02/npx.html

# 调用项目安装的模块
* npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具 Mocha。
```
npm install -D mocha
```
* 一般来说，调用Mocha，只能在项目脚本和`package.json的scripts字段`里面，如果想在命令行下调用，必须像下面这样。
```
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```
* npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像`npx mocha --version`这样调用就行了。
  - 经测试，直接`mocha --version`也可以调用，但是前提是需要用`WebStorm的命令行`。
  - 在系统内置的命令行中或者`Git Bash`中不可以直接调用，但是可以使用`npx mocha --version`进行调用。
* 由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。
    - 案例：
    ```
    # 等同于 ls
    $ npx ls
    ```
    - 注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。
    - 怎么区分一命令是不是系统命令：使用`type`命令进行区分。
        - `type ls`：`ls is an alias for ls -G`
        - `type cd`：`cd is a shell builtin`
        - `type node`：`node is /usr/local/bin/node`
        - `type npm`：`npm is /usr/local/bin/npm`
        - `type type`: `type is a shell builtin`
* 案例：以下是在我本机`xcx-caodong-user`项目下各自运行`gulp -v`的结果。
    - 全局：`gulp -v`
    ```
    CLI version 3.9.1
    Local version 4.0.0
    ```
    - 局部：`npx gulp -v`
    ```
    CLI version 2.0.1
    Local version 4.0.0
    ```

# 避免全局安装模块
* 除了调用项目内部模块，npx 还能避免全局安装的模块。比如，create-react-app这个模块是全局安装，npx 可以运行它，而且不进行全局安装。
```
$ npx create-react-app my-react-app
```
* 上面代码运行时，npx 将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app。
* 注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。
```
$ npx http-server
```

# 注意
> 踩坑：https://github.com/zhouhuafei/wx-key-replace
* 项目根目录下不要有和`npx`指令要运行的包同名的js文件，否则会直接运行对应文件，导致不会运行`node_modules`下对应的包。
* 例如我要运行`npx wx-key-replace`。
* 则项目根目录下就不要有`wx-key-replace.js`，否则会直接运行`wx-key-replace.js`，而不是运行`node_modules`下的`wx-key-replace`包。
* 建议把`wx-key-replace.js`文件改为`wx-key-replace.config.js`。
