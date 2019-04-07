# 案例
* https://github.com/zhouhuafei/zhf.g-ui
* es6文件和vue单文件要转成es5文件(gulp可以实现，此处针对webpack的实现做简单的记录)。

# es6怎么转es5？
* 使用```babel-loader```包可以做到。

# 不同的环境使用不同api的url怎么做？
* 使用```webpack.DefinePlugin```插件，编译时期可以创建全局变量，打包后满足条件会转成```if(true){}```。


# vue单文件如何打包成js文件？
* 1、使用vue-loader
```vue-loader/lib/plugin```。
* 2、使用output的library参数配合output的libraryTarget参数。

# 打包的时候进行转义，注入webpack库和依赖代码怎么做(此条和vue单文件如何打包成js文件是同一个问题)？
* 转成umd模块(会分析并导入依赖代码)：
```
 output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/components_dom/[name].js',
    library: '[name]', // umd导出时的函数名
    libraryTarget: 'umd', // umd模块兼容处理
},
```

# 打包的时候只进行转义，不要注入webpack库和依赖代码怎么做？
* 暂时无解，建议使用gulp。

# 如何根据让output的filename能根据入口的路径进行变化？
* 方式1：使用```rename-output-webpack-plugin```插件包可以做到。
* 方式2：配置entry时，把路径带上，案例如下：
```
const entry = {
  'components_dom/g-confirm/index': './src/js/components_dom/g-confirm/index.js',
  'components_dom/g-message/index': './src/js/components_dom/g-message/index.js',
}
```

# webpack.DefinePlugin
* 值必须要加双重引号或使用JSON.stringify处理一下。
```
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(env)
    }
})
```

# webpack-dev-server
* ```contentBase: './dist/'```
    - 设置静态资源目录
* ```historyApiFallback: true```
    - 让vue-router支持history模式
* openPage的路径是相对于哪的？
    - 和```output```上的```publicPath```属性有关，如果配置成```/```，则沿着```output```上的```path```属性进行查找就可以访问到资源。
    - 案例1：demo目录下有views/pages/ui.html，如果是以下配置，则直接访问/views/pages/ui.html就可以访问到了。
    ```
    path: `${__dirname}/dist/demo/`, // 出口路径，必须是绝对路径
    publicPath: `/`, // 静态资源引入的路径方式
    ```
    - 案例2：demo目录下有views/pages/ui.html，如果是以下配置，则直接访问/hello/views/pages/ui.html就可以访问到了。
    ```
    path: `${__dirname}/dist/demo/`, // 出口路径，必须是绝对路径
    publicPath: `/hello/`, // 静态资源引入的路径方式
    ```
* 如果记不住的话，直接访问/webpack-dev-server，里面有指引链接。
    - 坑点：publicPath不能设置为相对路径。
    - 例如：publicPath设置成'./'或者设置成'../../'都会导致访问不了。
* 总结：
    - 正确的访问路径是：output.publicPath 拼接上 output.path之后的路径。
    - 手动输入url时，访问路径前面是要带反斜杠的，这是常识。但是使用openPage配置时，前面不要带反斜杠，否则浏览器上会出现两个反斜杠。
    - 案例：openPage: 'views/pages/ui.html'。views前面不要带反斜杠。

# scss中的import加波浪号是什么意思
* 前面加 ~ 表示你后面的值为 alias, 然后就会去 webpack alias 配置中找相应的值, 然后拼接成最后的地址
```scss
@import "~element-ui/packages/theme-chalk/src/index";
```
