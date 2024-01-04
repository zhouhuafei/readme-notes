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
* 现给出清理html页面缓存的终极解决方案：在url上加时间戳。不仅能清除本地缓存，还能规避CDN缓存。
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
* 因meta标签设置缓存的解析实现不是所有浏览器都支持，至少Chrome浏览器就不支持。
  - 上述使用meta标签管理缓存，是历史遗留的产物，现在基本已经淘汰了。
#### 仅仅设置了弱缓存Etag和Last-Modified，为啥生效了强缓存，导致返回200 OK (from disk cache)。
* Chrome浏览器特性如此，有弱缓存时会默认生效强缓存。
* 若不想要这个特性，可以在服务端，给html的响应头设置上`Cache-Control: no-cache`。
#### 如何有效的清理缓存
* 可以在服务端，给html的响应头设置上`Cache-Control: no-cache`。来规避缓存问题。
  - 但是这个配置只能清理客户端的本地缓存，无法清理服务端的CDN缓存。如果客户端的页面已经被缓存住了，需要等缓存失效之后，这个配置才会生效。
  - 在页面的入口处加上时间戳进行缓存清理是最优解。不仅能清除本地缓存，还能规避CDN缓存。

## 字体统一或不统一都有问题
* 同样是四个汉字，宽度却不一致。因win系统和mac系统的字体不一致。
* 字体设置：`font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif;`。
* 数字展示：拿`Element Plus的日期时间选择器`举例。
  - win系统，Chrome浏览器，时间框宽度调整到354px才出现裁切现象。
  - mac系统，Chrome浏览器和Safari浏览器，时间框宽度调整到357px就出现了裁切现象。
* 汉字展示：拿`调整单号`这四个字举例，把文字大小设置为14px。
  - win系统，Chrome浏览器，这四个字的总宽度是56px。
  - mac系统，Chrome浏览器，这四个字的总宽度是56px。Safari浏览器，这四个字的总宽度是57px。
* 使用自定义字体`@font-face`配合`font-family`进行字体统一后。上述问题依然存在。...TODO
* 字体不统一、都是Chrome浏览器、日期时间选择器、数字部分、win系统350px的宽度可以展示全、mac系统390px的宽度才可以展示全。
  - font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif;
* 字体统一、Chrome浏览器、在mac上或在win上、4个汉字68px的宽度都可以展示全。在mac上的Safari浏览器里、会掉下来一个字，需要把宽度调整为70px才可以展示全。
  - 使用自定义字体`@font-face`配合`font-family`进行字体统一。
* 设计师把宽度卡的太死，没有冗余额外宽度，导致出现上述问题。
* 目前的解决方案是以mac能完全展示为基准，进行宽度调整。

## 手机端自适应
* 常用配置：`<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">`。
* 建议配置：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`。
  - 你应该避免使用minimum-scale、maximum-scale，尤其是将user-scalable设为no。
  - 用户应该有权力尽可能大或小地进行缩放，阻止这种做法会引起访问性问题。

## 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。
