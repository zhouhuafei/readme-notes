# 怎么做表单验证？
* 是否内置表单验证规则？
    - 无内置表单验证规则。需要自己写验证规则。

# 微信小程序的组件 - van-datetime-picker
* 时间选择器```bindchange```时得不到```event.detail.value```的值，直接报错说```detail```是```undefined```。
    - 原因：文档有误。应使用```bindinput```事件，以及值是```event.detail```。

# vant的文档网站是怎么做的？
* 文档：https://youzan.github.io/vant/#/zh-CN/
> 以下全靠推测。
* 1、github上的源码，每个组件目录中写的有英文版`README.en-US.md`和中文版`README.zh-CN.md`的文档。
* 2、文档的站点，我查看源码发现使用了`docsearch`。https://github.com/algolia/docsearch
* 3、文档的站点，是单页面站点，组件预览是使用的iframe。切换导航必然和iframe进行了通信，故肯定使用了postMessage。
* 4、文档的站点，没有打接口，数据全部是存储到js里的，固应是自己开发了一套工具生成了对应的文档站点。
* 5、文档风格不是`docsify`的风格，所以应该不是使用`docsify`生成的。https://github.com/docsifyjs/docsify
