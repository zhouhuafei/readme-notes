const gulp = require('gulp');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-batch-replace'); // 内容替换
const envName = process.env.NODE_ENV; // 当前环境
const isProduction = envName === 'production'; // 是否是生产环境

function fn(name) {
    gulp.task(`dev-diff-${name}`, function () { // 此项和业务有关。不同平台的小程序，用不同的富文本解析模板template。
        gulp.src(`diff/**/*.wxml`)
            .pipe(plumber())
            .pipe(rename((path) => {
                path.extname = name === 'baidu' ? '.swan' : '.wxml'; // 百度的后缀和微信的后缀不同。
            }))
            .pipe(gulp.dest(`dist/`));
        // 微信小程序使用ext.json，因支持第三方
        gulp.src(`diff/**/ext.json`)
            .pipe(plumber())
            .pipe(replace([
                [isProduction ? 'domainPathBuild' : 'domainPathDev', 'domainPath'], // 生产环境和开发环境使用的domainPath不同
                [isProduction ? 'h5DomainBuild' : 'h5DomainDev', 'h5Domain'], // 生产环境和开发环境使用的h5Domain不同
                [isProduction ? 'envBuild' : 'envDev', 'env'], // 生产环境和开发环境使用
            ]))
            .pipe(gulp.dest(`dist/`));
        // 百度小程序使用ext.js，因目前不支持第三方
        gulp.src(`diff/**/ext.js`)
            .pipe(plumber())
            .pipe(replace([
                [isProduction ? 'domainPathBuild' : 'domainPathDev', 'domainPath'], // 生产环境和开发环境使用的domainPath不同
                [isProduction ? 'h5DomainBuild' : 'h5DomainDev', 'h5Domain'], // 生产环境和开发环境使用的h5Domain不同
                [isProduction ? 'envBuild' : 'envDev', 'env'], // 生产环境和开发环境使用
            ]))
            .pipe(gulp.dest(`dist/`));
    });

    gulp.task(`dev-json-${name}`, function () {
        gulp.src('src/**/*.json')
            .pipe(plumber())
            // 这里先隐掉，后续百度平台支持第三方平台的时候可以放出来，不过后续出的今日头条小程序是否支持就另说了。如果后续这里放出来，diff里的ext.js和ext.json就可以删掉，然后放这里统一处理就行了。
            // .pipe(replace([
            //     ['"mp_platform": "weixin",', name === 'baidu' ? '"mp_platform": "baidu",' : '"mp_platform": "weixin",'], // ext.json中微信的某个字段换成百度的字段。
            //     ['"api_type": "weixin",', name === 'baidu' ? '"api_type": "baidu",' : '"api_type": "weixin",'], // ext.json中微信的某个字段换成百度的字段。
            //     [isProduction ? "domainPathBuild" : "domainPathDev", "domainPath"], // 生产环境和开发环境使用的domainPath不同
            //     [isProduction ? "h5DomainBuild" : "h5DomainDev", "h5Domain"], // 生产环境和开发环境使用的h5Domain不同
            //     [isProduction ? "envBuild" : "envDev", "env"], // 生产环境和开发环境使用
            // ]))
            .pipe(gulp.dest(`dist/${name}/`));
    });

    gulp.task(`dev-wxml-${name}`, function () {
        gulp.src('src/**/*.wxml')
            .pipe(plumber())
            .pipe(replace([
                ['wx:', name === 'baidu' ? 's-' : 'wx:'], // 微信小程序的模板语法换成百度小程序的模板语法。
                ['.wxml', name === 'baidu' ? '.swan' : '.wxml'], // 此项是针对富文本解析进行的替换。
                ['{{wxParseData:content.nodes}}', name === 'baidu' ? '{{ {wxParseData:content.nodes} }}' : '{{wxParseData:content.nodes}}'], // 此项是针对富文本解析进行的替换。
            ]))
            .pipe(rename((path) => {
                path.extname = name === 'baidu' ? '.swan' : '.wxml'; // 百度的后缀和微信的后缀不同。
            }))
            .pipe(gulp.dest(`dist/${name}/`));
    });

    gulp.task(`dev-css-${name}`, function () {
        gulp.src(['src/**/*.scss', '!src/scss/**/*.*', '!src/scss-components/**/*.*', '!src/templates/wxParse/**/*.*'])
            .pipe(plumber())
            .pipe(replace([
                ['scss/iconfont"', name === 'baidu' ? 'fonts/iconfont.css"' : 'scss/iconfont"'], // 百度小程序不能使用在线图标。
            ]))
            .pipe(sass())
            .pipe(rename((path) => {
                path.extname = name === 'baidu' ? '.css' : '.wxss'; // 百度的后缀和微信的后缀不同。
            }))
            .pipe(gulp.dest(`dist/${name}/`));
    });

    gulp.task(`dev-js-${name}`, function () {
        gulp.src('src/**/*.js')
            .pipe(plumber())
            .pipe(replace([
                ['wx.', name === 'baidu' ? 'swan.' : 'wx.'], // 微信小程序的api换成百度小程序的api。
                [`// ${name}-valid `, ''], // 不同平台的小程序(百度小程序和微信小程序)，从注释里解放不同的js。
                [`// ${envName}-valid `, ''], // 不同环境的小程序(生产环境和开发环境)，从注释里解放不同的js。
            ]))
            .pipe(gulp.dest(`dist/${name}/`));
    });

    gulp.task(`dev-img-${name}`, function () {
        gulp.src('src/images/**/*.*')
            .pipe(plumber())
            .pipe(imagemin())
            .pipe(gulp.dest(`dist/${name}/images/`));
    });

    gulp.task(`dev-fonts-${name}`, function () {
        gulp.src('src/fonts/**/*.*')
            .pipe(plumber())
            .pipe(imagemin())
            .pipe(gulp.dest(`dist/${name}/fonts/`));
    });

    gulp.task(`watch-${name}`, () => {
        gulp.watch('diff/**/*.*', [`dev-diff-${name}`]);
        gulp.watch('src/**/*.json', [`dev-json-${name}`]);
        gulp.watch('src/**/*.wxml', [`dev-wxml-${name}`]);
        gulp.watch('src/**/*.scss', [`dev-css-${name}`]);
        gulp.watch('src/**/*.js', [`dev-js-${name}`]);
        gulp.watch('src/images/**/*.*', [`dev-img-${name}`]);
        gulp.watch('src/fonts/**/*.*', [`dev-fonts-${name}`]);
    });

    gulp.task(`${name}Dev`, function () {
        gulp.start(`dev-diff-${name}`, `dev-json-${name}`, `dev-wxml-${name}`, `dev-css-${name}`, `dev-js-${name}`, `dev-img-${name}`, `dev-fonts-${name}`, `watch-${name}`);
    });

    gulp.task(`${name}Build`, function () {
        gulp.start(`dev-diff-${name}`, `dev-json-${name}`, `dev-wxml-${name}`, `dev-css-${name}`, `dev-js-${name}`, `dev-img-${name}`, `dev-fonts-${name}`);
    });
}

fn('weixin');
fn('baidu');
