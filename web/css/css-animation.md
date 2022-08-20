# css3 动画
```
@keyframes scaleDraw {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}

.css-animation {
  animation: scaleDraw 2s ease-in-out infinite alternate;
}
```
* infinite 规定动画应该无限次播放。
* alternate 动画应该轮流反向播放。
* 让动画停在最后一帧：当动画完成后，保持动画最后一帧对应的属性值。
```
animation-fill-mode: forwards;
```

# 微信小程序动画默认停留在最后一帧？
> 答：不是的，动画特性和web中的动画特性是一致的。动画完成之后，都是停留在容器本来的位置的。
```
@keyframes footer-right-enter {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

.filter-popup-footer {
  animation-duration: 300ms;
  animation-name: footer-right-enter;
}
```
* 以上代码，容器会从右移动到左，并停留。让我误以为动画停留在了最后一帧。
* 实则不然，其实是运动的最后一个轨迹，刚好和容器的本来位置一致罢了。

# css3 景深
* `perspective: 1000px;`
    - 加给父级，设置元素的被观看位置，也就是站在1000px之外观看元素的变换（近大远小）。
* `transform-style: preserve-3d;`
    - 加给父级，当父级做3d变换时，保留子元素的3d变换（默认不保留）。

# css3 基点
* `transform-origin: left top 0px;`

# css3 变换
* transform是从右到左执行，translate不会改变变换中心点（建议写在最左边，因符合人类直觉）。
  - 多属性变换时，建议translate放在最左边。
  - 先让所谓的缩放，旋转先触发，然后再触发位移。
  - 如此变换才符合人类的直觉。

# 轴位
* x轴：水平于电脑屏幕的方向。
* y轴：竖直于电脑屏幕的方向。
* z轴：垂直于电脑屏幕的方向(穿透于电脑屏幕的方向)。
* 动画的`transform: rotate(30deg)`旋转，默认就是基于z轴的。
