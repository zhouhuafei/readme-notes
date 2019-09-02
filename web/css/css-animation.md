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
