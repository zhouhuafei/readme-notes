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
