# 使用sass
* 安装以下依赖即可(无需改动配置)。
```
npm i --save-dev node-sass sass-loader
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
    - 1、package.json的```scripts```字段上添加：
    ```
    "alpha": "vue-cli-service build --mode alpha"
    ```
    - 2、在项目根目录添加文件```.env.alpha```和```.env.build```，其内容：
    ```
    NODE_ENV = 'production'
    VUE_APP_TITLE = 'alpha'
    ```
    ```
    NODE_ENV = 'production'
    VUE_APP_TITLE = 'production'
    ```
    - 3、区分环境
    ```
    var env = process.env.NODE_ENV === 'development' ? 'development' :
    process.env.VUE_APP_TITLE === 'alpha' ? 'alpha' : 'production';
    ```
    - 参考文档：https://www.cnblogs.com/XHappyness/p/9337229.html
    - 建议：如果环境很多建议使用这个包来跨平台设置环境变量，然后在打包之前执行一段脚本动态生成```.env.alpha```文件：https://github.com/kentcdodds/cross-env 。此处就不贴脚本```create-env.js```的内容了。
    ```
    "scripts": {
        "create-env": "cross-env NODE_ENV=dev1 node ./create-env.js && cross-env NODE_ENV=dev2 node ./create-env.js"
    }
    ```
* 怎么在生产时把静态资源上传到七牛云存储或者腾讯云存储?
    - https://github.com/bluedapp/gulp-qn
    - https://github.com/TabSpace/gulp-qcloud-cos-upload
    - https://github.com/lyfeyaj/qn-webpack
    - https://github.com/takashiki/cos-webpack
    - 插件可以在```vue.config.js```中配置。具体还请参阅文档。https://cli.vuejs.org/zh/
* 怎么配置```publicPath```？
    - 在```vue.config.js```中配置。
* vue-cli2、vue-cli3的postcss-pxtorem插件 px转换rem。
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
* ```vue.config.js```中无法引入其他模块?
    - 经测试，引入任何模块都会导致```npm run serve```报错。

* ```vue.config.js```中```baseUrl```和```publicPath```的区别?
    - 建议使用```publicPath```，因为使用```baseUrl```时，打包build会给出以下警告。
    - ```WARN  "baseUrl" option in vue.config.js is deprecated now, please use "publicPath" instead```。
    - 所以两者理应没有区别。只是前者会被逐渐废弃掉罢了。

* favicon为什么要放到public目录，为什么不直接通过base64的形式引入?
    - index.html中的案例：```<link rel="icon" href="<%= BASE_URL %>favicon.ico">```
    - 不知道！
    - 建议：打成base64的数据进行引入或者引入远程的资源。

# 以上疑惑的解决案例
https://github.com/zhouhuafei/hello-world_vue-cli3_vant

# 官方文档
https://cli.vuejs.org/zh/

# 可视化配置
```
vue ui
```

# 为什么vue-cli3的官网在手机上访问时，可以有添加到桌面的功能？
* 因为使用了manifest https://cli.vuejs.org/manifest.json
```
<link rel="manifest" href="/manifest.json">
```
```
{
    "name": "Vue CLI",
    "short_name": "Vue CLI",
    "icons": [
        {
        "src": "/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
        },
        {
        "src": "/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
        }
    ],
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#fff",
    "theme_color": "#3eaf7c"
}
```

# 个人使用vue-cli3的流程如下
* 我选择的默认配置(建议自定义配置，把eslint和postcss的配置剥离出来，不放到package.json中)
```
vue create project-name
npm i --save-dev node-sass sass-loader
vue add router
vue add vuex
```
* 等依赖安装完毕之后，如果我删除了```node_modules```文件夹，转而使用```cnpm i```安装依赖，最后```npm run build```会报错。
    - 所以我又删除了node_modules文件夹，然后使用```npm i```老老实实的安装，就没出线报错的问题了。
