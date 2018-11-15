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
* 待续...

# 如何根据让output的filename能根据入口的路径进行变化？
* 使用```rename-output-webpack-plugin```插件包可以做到。
