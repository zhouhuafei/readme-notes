* 移动端使用轮播插件时谷歌浏览器报错 Unable to preventDefault inside passive event listener due to target being treated as passive
     - 解决方案 轮播条目里加上touch-action: none; 即可

* 1倍屏，chrome浏览器，font-size最小字体是12px，但是给标签设置font-size:0，可以让文字消失。
    - 给父级设置font-size:0，给子级设置font-size正常值，可以清理掉多个相邻内联标签之间的空格。

* background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
    - position/bg-size 平常很少这样使用，所以此时记录一下还可以这样用
    - background: url("./xxx.jpg") center/cover no-repeat; /* 居中，覆盖背景区域，不平铺 */
    - background: url("./xxx.jpg") 50% 20%/50% 10% no-repeat; /* 距离左边50%，距离上边20%，图片宽度50%，图片高度10% */

* clip:rect(10px, 60px, 200px, 10px);
    - clip属性剪裁绝对定位元素。
    - 从距离top为10px的位置，距离left为60px的位置，距离top为200px的位置，距离left为10px的位置，裁切出一个矩形。

* 子元素的position:fixed;默认根据根节点进行定位，如果某个父节点使用了transform属性，则会根据这个父节点进行定位。
