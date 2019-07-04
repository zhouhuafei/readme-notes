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
                target: 'http://sbxx.top/admin/api',
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
    - 2、在项目根目录添加文件```.env.alpha```和```.env.production```，其内容：
    ```
    NODE_ENV = 'production'
    VUE_APP_TITLE = 'alpha'
    ```
    ```
    NODE_ENV = 'production'
    VUE_APP_TITLE = 'production'
    ```
    ```
    // 注意：NODE_ENV都要设置为'production'，否则打包打不出和生产环境类似的文件。如此做法相当于走build的流程，但又可以让你根据VUE_APP_TITLE做一个特定的处理。
    // 增加```.env.development```文件，此文件是开发环境需要的文件。因默认没有这个文件，所以开发环境下通过process.env.VUE_APP_TITLE获取不到值，为了能获取到值，我就新增了此文件。文件内容如下：
    // 开发环境默认读取```.env.development```文件，生产环境默认读取```.env.production```文件。
    NODE_ENV = 'development'
    VUE_APP_TITLE = 'development'
    ```
    - 3、区分环境
    ```
    var env = process.env.NODE_ENV === 'development' ? 'development' :
    process.env.VUE_APP_TITLE === 'alpha' ? 'alpha' : 'production';
    // 以上是因为没增加```.env.development```文件，开发环境获取不到process.env.VUE_APP_TITLE的值，所以才有了上述判断。
    // 如果每个环境都有对应的```.env.xxx```文件，则可以直接使用process.env.VUE_APP_TITLE的值来区分环境。就不必像上述那么麻烦了。
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

# 建议自定义配置
* Babel
* Router
* vuex
* CSS Pre-processors
* Linter / Formatter
* 不要选择```Lint on save```，对WebStorm编辑器太不友好了。
    - WebStorm编辑器使用者建议选择：```Lint and fix on commit```。

# history模式配置二级目录(正确的设置方式，在最后的建议中)
* vue-router配置
```javascript
new Router({
 mode: 'history',
 // base: process.env.BASE_URL,
 base: '/test',
 routes: [
   {
     path: '*',
     name: 'NotFound',
     component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound'),
     meta: { title: '404' }
   }
 ]
})
```
* vue.config.js配置
```javascript
module.exports = {
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  assetsDir: 'test', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // publicPath: '/test', // 此处不注释掉的话，引入的资源路径会变为/test/test/，多了一个/test/。
  // indexPath: 'test/index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            minPixelValue: 2
          })
        ]
      },
      // 向所有 scss 样式传入共享的全局变量、mixins、函数等。
      sass: {
        data: `@import "@/styles/config.scss";`
      }
    }
  }
}
```
* 经测试发现```vue-cli 3.5.0```版本，以上配置打包出来的```index.html```，静态资源引入时会多一层目录，理应为```/test/```却变为了```/test/test/```。
    - 我猜是当前版本的bug，然后我对```vue-cli```进行版本升级，升级为了```3.9.1```版本之后，发现此问题依然存在。升级时还遇到了一些问题。在下面也进行了记录。
    - 所以，问题是我配置的不对，所以我把上述的配置中的```publicPath: '/test',```注释掉了，发现就没问题了。
    - 但是又引申出另外一个问题，那就是路由不对，因为process.env.BASE_URL值跟着publicPath的默认值(```/```)走。所以要手动调整路由的base为```/test```。
* 重要：路由如果加了二级路由。
    - 那么内部路由的跳转就不要直接使用```:href="`/task/article`"```去跳转。
    - 转而使用```router-link```配合```路由name```去跳转。```<router-link :to="{ name: 'TaskArticle', query: { id: 10 }}">任务文章转发</router-link>```。
    - 建议，全部都使用```router-link```配合```路由name```去跳转。
* 以上设置，尚且没有把```favicon.ico```文件和```index.html```文件放到test目录。
    - 设置index.html文件的路径```indexPath: 'test/index.html'```
    - 设置favicon.ico文件的路径。暂时无解。
* 建议：只设置一个publicPath。这才是最优解。
    - 如此，路由代码不用改，依然使用process.env.BASE_URL变量即可。outputDir和assetsDir也不需要设置，直接走默认即可。
    - 文件如果想挪到指定目录，可以使用nodejs写个脚本剪切到对应目录。如此也可以解决favicon.ico文件无法换目录的问题。
    - 例如test环境打包出来的文件全部都放到dist/test目录下，因vue-cli对外暴露的参数配不出预期的效果，所以我才想要使用nodejs写个脚本做这些事。
    - 文件剪切可以使用```待续...```模块。可以用正则的方式批量处理文件。
    - 不想剪切的话，可以直接使用```scp2```模块，把整个dist目录里的文件上传到服务器对应的目录(相当于剪切了)。
    - 案例：https://github.com/zhouhuafei/hello-world_vue-cli3_vant
* 注意：把dist中的全部文件都放到test目录之后，nginx的配置也要修改。
    - 以下
    ```
    location / {
      try_files $uri $uri/ /index.html;
    }
    ```
    - 需要改为
    ```
    location / {
      try_files $uri $uri/ /index.html;
    }
    location /test/ {
      try_files $uri $uri/ /test/index.html;
    }
    ```

# vue-cli版本升级
* 经windows测试，发现安装了vue-cli之后，如果继续安装，会报错，导致安装不上去。
* 需要先卸载 ```npm uninstall -g @vue/cli```
* 然后再安装 ```npm install -g @vue/cli```
* 然后发现，还是不行，然后我用windows自带的PowerShell下载，还是不行。
* 然后我去npm的安装包中删除@vue文件夹，然后对PowerShell进行右键，然后以管理员身份运行，再安装就行了。
* 总结：要删除老版本的文件，然后还要有足够的权限才能安装成功。
