# 文档
* https://www.sass.hk/

# 其他
* 小技巧之变量```!default```
    - 如果$g-color-danger变量的上面定义的有$g-color-danger，则使用$g-color-danger的值，如果没有则使用#ff0000作为默认值。
    ```
    $g-color-danger: #ff0000 !default;
    ```

# 占位符%
占位符选择器(Placeholder Selector)是以%而不是.作为开始符的选择器。它自身不会出现在编译后的CSS文件中, 只会出现在@extend了它的那些选择器中。

# @extend的限制
@extend有个限制, 就是你不能@extend不同@media块中的样式。这个限制同样对%选择器有效。
```
%icon {
  transition: background-color ease .2s;
  margin: 0 .5em;
}

@media screen {
  .error-icon {
    @extend %icon;
  }

  .info-icon {
    @extend %icon;
  }
}
```
这会导致编译错误:
```
You may not @extend an outer selector from within @media.
You may only @extend selectors within the same directive.
From "@extend %icon" on line 8 of icons.scss
```
这是由于@extend的实现方式其实是用调用@extend的类替换被@extend的类, 上例中即用.error-icon, .info-icon替换%icon。但是由于这些调用@extend的类属于@media块, 这样直接替换会导致替换后的规则脱离@media块, 因此是非法的。

但是, 反过来就没事儿。因为%icon属性原本就是在@media内部生效的, .error-icon, .info-icon继承来的这部分规则自然也只应该在该@media下生效。
```
@media screen {
  %icon {
    transition: background-color ease .2s;
    margin: 0 .5em;
  }
}

.error-icon {
  @extend %icon;
  background-color: red;
}

.info-icon {
  @extend %icon;
  background-color: green;
}
```
会被编译成
```
@media screen {
  .error-icon, .info-icon {
    transition: background-color ease .2s;
    margin: 0 .5em;
  }
}

.error-icon {
  background-color: red;
}

.info-icon {
  background-color: green;
}
```

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
