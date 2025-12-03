* 移动端使用轮播插件时谷歌浏览器报错 Unable to preventDefault inside passive event listener due to target being treated as passive
     - 解决方案 轮播条目里加上touch-action: none; 即可

* 1倍屏，chrome浏览器，font-size最小字体是12px，但是给标签设置font-size:0，可以让文字消失。
  - 给父级设置font-size:0，给子级设置font-size正常值，可以清理掉多个相邻内联标签之间的空格。

* 内联元素不会忽略标签内的首尾空格，以及标签内多个连续的空格会被解析成一个空格。
* 块元素和内联块元素会忽略标签内的首尾空格，以及标签内多个连续的非首尾空格会被解析成一个空格。请问如何保留空格？保留空格一般用在什么场景？
  - 保留空格方案1：使用`pre标签`包裹一下就可以保留所有空格。
  - 保留空格方案2：使用`white-space: pre;`也可以保留所有空格。
  - 保留空格方案3：使用`&nbsp;`书写每个空格。
  - 保留空格场景：一般应用于代码展示。

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
    - 回退线（x||y变化）（平移超出并回退运动）：`transition: 0.4s cubic-bezier(0, 0, .76, 1.45);`。
    - 抛物线（x&&y变化）（加购物车抛物线运动）：`transition: 0.4s cubic-bezier(0.5, -0.5, 1, 1);`。

* 改变输入框光标颜色，同时又不改变输入框里面的内容的颜色：`caret-color: red;`

* 兄弟节点，如果div1使用fixed进行定位，默认不加z-index的情况下，会覆盖掉div2，但是只要给div2加上relative或absolute或fixed，则div2就不会被覆盖了。
  - 前提是布局时，div2需要在div1的后面。
  - 此特性应用于中间弹窗时，会格外友好。
    - 给最外层的父级，加个99的fixed。
    - 然后内部遮罩的fixed就没必要加z-index了。
  - 知识点：子元素设置fixed层级z-index对比。
    - 两个设置有定位属性的父元素，其子元素都是使用fixed，虽然fixed定位是根据浏览器窗口定位的，但是两个子元素之间的层级关系z-index的对比是根据父元素进行对比的，即使某一个子元素的z-index设置非常大，如果该子元素的父元素的z-index很小的，那么该子元素的层级依然无法超越另一个父元素z-index设置很大但子元素z-index很小的元素的层级。
    - 如果两个父元素都没有定位属性，那么才会轮到子元素自身的z-index的对比。
* 定位时的层级z-index
  - 一个div有两个class，同层级时，后书写的样式会覆盖前者。即：样式不同时，样式的优先级，后书写的优先。
  - 两个div有同样class，同层级时，后书写的容器会覆盖前者。即：样式相同时，容器的优先级，后书写的优先。

## 常见设计稿字体对应字重font-weight大小
#### 参考1：https://blog.csdn.net/yinhaijing_ss/article/details/143750849
#### 参考2：https://www.w3.org/html/ig/zh/wiki/CSS3%E5%AD%97%E4%BD%93%E6%A8%A1%E5%9D%97#.E5.AD.97.E4.BD.93.E7.B2.97.E7.BB.86.EF.BC.9A.E2.80.98font-weight.E2.80.99.E5.B1.9E.E6.80.A7
```
100 - Thin
200 - Extra Light (Ultra Light)
300 - Light
400 - Regular (Normal、Book、Roman)
500 - Medium
600 - Semi Bold (Demi Bold)
700 - Bold
800 - Extra Bold (Ultra Bold)
900 - Black (Heavy)
```
#### PingFang SC 有六个字重
* 在拿到 UI 设计稿时，可以经常看设计稿中常见的字体有 PingFangSC-Regular、PingFangSC-Medium、PingFangSC-Bold，并不会直接给我们 font-weight 的值。在这我们就需要知道常见字体和 font-weight 的对应关系。
```
100 - font-family: PingFangSC-Thin;
200 - font-family: PingFangSC-Ultralight;
300 - font-family: PingFangSC-Light;
400 - font-family: PingFangSC-Regular;
500 - font-family: PingFangSC-Medium;
600 - font-family: PingFangSC-Semibold;
```
* 在写css时，通常不是直接使用上面的字体，而是按照下述方式使用，然后使用font-weight控制粗细。下述是一个案例：IOS使用苹果字体：`'PingFang SC'`，Android使用思源黑体：`'思源黑体'`。
```css
.page {
  font-family: 'PingFang SC', '思源黑体', sans-serif;
  font-weight: 400;
}
```
* 在css中给font-family设置值时：`PingFangSC`和`PingFang SC`是一样的。`PingFangSC-Regular`和`PingFangSC Regular`和`PingFang SC Regular`是一样的。

## font-weight
#### normal：等同于font-weight:400;如果字体不支持400粗细则浏览器会取相近的值。
#### bold：等同于font-weight:700;如果字体不支持700粗细则浏览器会取相近的值。
#### bolder：指定外观的重量大于继承的值。计算公式：继承100-300得到400、继承400-500得到700、继承600-900得到900。
#### lighter：指定外观的重量小于继承的值。计算公式：继承100-500得到100、继承600-700得到400、继承800-900得到700。
#### font-weight其他数值不生效是因为对应字体不支持，可以使用自定义字体使之生效：https://blog.csdn.net/wanyaobujianqian/article/details/139593628
#### 定义字体
```css
@font-face {
  font-family: 'MUJIFont2020';
  font-weight: 300;
  src: url('https://daozhi-tmp.oss-cn-shanghai.aliyuncs.com/muji/fonts/MUJIFont2020-Light.otf') format('opentype');
}

@font-face {
  font-family: 'MUJIFont2020';
  font-weight: 400;
  src: url('https://daozhi-tmp.oss-cn-shanghai.aliyuncs.com/muji/fonts/MUJIFont2020-Regular.otf') format('opentype');
}

@font-face {
  font-family: 'MUJIFont2020';
  font-weight: 700;
  src: url('https://daozhi-tmp.oss-cn-shanghai.aliyuncs.com/muji/fonts/MUJIFont2020-Blod.otf') format('opentype');
}

@font-face {
  font-family: 'MUJIFont2020';
  font-weight: 900;
  src: url('https://daozhi-tmp.oss-cn-shanghai.aliyuncs.com/muji/fonts/MUJIFont2020-Heavy.otf') format('opentype');
}
```
#### format用于描述URI所引用的字体资源的格式的提示
* 自定义字体的外部引用由一个URI、以及一个紧跟的可选的用于描述该URI所引用的字体资源的格式的提示。
* 如果没有提供格式提示，则用户代理应当下载这些字体资源。
* 如果提供了格式提示，则使用第一个能够成功激活的。如果格式提示都是不支持或未知的字体格式，则符合规范的用户代理必须跳过对这些字体资源的下载。
```
.woff2 - format('woff2')
.woff - format('woff')
.ttf - format('truetype')
.ttf、.otf - format('opentype')
.eot - format('embedded-opentype')
.svg、.svgz - format('svg')
```
#### 应用字体
```css
.font-weight-400 {
  font-family: 'MUJIFont2020';
  font-weight: 400;
}
.font-weight-700 {
  font-family: 'MUJIFont2020';
  font-weight: 700;
}
```

## aspect-ratio: 16 / 9;
#### 宽高比是16比9
#### 如果div的宽度是1600则高度为900

## grid
* 教程：https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
* 案例：https://github.com/zhouhuafei/readme-notes/tree/master/web/css/grid.html

## 100vh
> h5端，各个浏览器厂商，对100vh的定义不统一。
* h5端，在Android的小米浏览器上，100vh太高，会导致内容区域被底部菜单栏遮挡，建议使用100%设置高度。
* h5端，在IOS的Safari浏览器上，100vh更高，会导致内容区域被底部菜单栏遮挡更多，建议使用100%设置高度。
* vh、svh（small）、lvh（large）、dvh（dynamic）：https://zhuanlan.zhihu.com/p/616712401

## 底部安全区域
* 安全区域
```
safe-area-inset-top：安全区域距离顶部边界距离 通常是44px
safe-area-inset-right：安全区域距离右边界距离 通常是0
safe-area-inset-bottom：安全区域距离底部边界距离 通常是34px
safe-area-inset-left：安全区域距离左边界距离 通常是0
```
* 参考文章：https://www.jianshu.com/p/d144610fb64d
* 问题：h5底部安全区域为啥没生效？
```scss
.footer {
  padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
}
```
* 答案：env和constant只有在viewport-fit=cover时候才能生效。
```html
<meta name="viewport" content="viewport-fit=cover, width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

## css各种loading案例
* 案例：https://blog.csdn.net/hdp134793/article/details/131655277

## 换行
```scss
pre,
code {
  white-space: pre-wrap; // 保留所有的空白字符和换行符，但允许在需要时进行换行。
  word-break: break-all;
}
```
