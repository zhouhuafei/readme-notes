```
const gulp = require('gulp');
const gulpRename = require('gulp-rename'); // 重命名
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const sass = require('gulp-sass'); // scss转css
const imagemin = require('gulp-imagemin'); // 图片压缩
const through = require('through2'); // 编写gulp插件
const replace = require('gulp-replace'); // 内容替换
```
* js转义，压缩，css自动补全等，自行查找，不一一列举了。
