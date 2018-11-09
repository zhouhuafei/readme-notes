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
    - 网上的解决方案：删```package.lock```文件，然后```npm cache clean --force```。
    - 我的解决方案：先```npm i -g cnpm```然后```cnpm i```。
