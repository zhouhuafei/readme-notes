# Sass是什么
* Sass(Scss)是世界上最成熟、稳定和强大的专业级CSS扩展语言 (Syntactically Awesome StyleSheets)。

# Sass和SCSS的区别
* SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点。
  - 1、文件扩展名不同，Sass 是以`.sass`后缀为扩展名，而 SCSS 是以`.scss`后缀为扩展名。
  - 2、语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

# CSS预处理器
> CSS预处理器是用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。
* Sass(Scss)就是CSS预处理器的一种。固Sass(Scss)也是编程语言。

# 文档
* https://www.sass.hk/

# 其他
* 小技巧之变量`!default`：如果变量没被赋值，则使用默认值。如果变量被赋值了，则使用被赋予的值。在默认值的前面赋值同样有效(即默认值不会生效)。
```
// 在这里赋值(默认值的上边)，值也会生效，即默认值会被替换为被赋予的新值。
$g-color-danger: #ff0000 !default; // 这里是默认值。
// 在这里赋值(默认值的下边)，则值更会生效。
```

# 占位符%
占位符选择器(Placeholder Selector)是以%而不是.作为开始符的选择器。它自身不会出现在编译后的CSS文件中, 只会出现在@extend了它的那些选择器中。

# @extend的限制
* 在指令中使用 @extend 时（比如在 @media 中）有一些限制：Sass 不可以将 @media 层外的 CSS 规则延伸给指令层内的 CSS，这样会生成大量的无用代码。也就是说，如果在 @media （或者其他 CSS 指令）中使用 @extend，必须延伸给相同指令层中的选择器。
* 下面的例子是可行的：
```
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}
```
* 但不可以这样：
```
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```
* 上述限制对占位符%同样有效。

# scss变量共享给js
* 定义_variables.scss
```
// 基础灰色
$white:     #fff !default;
$gray-100:  #f8f9fa !default;
$gray-200:  #e9ecef !default;
$gray-300:  #dee2e6 !default;
$gray-400:  #ced4da !default;
$gray-500:  #adb5bd !default;
$gray-600:  #6c757d !default;
$gray-650:  #606266 !default;
$gray-700:  #495057 !default;
$gray-800:  #343a40 !default;
$gray-900:  #212529 !default;
$black:     #000 !default;

// 基础彩色
$navy-blue:  #99a9bf !default;

// 主题色
$blue:    #2276ff !default;
$red:     #ee5959 !default;
$yellow:  #f0a22e !default;
$green:   #67c23a !default;

// 语义化
$primary:    $blue !default;
$secondary:  $gray-600 !default;
$success:    $green !default;
$info:       $gray-500 !default;
$warning:    $yellow !default;
$danger:     $red !default;
$light:      $gray-100 !default;
$muted:      $gray-400 !default;
$dark:       $gray-800 !default;

// :export 指令被 webpack 用于在 js 中共享 scss 变量
// https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
:export {
  primary:         $primary;
  success:         $success;
  info:            $info;
  warning:         $warning;
  danger:          $danger;
}
```
* 使用
```
import variables from '@/styles/_variables.scss'
```
* 每个页面的scss文件都要引入scss定义的配置太麻烦了，webpack可以帮你自动引入。
```
// 更多配置参见 https://cli.vuejs.org/config/
module.exports = {
  css: {
    loaderOptions: {
      // 向所有 scss 样式传入共享的全局变量、mixins
      sass: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_functions.scss";
        `
      }
    }
  }
}
```

# scss颜色命名
* 可以参考element-ui的命名方式。
* https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss
* https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/index.scss
