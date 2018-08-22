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
* test.js内容如下：
```
var page = require('webpage').create();
page.viewportSize = {
    width: 750,
    height: 1334
};
// 写法一：和写法二是一样的。
page.open('http://d11678.s438520.m.whd.weishangye.com/poster?goods_id=53&style=1', function (status) {
    if (status === 'success') {
        page.render('test.png');
    } else {
        console.log('Page failure to load.');
    }
    phantom.exit(0);
});
// 写法二：和写法一是一样的。
/*
page.onLoadFinished = function () {
    page.render('test.png');
    phantom.exit(0);
};
page.open('http://d11678.s438520.m.whd.weishangye.com/poster?goods_id=53&style=1');
*/
```
* 存在问题：
    - js异步渲染的结构和图片抓取不到
    - 使用了图片懒加载的图片也抓取不到
