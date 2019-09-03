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
* 让动画停在最后一帧：当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
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
* `transform-style: preserve-3d;`
    - (加给父级)让转换的子元素保留3D转换。
* `perspective: 1000px;`
    - (加给父级)设置元素被查看位置的视图。

# 轴位
* x轴：水平于电脑屏幕的方向。
* y轴：竖直于电脑屏幕的方向。
* z轴：垂直于电脑屏幕的方向(穿透于电脑屏幕的方向)。
* 动画的`transform: rotate(30deg)`旋转，默认就是基于z轴的。
