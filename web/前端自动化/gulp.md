```
const gulp = require('gulp'); // gulp
const del = require('del'); // 删除文件和文件夹
const rename = require('gulp-rename'); // 重命名
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const sass = require('gulp-sass'); // scss转css
const autoprefixer = require('gulp-autoprefixer'); // css自动补全
const cssmin = require('gulp-cssmin'); // css压缩
const browserify = require('gulp-browserify'); // js模块化
const babel = require('gulp-babel'); // es6转es5
const uglify = require('gulp-uglify'); // js压缩
const imagemin = require('gulp-imagemin'); // 图片压缩
const htmlmin = require('gulp-htmlmin'); // html压缩
const through = require('through2'); // 编写gulp插件
const replace = require('gulp-batch-replace'); // 内容替换(这个没问题，上个包出的问题，这个包没出类似的问题)
const runSequence = require('run-sequence'); // 同步(要保证task中return了一个Promise，否则无效)
const rev = require('gulp-rev'); // 生成md5文件以及生成md的映射文件
const revCollector = require('gulp-rev-collector'); // 替换html中引入的文件名(css，js，images)。替换css中引入的文件名(images)。也就是说此包可以用来替换被引入文件的路径以及文件名。
const sourcemaps = require('gulp-sourcemaps'); // 生成sourcemap
const concat = require('gulp-concat'); // 文件合并
```

# 实践
* https://github.com/zhouhuafei/luck-draw_scroll

# 微信小程序转百度小程序
* 我给 https://github.com/zhouhuafei/hello-world_mp-baidu 项目配置了一份微信小程序转百度小程序的配置。
    - 能同时开发微信小程序和百度小程序。后续是否兼容其他小程序（支付宝小程序，今日头条小程序等）这个就需要看业务了。
    - 具体配置详情，还请到仓库中自行查看。
