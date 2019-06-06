* 文件下载之a标签的download属性
* download属性规定被下载的超链接目标。
    - 该属性也可以设置一个值来规定下载文件的名称。所允许的值没有限制，浏览器将自动检测正确的文件扩展名并添加到文件。
* 在a标签中必须设置href属性。
```
<a target="_blank" href="http://sbxx.top/static-no-cache/test/zero/img.jpg" download="rename">
```
* 注意事项：
    - href的指向需要同源，跨域下载不下来。
