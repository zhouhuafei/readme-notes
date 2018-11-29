```
const gulp = require('gulp');
const rename = require('gulp-rename'); // 重命名
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const sass = require('gulp-sass'); // scss转css
const imagemin = require('gulp-imagemin'); // 图片压缩
const through = require('through2'); // 编写gulp插件
// const replace = require('gulp-replace'); // 内容替换(这个替换的不完整，会漏掉某些文件。我使用此包时，有些文件并没有被转换成功)
const replace = require('gulp-batch-replace'); // 内容替换(这个没问题，上个包出的问题，这个包没出类似的问题)
```
* js转义，压缩，css自动补全等，自行查找，不一一列举了。

# 微信小程序转百度小程序
* 我给 https://github.com/zhouhuafei/hello-world_mp-baidu 项目配置了一份微信小程序转百度小程序的配置。
    - 能同时开发微信小程序和百度小程序。后续是否兼容其他小程序（支付宝小程序，今日头条小程序等）这个就需要看业务了。
    - 具体配置详情，还请到仓库中自行查看。
