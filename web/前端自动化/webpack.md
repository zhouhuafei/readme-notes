# npm正确的发包姿势
* es6文件和vue单文件要转成es5文件(gulp可以实现，此处针对webpack的实现做简单的记录)。
    - vue转js：```vue-loader/lib/plugin```。
    - es6转es5：```babel-loader```。
    - 转模块：```output.libraryTarget: 'umd'```。// umd commonjs2
    - 编译时期创建全局变量：```webpack.DefinePlugin```。
    - 参考 https://github.com/zhouhuafei/zhf.g-ui 包中的webpack配置即可。
