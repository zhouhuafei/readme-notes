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
    - 裁切出一个矩形。
    - 这个矩形的top边，在原矩形top为10px的位置。
    - 这个矩形的right边，在原矩形left为60px的位置。
    - 这个矩形的bottom边，在原矩形top为200px的位置。
    - 这个矩形的left边，在原矩形left为10px的位置。

* 子元素的position:fixed;默认根据根节点进行定位，如果某个父节点使用了transform属性，则会根据这个父节点进行定位且会丢失fixed的悬浮特性。

* 减除字体动画震颤效果
```
font-variant: tabular-nums;
font-feature-settings: tnum;
```

* CSS3 filter(滤镜) 属性
    - 修改所有图片的颜色为黑白 (100% 灰度):
    ```css
    img {
        -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
        filter: grayscale(100%);
    }
    ```

* CSS3 zoom 设置或检索对象的缩放比例。 (微信小程序的switch组件没有提供修改大小的属性，使用zoom可解决修改大小的问题，比transform的scale好用(因scale占位，zoom不占位))
```css
div {
    zoom: 0.5;
}
```

* css3之sticky悬浮导航(存在兼容性问题，小程序中可以使用，手机端可以使用，pc端目前不支持)。
    - 滚动到class为sticky的标签时，标签会自动悬浮。
    - 如果top为100px，则滚动到标签top距离顶部100px的位置时就悬浮。
    - 特点：占据文档流，无需js即可写粘性导航的导航悬浮那部分功能。
    - 重点：无论父级有无定位，都是根据父级定位。所以如果做粘性导航导航悬浮的那部分功能，务必给导航的最外层元素加sticky。且最外层元素的直属父级需要是body。
    ```css
    /*
    .sticky的直属父级一般是body，如此，当滚动到.sticky的位置时，.sticky就会相对于body悬浮到可视区的指定位置。
    如果.sticky的直属父级是div，则div滚动到.sticky的位置时，.sticky就会相对于div悬浮到可视区的指定位置。
    总结：position: sticky属性是相对于直属父级进行定位的。
    */
    .sticky {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 9999;
      background: #ff0000;
    }
    ```
* 左右滚动的父容器使用flex布局时：父元素padding-right与子元素最后一个元素margin-right会失效。
  - 解决方案：再套一层。给第一层加`overflow-x: auto;display: flex;`。给第二层加`display: flex;`。
  ```html
  <style>
    * {margin: 0;padding: 0;}
    .flex-wrap {width: 500px;margin: 200px auto;overflow-x: auto;display: flex;}
    .flex {padding-left: 10px;display: flex;background: #cccccc;height: 200px;}
    .item {width: 250px;background: #999;margin-right: 10px;}
  </style>
  <div class="flex-wrap">
    <div class="flex">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
  ```
* `display: flex;`会让自身的单行省略号失效。
  - 解决方案：再套一层子级，给子级加单行省略号。
* 父级设置`flex: 1;`会导致子级的单行省略号失效。父级自身的单行省略号不会失效。
  - 解决方案1：子级指定`width: 220px;`或者`max-width: 220px;`。
  - 解决方案2：子级使用多行省略号模拟单行省略号。
  - 解决方案3：父级加`overflow: hidden;`。
  - 解决方案4：父级加`min-width: 0;`。
  - 解决方案5：父级加`width: 0;`。
* flex主侧轴简介
    - 主轴：默认水平线(x轴)
        - justify-content: center; 控制主轴对齐方式
    - 侧轴：默认垂直线(y轴)
        - align-items: center; 控制侧轴对齐方式
    - 修改主侧轴：flex-direction: column; 修改主轴为垂直线(y轴)，则侧轴自动变为水平线(x轴)。
* `flex-shrink: 0;`
    - 该属性用来设置，当父元素的宽度小于所有子元素的宽度的和时（即子元素会超出父元素），子元素如何缩小自己的宽度的。
    - flex-shrink的默认值为1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。值越大，减小的越厉害。
    - 如果值为0，表示不减小。

* 贝塞尔曲线
    - 工具：https://cubic-bezier.com/
    - `transition: 0.4s cubic-bezier(0, 0, .76, 1.45);`

* 改变输入框光标颜色，同时又不改变输入框里面的内容的颜色：`caret-color: red;`

* 兄弟节点，如果div1使用fixed进行定位，默认不加z-index的情况下，会覆盖掉div2，但是只要给div2加上relative或absolute或fixed，则div2就不会被覆盖了。
  - 前提是布局时，div2需要在div1的后面。
  - 此特性应用于中间弹窗时，会格外友好。
    - 给最外层的父级，加个99的fixed。
    - 然后内部遮罩的fixed就没必要加z-index了。
  - 知识点：子元素设置fixed层级z-index对比。
    - 两个设置有定位属性的父元素，其子元素都是使用fixed，虽然fixed定位是根据浏览器窗口定位的，但是两个子元素之间的层级关系z-index的对比是根据父元素进行对比的，即使某一个子元素的z-index设置非常大，如果该子元素的父元素的z-index很小的，那么该子元素的层级依然无法超越另一个父元素z-index设置很大但子元素z-index很小的元素的层级。
    - 如果两个父元素都没有定位属性，那么才会轮到子元素自身的z-index的对比。

* font-weight
  - 400 等同于 normal
  - 700 等同于 bold

* transform是从右到左执行，translate不会改变变换中心点（建议写在最左边，因符合人类直觉）。
  - 多属性变换时，建议translate放在最左边。
  - 先让所谓的缩放，旋转先触发，然后再触发位移。
  - 如此变换才符合人类的直觉。
