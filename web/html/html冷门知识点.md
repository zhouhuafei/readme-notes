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
<meta http-equiv="Cache-Control" content="no-cache">
<!-- Pragma是HTTP/1.1之前版本的历史遗留字段可用来兼容Cache-Control -->
<meta http-equiv="Pragma" content="no-cache">
```
* 现给出清理html页面缓存的终极解决方案：在url上加时间戳。不仅能清除本地缓存，还能规避CDN缓存。
* history模式直接使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019`。
* hash模式在`#`号前使用`?`号拼接时间戳即可：`http://127.0.0.1:5173/?t=1704249051019/#/canvas/1`。
* 注意：hash模式清缓存，时间戳不能加在#号之后，因#号之后的数据，不会被发送到服务端。

## 弱缓存变强缓存的原因
* 业务中，难免会遇到使用iframe或者WebView内嵌h5的场景。
* 静态资源没使用CDN，响应头里也没设置强缓存Cache-Control和Expires，仅仅设置了弱缓存Etag和Last-Modified。
* 代码发布后、页面还是读了本地的缓存、返回`200 OK (from disk cache)`或`200 OK (from memory cache)`。
* 即使你在html中，配置了下述代码。亦是无用。
```html
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<!-- Pragma是HTTP/1.1之前版本的历史遗留字段可用来兼容Cache-Control -->
<meta http-equiv="Pragma" content="no-cache">
```
* 因meta标签设置缓存的解析实现不是所有浏览器都支持，至少Chrome浏览器就不支持。
  - 上述使用meta标签管理缓存，是历史遗留的产物，现在基本已经淘汰了。
#### 仅仅设置了弱缓存Etag和Last-Modified，为啥生效了强缓存，导致返回了`200 OK (from disk cache)`或`200 OK (from memory cache)`。
* 答：Chrome浏览器特性如此，有弱缓存时会默认生效强缓存。即有弱缓存时，则强缓存`Cache-Control`自动生效，其默认值是`private`。
* 有弱缓存时，如果你要启用`304 Not Modified`，即304缓存，你应该在响应头里把`Cache-Control`设置为`no-cache`。
* 有弱缓存时，如果你要启用`200 OK`，即完全不缓存，你应该在响应头里把`Cache-Control`设置为`no-store`。
* 无弱缓存亦无强缓存时，次次返回`200 OK`。
* 无弱缓存时，把强缓存`Cache-Control`设置为`private`或`no-cache`或`no-store`或`max-age=0`，亦是次次返回`200 OK`。
  - 注：有弱缓存时，强缓存`Cache-Control`的默认值`private`会自动生效，但其有效期机制存在不确定性，有时半小时内失效，有时迟迟不失效。建议手动设置为`no-cache`。
  - 有效期的不确定性，会导致一个问题，那就是我明明已经发布了最新代码到服务器，但是本地缓存却迟迟不失效。导致我页面访问的一直是老页面。
  - 触发浏览器的普通刷新行为，可以去除首条请求的强缓存，但是无法去除iframe中页面的强缓存（除非强刷，但也分场景，请参考下面的强刷问答）。
#### 强缓存什么时候会失效？
* 1、过了有效期会自动失效。
* 2、触发浏览器的刷新行为，例如点击浏览器的刷新按钮或通过js进行页面刷新，可以去除掉首条请求的强缓存。
* 3、非首次在tab的地址栏里回车，可以去除掉首条请求的强缓存。
* 4、给url加时间戳，可以去除掉对应url的强缓存。
* 5、浏览器强制刷新，可以去除掉父页面里全部静态资源的强缓存。若iframe子页面是通过html直接渲染，则子页面里全部静态资源的强缓存也会被去除。
#### 强刷能去除掉iframe的强缓存吗
* 答：若iframe是通过js进行渲染的，同步渲染时强刷能去除掉非html页面的强缓存。异步渲染时强刷所有静态资源强缓存依旧存在。
* 答：若iframe是通过html直接渲染的，强刷有用，可以去除掉所有静态资源的强缓存。即使有用，让用户去强刷页面也是不合理的行为。
#### 如何有效的清理上述缓存
* 方案1：可以在服务端，去掉html响应头上的`Etag和Last-Modified`。使之次次返回`200 OK`。需要等待上次缓存失效。
* 方案2：可以在服务端，给html的响应头设置上`Cache-Control: no-cache`。使之触发`304 Not Modified`。需要等待上次缓存失效。
* 方案3：可以在服务端，给html的响应头设置上`Cache-Control: no-store`。使之次次返回`200 OK`。需要等待上次缓存失效。
* 方案4：可以给url加时间戳，使之次次返回`200 OK`。在页面的入口处加上时间戳进行缓存清理是最优解。不仅能直接绕开本地缓存，还能规避CDN缓存。

## 字体不统一的问题
* 字体不统一，会导致win系统和mac系统的汉字宽度不统一。
* 字体不统一，会导致win系统和mac系统的数字宽度不统一。
* 字体不统一，会导致win系统和mac系统的字母宽度不统一。
#### 以下述字体不统一的代码为例
```html
<style>
  body {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
</style>
<div style="font-size: 14px;line-height: 1;">
  <span style="display: inline-block;">调整单号</span>
  <div></div>
  <span style="display: inline-block;">2024-01-03 15:02:19</span>
</div>
```
#### 不统一字体：让字体根据`font-family`自行适配。
* win系统，Chrome浏览器。汉字宽度：`56px`。数字宽度：`130px`。
* mac系统，Chrome浏览器。汉字宽度：`56px`。数字宽度：`131.55px`。
* mac系统，Safari浏览器。汉字宽度：`57px`。数字宽度：`132px`。
* 遇到问题：我是以win系统为基准进行开发，设计师要求精准定宽，所以上述的不精准行为，导致我工作时，遇到了两个问题。
  - 1、给`el-date-picker`精准定宽后，在mac上，其内数字展示不全。
  - 2、给`el-form`精准定了四个汉字的`label-width`后，在Safari浏览器上，最后一个汉字掉了下来。
* 解决问题：临时的解决方案是改为以mac系统为基准进行开发。终极解决方案是统一win系统和mac系统的字体。
#### 统一字体：使用阿里巴巴普惠体`AlibabaPuHuiTi-3-55-Regular.ttf`进行字体统一。发现误差可以缩小到小数点之后。此字体文件大小为8.5MB，可以使用CDN来减少字体切换时带来的闪烁问题。
* win系统，Chrome浏览器。汉字宽度：`55.11px`。数字宽度：`138.11px`。另外一组数据：前者`68.89px`后者`226.66px`。
* mac系统，Chrome浏览器。汉字宽度：`55.11px`。数字宽度：`138.1px`。另外一组数据：前者`68.88px`后者`226.65px`。
* mac系统，Safari浏览器。汉字宽度：`55px`。数字宽度：`138px`。另外一组数据：前者`69px`后者`227px`。
* 总结经验：统一字体后，比对多组测试数据，发现Chrome浏览器在两个系统上的误差可以忽略，Safari浏览器会对小数进行四舍五入。
* 最佳实战：统一字体后，进行精准定宽时，如果测量出来的宽度是小数则进行向上取整。如此，各端皆可正常展示。

## 手机端自适应
* 常用配置：`<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">`。
* 建议配置：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`。
  - 你应该避免使用minimum-scale、maximum-scale，尤其是将user-scalable设为no。
  - 用户应该有权力尽可能大或小地进行缩放，阻止这种做法会引起访问性问题。

## 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。

## https网站访问http资源
* https网站访问http资源时，浏览器会自动把引入的http资源升级为https资源进行访问。
* 所以，如果你的http资源配置了ssl证书的话，那么即使在https网站中访问http资源，也可以正常访问。
* 补充说明：被引入的img、audio、video会自动升级，被引入的iframe、script、css不会自动升级。
  - 踩坑1：如果img标签上有srcset属性，需要拿掉才可以自动升级。

## 随机图片 - 静态图
* https://picsum.photos/200/300?timeStamp

## 在页面上渲染textarea的内容时如何保留换行？
> textarea渲染换行
```
<pre v-html="thisFields.text"></pre>
<div v-html="thisFields.text.replace(/\n/g, '<br>')"></div>
```

## textarea的内容有几行？
* h5高度是不固定的。所以可以先弄一个初始高度的div定位到看不到的地方当做标准高度。
* 然后拿textarea的scrollHeight除以标准高度就可以计算出textarea的内容有几行。
```javascript
watch(() => thisFields.text, async () => {
  await nextTick()
  const helperTextareaInitHeight = helperTextareaInitHeightRef.value
  const helperTextareaEl = helperTextareaRef.value
  if (!helperTextareaInitHeight || !helperTextareaEl) return
  let num = 1
  const initHeight = helperTextareaInitHeight.offsetHeight
  helperTextareaEl.style.height = `${num * initHeight}px`
  const scrollHeight = helperTextareaEl.scrollHeight
  num = Math.ceil(scrollHeight / initHeight)
  // const match = thisFields.text.match(/\n/ig) // 使用match匹配/\n/ig，无法覆盖textarea文本过长自动换行的场景。
  // if (match) num = match.length
  if (num >= 6) num = 6
  helperTextareaEl.style.height = `${num * initHeight}px`
})
```

## 实现textarea的Enter不换行
* 阻止默认行为即可

## 实现textarea的Ctrl+Enter换行
```html
<textarea id="myTextarea" style="width:300px; height:200px;"></textarea>
<script>
const textarea = document.getElementById('myTextarea')

textarea.addEventListener('keydown', function (event) {
  // 检查是否同时按下了Ctrl键和Enter键
  if (event.ctrlKey && (event.key === 'Enter' || event.keyCode === 13)) {
    // 阻止默认行为
    event.preventDefault()

    // 获取当前的光标位置
    const cursorPos = textarea.selectionStart
    const text = textarea.value

    // 插入换行符 并 更新textarea的内容
    textarea.value = text.substring(0, cursorPos) + '\n' + text.substring(cursorPos)

    // 移动光标到新位置（光标位置 + 1，因为插入了一个字符）
    textarea.selectionStart = textarea.selectionEnd = cursorPos + 1
  }
})
</script>
```
