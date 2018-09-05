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
* optimization参数介绍：
```
optimization: {
    splitChunks: {
        chunks: 'initial', // 必须三选一： "initial" | "all"(默认就是all) | "async"
        minSize: 0, // 最小尺寸，默认0
        minChunks: 1, // 最小 chunk ，默认1
        maxAsyncRequests: 1, // 最大异步请求数， 默认1
        maxInitialRequests: 1, // 最大初始化请求书，默认1
        name: () => {}, // 名称，此选项课接收 function
        cacheGroups: { // 这里开始设置缓存的 chunks
            priority: '0', // 缓存组优先级 false | object |
            vendor: { // key 为entry中定义的 入口名称
                chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
                name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                minSize: 0,
                minChunks: 1,
                enforce: true,
                maxAsyncRequests: 1, // 最大异步请求数， 默认1
                maxInitialRequests: 1, // 最大初始化请求书，默认1
                reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
            },
        },
    },
},
```
* 多入口提取公共js和css时和webpack3不同
```
splitChunks: {
    chunks: 'initial', // 只对入口文件处理
    cacheGroups: {
        // 如果引入(require/import)了node_modules里都包，则提取为this-is-global-file-vendor(.css/.js)
        vendor: {
            test: /node_modules/,
            name: 'this-is-global-file-vendor',
            priority: 10,
            enforce: true,
        },
        // 如果引入(require/import)了commons/common，则提取为this-is-global-file-common(.css/.js)
        commons: {
            test: /commons\/common/,
            name: 'this-is-global-file-common',
            priority: 9,
            enforce: true,
        },
    },
},
```
* 提取css: 使用mini-css-extract-plugin模块。
