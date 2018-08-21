参考：https://blog.csdn.net/libsyc/article/details/78199850

# windows
* 下载
    - http://phantomjs.org/download.html
* 解压
    - 根据路径自行配置环境变量，我配置的如下：
    - D:\software\phantomjs-2.1.1-windows\bin;
    - 然后打开命令行运行命令：phantomjs -v 测试是否配置完毕。
    - 如果不配置环境变量，可以直接双击执行\bin\目录下的phantomjs.exe也可直接使用。
* 抓取页面，保存成图片
```
phantomjs test.js
```
* test.js内容如下
```
var page = require('webpage').create();
page.open('http://s438520.m.whd.weishangye.com/index.html', function (status) {
    if (status === 'success') {
        page.render('front-Thinking.png');
    } else {
        console.log('Page failure to load.');
    }
    console.log(page);
    phantom.exit(0);
});
```
* 存在问题：
    - 页面没加载完毕，就抓取了。导致页面上的某些图片不能被渲染出来。
* 解决方案：
    -
