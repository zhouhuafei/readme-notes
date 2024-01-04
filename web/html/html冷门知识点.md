## 内嵌iframe
* 浏览器机制：iframe路由发生变化后，点击浏览器的回退按钮，会触发iframe页面的回退，而不是父页面的回退。

## 给iframe多次设置同一个src
* 如果路由使用的是history模式，iframe每次都会重新加载。
* 如果路由使用的是hash模式，iframe只有第一次会重新加载。
  - 小知识1：url上#号之后的数据，不会被发送到服务端。
  - 小知识2：如果去掉#号，给iframe多次设置同一个src，iframe每次都会重新加载。因为去掉#号就会走history模式。

## 给iframe多次设置不同的src
* 如果路由使用的是history模式，不管src是否变化，iframe每次都会重新加载。
* 如果路由使用的是hash模式，hash值不管怎么变，iframe只有第一次会重新加载。

## 清理iframe的缓存
* 业务中，难免会遇到使用iframe或者WebView内嵌h5的场景。
* 即使你在html中，配置上下述代码。也还是会遇到被缓存的情况。
```html
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<!-- Pragma是HTTP/1.1之前版本的历史遗留字段可用来兼容Cache-Control -->
<meta http-equiv="Pragma" content="no-cache">
```
* 现给出清理html页面缓存的终极解决方案：在url上加时间戳。不仅能清除本地缓存，还能清除CDN缓存。
* history模式直接使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019`。
* hash模式在`#`号前使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019/#/canvas/1`。
* 注意：hash模式清缓存，时间戳不能加在#号之后，因#号之后的数据，不会被发送到服务端。

## 为啥使用meta标签清缓存无效
* 业务中，难免会遇到使用iframe或者WebView内嵌h5的场景。
* 静态资源没使用CDN，响应头里也没设置强缓存Cache-Control和Expires，仅仅设置了弱缓存Etag和Last-Modified。
* 代码发布后、页面还是读了本地的缓存、返回200 OK (from disk cache)。
* 即使你在html中，配置了下述代码。亦是无用。
```html
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<!-- Pragma是HTTP/1.1之前版本的历史遗留字段可用来兼容Cache-Control -->
<meta http-equiv="Pragma" content="no-cache">
```
* 因为前端的这个配置，是历史遗留的产物，现在基本已经淘汰了。
  - meta标签的解析实现不是所有浏览器都支持，至少Chrome浏览器就不支持。
* 可以在服务端，给html的响应头设置上`Cache-Control: no-cache`。来规避缓存问题。
  - 但是这个配置，只能清理本地缓存，无法清理CDN缓存。
  - 终极解决方案，只有一个，那就是在url上加时间戳。

## 字体统一或不统一都有问题
* 字体不统一、都是Chrome浏览器、日期时间选择器、数字部分、win系统350px的宽度可以展示全、mac系统390px的宽度才可以展示全。
  - font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif;
* 字体统一、Chrome浏览器、在mac上或在win上、4个汉字68px的宽度都可以展示全。在mac上的Safari浏览器里、会掉下来一个字，需要把宽度调整为70px才可以展示全。
  - 使用自定义字体`@font-face`配合`font-family`进行字体统一。
* 设计师把宽度卡的太死，没有冗余额外宽度，导致出现上述问题。
* 目前的解决方案是以mac能完全展示为基准，进行宽度调整。

## 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。
