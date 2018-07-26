# 吐槽
* 虽然只是小技巧，但是依然有很多人不会不是么，言归正传。

# 正题
* position为fixed的mask，假如它的z-index为50
* 你想要高亮的部分只需要z-index高于这个值就行了
* position为relative，absolute，fixed什么的，当然都随意了，这个就根据你自己的需求进行设置了好吧。

# 引申
* 用box-shadow模拟遮罩可以做出更灵巧的透明。
* 一个div定位到某个地方，加宽高背景透明定位到某一个位置，然后通过box-shadow去模拟一个超大的遮罩出来，就可以实现一种很灵巧的透明穿透遮罩的层。
* 这样做有个问题那就是，遮罩部分可以被点击到，因为不是真实的遮罩，所以要再用一个透明的遮罩配合。如此方是完美的。
```
.g-mask-transparent {
    position: fixed;
    width: 200px;
    height: 200px;
    z-index: 500;
    left: 488px;
    top: 200px;
}
.g-mask-through {
    box-shadow: 0 0 0 1000px rgba(0,0,0,0.8);
    position: fixed;
    width: 200px;
    height: 200px;
    z-index: 501;
    left: 488px;
    top: 200px;
}
```
