# 绝对定位
* 相对于有定位的父级进行定位。
* 注意：
    - 如果一个父级div有10px的边框。
    - 子div定位之后，left等于0时，子div的位置是在父div内侧的，距离最左边是有10px间距的。
* 如果父级或者父级的父级都没有定位，则相对于窗口进行定位。
    - 有滚动条时，bottom设置为0，其实并不在最底部，而是在一屏窗口高度的位置。

# 案例：
```
<style>
    .parent {
        width: 100px;
        height: 100px;
        border: 10px solid #f00;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
    }

    .parent .child {
        background: #000;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
<div class="parent">
    <div class="child"></div>
</div>
```
* .parent的宽度是100px，高度是100px。
* .child的宽度是80px，高度是80px。
* .child距离.parent的最左边是存在10px间距的。这个间距就是边框的宽度。
