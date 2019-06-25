* 文件下载之a标签的download属性
* download属性规定被下载的超链接目标。
    - 该属性也可以设置一个值来规定下载文件的名称。所允许的值没有限制，浏览器将自动检测正确的文件扩展名并添加到文件。
* 在a标签中必须设置href属性。
```
<a href="http://sbxx.top/static-no-cache/test/zero/img.jpg" download="rename">
```
* 注意事项：
    - href的指向需要同源，跨域下载不下来。

# 下载
* 实验：ajax方式下载文件时无法触发浏览器打开保存文件对话框，也就无法将下载的文件保存到硬盘上！
* 原因：ajax方式请求的数据只能存放在javascript内存空间，可以通过javascript访问，但是无法保存到硬盘，因为javascript不能直接和硬盘交互，否则将是一个安全问题。
* XHR请求，无法直接触发浏览器的下载行为。需要手动触发浏览器的下载行为。
    - 方式一：如果是GET请求，新开页面即可直接触发浏览器的下载行为。
    - 方式二：创建一个隐形的表单来提交，设置form的target为_blank来弹出下载对话框（推荐使用）。
    - 方式三：URL.createObjectURL(new Blob(res)，利用前端H5提供的a的download属性来下载。IE11都不兼容。
    - 方式四：IE10、IE11有一个方法window.navigator.msSaveBlob可以将File或Blob对象保存到本地磁盘。
    - 方式五：最坏的打算就是拿到那些流，转换为base64，可以直接放入a标签的href。
