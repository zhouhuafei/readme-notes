# 文档
* https://tencent.github.io/wepy/document.html#/

# less换成sass
```
// 安装sass
npm i --save-dev node-sass

// 安装wepy-compiler-sass插件
npm i --save-dev wepy-compiler-sass

//配置wepy.config.js
module.exports = {
    compilers: {
      compilers: {
        /*
        less: {
          compress: prod,
        },
        */
        sass: {
          outputStyle: 'compressed',
        },
    },
};
```

* redux增加了开发负担，脚手架安装时，我选择了不安装。使用全局变量(globalData)绑在app上即可。

# 缺点：
* 我不喜欢wepy的语法。
