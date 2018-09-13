* font
    - 设置方式参考css。
    - 如果设置错误，或者设置了无效的值，则默认是：'10px sans-serif'。
    - 设置参数时，至少要有两个值。ctx.font = '40px Arial';
    - 否则都算是无效的设置，都会变成默认值：'10px sans-serif'。
    - 微信小程序中，字体大小不能为小数，否则也会变成默认值：'10px sans-serif'。

* 函数封装：文字绘制（多行，单行，省略号），圆角矩形，阴影设置等。
    - https://github.com/zhouhuafei/zhf.canvas-api
