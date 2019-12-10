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
* https://github.com/zhouhuafei/luck-draw_scroll/blob/master/gulpfile.js

# 微信小程序转百度小程序
* 我给 https://github.com/zhouhuafei/hello-world_mp-baidu 项目配置了一份微信小程序转百度小程序的配置。
    - 能同时开发微信小程序和百度小程序。后续是否兼容其他小程序（支付宝小程序，今日头条小程序等）这个就需要看业务了。
    - 具体配置详情，还请到仓库中自行查看。

# gulp-rev和gulp-rev-collector踩坑
* gulp-rev可以对静态文件加md5以及生成rev-manifest.json映射文件。
* 然后配置gulp-rev-collector的replaceReved属性可以替换md5文件名。dirReplacements替换路径。如下：
```
.pipe(revCollector({
    replaceReved: true,
    dirReplacements: dirReplacementsBuild,
}))
```
* 但是我开发的时候不需要md5。于是我对gulp-rev进行了修改。给rev方法增加了一个默认为true的参数用来控制是否生成带md5的文件。
* 当设置为false时，生成的rev-manifest.json映射文件中仅仅只是一份无意义的rev-manifest.json映射文件。
* 这个无意义的文件是留给gulp-rev-collector使用的。因为gulp-rev-collector包必须要有rev-manifest.json映射文件才能正常运行。如下：
```
.pipe(rev(false))
.pipe(gulp.dest(`${outputPath}/images/`))
.pipe(rev.manifest())
.pipe(gulp.dest(`${outputPathTemporary}/images/`));
```
* rev(false)之后，如果revCollector方法的replaceReved设置为true的话。会导致路径被替换两次。导致路径重叠404。
* 查看并跟踪源码发现replaceReved设置为false就一切正常了。如下：
```
.pipe(revCollector({
    replaceReved: false,
    dirReplacements: dirReplacementsBuild,
}))
```
* 以上就可以做到开发的时候不生成md5又可以替换路径了。
* 后续：开发的时候其实使用gulp-batch-replace包直接替换路径即可。没必要像上面那样麻烦。
* 具体案例请参考实战的链接：https://github.com/zhouhuafei/luck-draw_scroll

# 怎么根据不同的环境定义api不同的url
* 生产环境和开发环境api的url不一样。
* 如果使用webpack可以配合插件webpack.DefinePlugin去定义一些变量到业务逻辑中。
* gulp我没找类似的插件。只能提供一个思路。
    - 有几份预定义的配置文件，案例：config-development.js，config-production.js。
    - 当打包dev时，把config-development.js重命名为config.js然后留给业务代码使用即可。
    - 当打包build时，把config-production.js重命名为config.js然后留给业务代码使用即可。

# 报错
* ```gulp.hasTask is not a function```
* 原因：版本不匹配。```全局```安装的是```3.9.1```。```局部```安装的是```4.0.0```。导致出了这个问题
* del报错
    - ```Cannot delete files/folders outside the current working directory. Can be overriden with the `force` option.```
    - 原因：del默认不能删除配置目录外部的文件。
    - 解决方案：```del([`${__dirname}/../dist/${name}/static/decoration`], {force: true})```

# gulp.series 和 gulp.parallel
> gulp 4
* gulp.series 用于串行(顺序)执行
* gulp.parallel 用于并行执行
```
gulp.task('build', gulp.series('clean-dist', 'create-wxss', 'min-img', 'min-js', 'dev-json', 'dev-wxml', 'dev-wxs', 'dev-wxss'))
```
