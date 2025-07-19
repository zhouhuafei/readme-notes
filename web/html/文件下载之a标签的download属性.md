* 文件下载之a标签的download属性
* download属性规定被下载的超链接目标。
    - 该属性也可以设置一个值来规定下载文件的名称。所允许的值没有限制，浏览器将自动检测正确的文件扩展名并添加到文件。
* 在a标签中必须设置href属性。
```
<a href="http://sbxx.top/static-no-cache/test/zero/img.jpg" download="rename">
```
* 注意事项：
  - href的指向需要同源，跨域下载不下来。或源文件允许跨域才可以下载下来。在ios设备上，可能会忽略download属性，使文件下载变成了文件预览，此时需要给文件加响应头`'Content-Disposition': 'attachment; filename=' + fileName`。加响应头是终极解决方案且是兼容性最好的解决方案。
  - download属性需要是同源文件才会生效。若非同源，即使源文件允许跨域，download属性也不会生效。
  - 可以用canvas对图片进行绘制，绘制完毕转成base64或者blob:url。再赋值给a标签就可以规避跨域问题。
  - 工作中我们也会有下载excel的时候，这时如果后端的接口是get且响应头的内容类型是application/octet-stream。
  - 那我们直接使用js在新标签页中打开路径，即可触发浏览器的下载行为。
  - 否则的话，我们需要使用xhr接收，并把数据流转成blob:url后，再配合a标签的download属性进行下载。
* 前端下载：
  - 前端实现下载，在ios手机的非safari浏览器上，存在诸多限制，导致根本无法成功下载文件。
  - 终极解决方案就是给文件加响应头`'Content-Disposition': 'attachment; filename=' + fileName`。

# 下载
* 实验：ajax方式下载文件时无法触发浏览器打开保存文件对话框，也就无法将下载的文件保存到硬盘上！
* 原因：ajax方式请求的数据只能存放在javascript内存空间，可以通过javascript访问，但是无法保存到硬盘，因为javascript不能直接和硬盘交互，否则将是一个安全问题。
* XHR请求，无法直接触发浏览器的下载行为。需要手动触发浏览器的下载行为。
    - 方式一：如果是GET请求，新开页面即可直接触发浏览器的下载行为。
    - 方式二：创建一个隐形的表单来提交，设置form的target为_blank来弹出下载对话框（推荐使用）。
    - 方式三：URL.createObjectURL(new Blob(res)，利用前端H5提供的a的download属性来下载。IE11都不兼容。
    - 方式四：IE10、IE11有一个方法window.navigator.msSaveBlob可以将File或Blob对象保存到本地磁盘。
    - 方式五：最坏的打算就是拿到那些流，转换为base64，可以直接放入a标签的href。

## 下载文件的终极解决方案
* 'Content-Type': 'application/octet-stream'
  - 是以流的形式下载文件,这样可以实现任意格式的文件下载。
* 'Content-Disposition': 'attachment; filename=' + fileName
  - 第1个值表示：以什么方式下载，如attachment为以附件方式下载。
  - 第2个值表示：默认保存时的文件名。
#### 服务器实现下载的优势：手机上的浏览器，大多数都能友好的支持。
#### 纯前端实现下载的劣势：手机上的浏览器，只有少数能友好的支持。
* 使用MDN推荐的第三方包`file-saver`进行纯前端下载。
  - 安卓手机上的浏览器，大多数都能友好的支持。
  - 苹果手机上的浏览器，只有safari能友好的支持。其它浏览器点了都没反应，例如：uc浏览器、qq浏览器等。
