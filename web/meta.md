# meta
```
<!-- 字符编码 -->
<meta charset="UTF-8">
<!-- 窗口宽度等于设备宽度以及禁止缩放(手机，此meta标签，如果有两条，下面的会覆盖掉上面的) -->
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<!-- 是否需要默认的工具栏和菜单栏(手机，safari浏览器，默认值yes，需要) -->
<meta name="apple-mobile-web-app-capable" content="yes">
<!-- 控制状态栏的样式(手机，safari浏览器，黑色) -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- 禁止把数字转化为电话号码(手机，safari浏览器) -->
<meta name="format-detection" content="telephone=no">
<!-- 禁止浏览器自动放大字体(手机，uc浏览器) -->
<meta name="wap-font-scale" content="no">
<!-- uc浏览器强制竖屏(手机，uc浏览器) -->
<meta name="screen-orientation" content="portrait">
<!-- qq浏览器强制竖屏(手机，qq浏览器) -->
<meta name="x5-orientation" content="portrait">
<!--
    让ie以最高级模式渲染文档
    此meta标签，如果写了三条，从上自下分别是：IE=Edge，IE=9、IE=8、IE=7。则优先以最上面的第一条为准进行文档渲染。
    其实只需要写一个IE=Edge即可，因为如果没有这个模式，浏览器会降级找能支持的最高级模式。
    关于优先识别方式和title标签类似，写在上面的优先识别，不会被后面同样的标签覆盖掉。
    chrome=1：当用户使用IE访问该页面时，如果用户安装了GCF插件，则使用chrome的内核解析该页面，如果没有，则使用最新的IE内核解析当前页面。
-->
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<!-- 启用360浏览器的极速模式(360浏览器，360的工程师说，如果用户手动调节成兼容模式，那么加了这个也是无法切换的，因为用户的优先级最高) -->
<meta name="renderer" content="webkit">
<!-- 搜索引擎抓取 -->
<meta name="robots" content="index, follow">
<!-- 页面关键词 -->
<meta name="keywords" content="zhouhuafei, 周华飞">
<!-- 页面描述 -->
<meta name="description" content="zhouhuafei, 周华飞">
<!-- 页面作者 -->
<meta name="author" content="zhouhuafei, 周华飞, 1123486116@qq.com">
```
