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
``
npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"`
``
