# 微信小程序语法高亮
* 配置路径：File -> Settings -> Editor -> File Types
* wxml走xml的模板
* wxss走scss的模板

# 微信小程序语法提示
* https://github.com/miaozhang9/wecharCodejar
* 希望后续WebStorm官方可以提供微信小程序的语法支持。
* 如果开发微信小程序的话，```HBuilderX编辑器```的语法提示做的就非常完善。
* 微信开发者工具的提示最是完善，毕竟是本家的工具。

# eslint
* 如果没开启es6，使用const定义变量时，eslint检测工具会报错：```Const definitions are not supported by current JavaScript version```

# 快捷键
* ```Alt+J```可以选中多个相同的字符串，和sublime的Ctrl+D的作用一样。

# 卡顿
* 找到WebStorm.exe.vmoptions这个文件
* 第二行和第三行更改为：
    ```
    -Xms128m
    -Xmx2048m
    ```
* 重启
