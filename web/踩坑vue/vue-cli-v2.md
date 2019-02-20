# 使用sass
* 安装以下依赖即可(无需改动配置)。
```
cnpm i --save-dev node-sass sass-loader
```

# 打包build的时候上传到七牛
* 在生产环境的配置文件中使用七牛webpack包```qn-webpack```。
* 并需改publicPath为cdn的路径即可。

# 判断环境
* 在代码和配置中都可以通过```process.env.NODE_ENV```。

# 开发环境进行跨域
* 配置devServer中的proxy。

