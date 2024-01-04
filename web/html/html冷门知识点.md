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
<meta http-equiv="Pragma" content="no-cache">
<!--即使Cache-Control设置为no-store也还是会遇到被缓存的情况-->
<meta http-equiv="Cache-Control" content="no-cache">
```
* 现给出清理html页面缓存的终极解决方案：在url上加时间戳。不仅能清除本地缓存，还能清除CDN缓存。
* history模式直接使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019`。
* hash模式在`#`号前使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019/#/canvas/1`。
* 注意：hash模式清缓存，时间戳不能加在#号之后，因#号之后的数据，不会被发送到服务端。

## iframe被缓存了
* 业务中，难免会遇到使用iframe或者WebView内嵌h5的场景。
* 即使你在html中，配置上下述代码。也还是会遇到被缓存的情况。
* 没使用CDN、没设置强缓存Cache-Control和Expires、设置了弱缓存...补充
* 明明设置了meta、为啥没效？...TODO
```
<meta http-equiv="Etag" content="0">
<meta http-equiv="Last-Modified" content="0">
<meta http-equiv="Expires" content="0">
<!--即使Cache-Control设置为no-store也还是无用-->
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
```
* 代码发布后、页面还是读了本地的缓存、返回200 OK (from disk cache)

## 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。
