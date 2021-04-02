* 1em 等于当前元素的字体尺寸

* 快速回弹滚动
```
.xxx {overflow: auto;-webkit-overflow-scrolling: touch;}
```

* 移动端禁止选中内容
```
div {-webkit-user-select: none;}
```

* 移动端取消touch高亮效果
    - 在做移动端页面时，会发现所有a标签在触发点击时或者所有设置了伪类 :active 的元素，默认都会在激活状态时，显示高亮框，如果不想要这个高亮，那么你可以通过css以下方法来禁止：
    ```
    .xxx {-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
    ```

* 如何禁止保存或拷贝图像
    - 通常当你在手机或者pad上长按图像 img ，会弹出选项 存储图像 或者 拷贝图像，如果你不想让用户这么操作，那么你可以通过以下方法来禁止：
    ```
    img {-webkit-touch-callout: none;}
    ```

* 关闭IOS键盘首字母自动大写
```
<input type="text" autocapitalize="off" />
```

* 设置input里面placeholder
```
::-webkit-input-placeholder{color:#ccc;}
```

* 移动端如何清除输入框内阴影，在IOS上，输入框默认有内部阴影，但无法使用 box-shadow 来清除，如果不需要阴影，可以这样关闭：
```
input,textarea {-webkit-appearance: none;}
```

* 移动端禁止选中内容，如果你不想用户可以选中页面中的内容，那么你可以在css中禁掉：
```
.user-select-none {user-select: none;}
```

* 手机拍照和上传图片
```
<!-- 选择照片 -->
<input type=file accept="image/gif, image/jpeg, image/png">
<!-- 下面这两个都可以只选ico类型的图片 -->
<input type=file accept="image/vnd.microsoft.icon">
<input type=file accept="image/x-icon">
<!-- 选择视频 -->
<input type=file accept="video/mp4">
<!-- 选择音频 -->
<input type=file accept="audio/mp4">
```

* 消除transition闪屏
```
.css{
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}
```

* 开启硬件加速，解决页面闪白，保证动画流畅
```
.css {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
```

* 设计高性能CSS3动画的几个要素
    - 尽可能地使用合成属性transform和opacity来设计CSS3动画，
    - 不使用position的left和top来定位
    - 利用translate3D开启GPU加速
