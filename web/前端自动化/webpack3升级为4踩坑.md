# 配置案例以及说明
* 配置案例地址：https://github.com/zhouhuafei/zhf.g-ui/blob/master/webpack.config.js

# 踩坑 - 提取css之extract-text-webpack-plugin报错
* 报错信息：
```
(node:5216) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:5216) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
```
* 解决方案：
```
npm install --save-dev extract-text-webpack-plugin@next
```

# 踩坑 - 提取css之contenthash报错
* 报错信息：
```
Path variable [contenthash] not implemented in this context
```
* 解决方案：extract-text-webpack-plugin 换成 mini-css-extract-plugin 来提取css文件。

# 踩坑 - 提取公共模块之webpack.optimize.CommonsChunkPlugin报错
* 报错信息：
```
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
```
* 解决方案：使用optimization.splitChunks属性进行配置。
* optimization参数介绍：https://webpack.js.org/plugins/split-chunks-plugin/
* 多入口提取公共js和css时和webpack3不同，需要配置optimization的splitChunks属性，多入口提取公共模块，配置如下：
```
optimization: {
    splitChunks: {
        chunks: 'all', // 表示显示块的范围。有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)。默认值：async。
        cacheGroups: {
            // 如果引入(require/import)了node_modules里都包，则提取为this-is-global-file-vendor(.css/.js)
            vendor: {
                test: /node_modules/, // 匹配符合规则的块。
                name: 'this-is-global-file-vendor', // 提取成此文件
                priority: 10, // 优先级10
                enforce: true, // 强制拆出块，否则不达到一定容量，拆不出来。应该是如果拆出的块，达不到minSize(默认30kb)值，则不会进行拆出。
            },
            // 如果引入(require/import)了common模块，则提取为this-is-global-file-common(.css/.js)
            commons: {
                test: /common/, // 匹配符合规则的块。
                name: 'this-is-global-file-common', // 提取成此文件
                priority: 9, // 优先级10
                enforce: true, // 强制拆出块，否则不达到一定容量，拆不出来。应该是如果拆出的块，达不到minSize(默认30kb)值，则不会进行拆出。
            },
        },
    },
},
```
* 提取css: 使用mini-css-extract-plugin模块。

# 修改css结果js的hash值也跟着变化了
* 解决方案：把webpack3时，js使用的```[chunkhash]```换成```[contenthash]```。
* webpack3时：css使用```[contenthash]```，js使用```[chunkhash]```。
* webpack4时：css使用```[contenthash]```，js使用```[contenthash]```。
