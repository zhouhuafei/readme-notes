# 报错
* 在suibianxiexie项目中，我如果注释掉webpack配置中的```// exclude: /(node_modules|bower_components)/,```，引入某些包时会报错。
    - 如果注释掉webpack的loader中exclude的过滤功能，某些包使用的时候就会报错。各种奇葩的报错。
    - 例如使用```vue-draggable-resizable```包时就报错了。原因就是因为注释掉了exclude，导致es6转es5时对node_modules中的包进行了二次babel导致的。
    - 主要原因是es6转es5或者vue单文件转js导致的，所以该过滤还是要过滤的。
    - 最佳实践方案：npm上发布的包，es6和vue文件要转成es5文件。个人项目中的css-loader不使用exclude过滤(如此可以使用scss)。

# npm正确的发包姿势
* es6文件和vue单文件要转成es5文件
    - 待续...
