官方文档：http://phantomjs.org/api/webpage/handler/on-load-finished.html

# windows
* 下载
    - http://phantomjs.org/download.html
* 解压
    - 根据路径自行配置环境变量，我配置的如下：
    - D:\software\phantomjs-2.1.1-windows\bin;
    - 然后打开命令行运行命令：phantomjs -v 测试是否配置完毕。
    - 如果不配置环境变量，可以直接双击执行\bin\目录下的phantomjs.exe也可直接使用。

# 案例：
* 抓取某个页面，保存成海报图片
```
phantomjs test.js
```
* test.js内容如下
```
var page = require('webpage').create();
page.open('http://d11678.s438520.m.whd.weishangye.com/product-3.html', function (status) {
    if (status === 'success') {
        page.render('test.png');
    } else {
        console.log('Page failure to load.');
    }
    phantom.exit(0);
});
```
* 存在问题：
    - 页面没加载完毕，就抓取了。导致页面上的某些图片不能被渲染出来。
* 解决方案1：
    - 使用事件配合，test.js内容如下
    ```
    var page = require('webpage').create();
    page.onLoadFinished = function () {
        page.render('test.png');
        phantom.exit(0);
    };
    page.open('http://d11678.s438520.m.whd.weishangye.com/product-3.html');
    ```
* 解决方案1存在的问题：
    - js异步渲染的结构和图片抓取不到
    - 使用了图片懒加载的图片也抓取不到

* 解决方案2：
    - 海报页的图片使用base64格式。仅仅是猜想，未做验证，如果此方案行不通，还需使用解决方案1。
