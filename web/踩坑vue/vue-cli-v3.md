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
    ```
    devServer: {
        proxy: {
            '/api': {
                target: 'https://sbxx.top/admin/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    ```
* 怎么增加预发布环境的配置？
    - 待续...
* 怎么在生产时把静态资源上传到七牛?
    - 待续...
* 怎么配置```publicPath```？
    - 在```vue.config.js```中配置。
* vue-cli2、vue-cli3的postcss-pxtorem插件 px转换rem
    - 在vue-cli2中的设置：是在.postcssrc.js文件中设置。
    ```
    module.exports = {
      "plugins": {
        "postcss-pxtorem":{
          rootValue: 75,
          unitPrecision: 5, // 最小精度，小数点位数
          propList: ['*','!font*'], // !不匹配属性（这里是字体相关属性不转换）
          selectorBlackList: [],
          minPixelValue:2 // 替换的最小像素值
        }
      }
    }
    ```
    - 在vue-cli3中的设置：是在package.json文件中设置。
    ```
    "postcss": {
      "plugins": {
        "autoprefixer": {},
        "postcss-pxtorem": {
          "rootValue": 75,
          "unitPrecision": 5,
          "propList": ["*","!font*"],
          "selectorBlackList": [],
          "minPixelValue":2
        }
      }
    }
    ```
    - px2rem的js代码包：```amfe-flexible```。

# 以上疑惑的解决案例
https://github.com/zhouhuafei/hello-world_vue-cli3_vant

# 官方文档
https://cli.vuejs.org/zh/

# 可视化配置
```
vue ui
```
