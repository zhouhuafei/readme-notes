# 使用sass
* 安装以下依赖即可(无需改动配置)。
```
cnpm i --save-dev node-sass sass-loader
```

# 几点疑惑
> vue-cli3中，默认没有配置文件。
* 怎么判断开发环境和生产环境？
    - ```process.env.NODE_ENV```。
* 怎么修改eslint的配置？
    - ```package.json```中修改。
* 怎么配置跨域？
    - 在```vue.config.js```中配置```devServer```的```proxy```。
* 怎么增加预发布环境的配置？
    - 待续...
* 怎么在生产时把静态资源上传到七牛?
    - 待续...
* 怎么配置```publicPath```？
    - 在```vue.config.js```中配置。

# 注
* 看vue-cli3的官方文档可以得到答案。
    - https://cli.vuejs.org/zh/

# 可视化配置
```
vue ui
```
