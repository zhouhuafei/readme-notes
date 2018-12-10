# iphone xs max 上，同样的图片，同样的数值(10000px)。背景一直错位。
* 代码如下：
```
.prize {
    display: flex;
    overflow: hidden;
    height: px2rem(267/2);
    width: px2rem(510/2);
    margin: px2rem(414/2) auto 0;
}

.prize-item {
    flex: 1;
    width: 0;
    height: 100%;
    background: url("images/prize.png");
    background-size: 100% auto;
    background-position: 0 10000px;
    background-repeat: repeat-y;
    transition: 3s ease-out;
}
```
* 问题原因：```background-size: 100% auto;```导致。
* 解决方案：
```
    background-size: px2rem(510/2/3) auto;
```
