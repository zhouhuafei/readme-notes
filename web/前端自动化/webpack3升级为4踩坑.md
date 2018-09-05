# 配置案例以及说明
* 配置案例地址：https://github.com/zhouhuafei/zhf.g-ui
* 配置案例代码以及注释：
```
```

# 踩坑 - extract-text-webpack-plugin报错
* 报错信息：
```
(node:5216) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:5216) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
```
* 解决方案：
```
npm install --save-dev extract-text-webpack-plugin@next
```
* 建议使用：mini-css-extract-plugin模块

# 踩坑 - webpack.optimize.CommonsChunkPlugin报错
* 报错信息：
```
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
```
* 解决方案：
```
optimization: {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
},
```
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

# 踩坑 - contenthash报错
* 报错信息：
```
Path variable [contenthash] not implemented in this context
```
* 解决方案：extract-text-webpack-plugin 换成 mini-css-extract-plugin 来提取css文件。
