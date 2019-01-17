# 场景：
* 百分比布局的时候，width和padding以及margin都是相对父级容器的宽度计算的。如果父级没设置宽度，则子集宽度的百分比设置是有效的。
* 但是高度不是，高度是根据父级容器的高度进行计算的。如果父级没设置高度，则子集高度的百分比设置就无效。
* 我一般会用padding称起高度，或者用内容图片文字撑起高度。
* 用内容撑起高度的时候，因内容不同，列和列之间不等高。
* 用以下方式可以解决：给padding-bottom一个足够大的值，然后用margin-bottom负回来。如此列和列之间的高度就会相同(以内容多的一列高度为准)。
```
*{
    padding: 0;
    margin: 0;
}
.container {
    margin: 0 auto;
    width: 600px;
    overflow: hidden;
}
.left {
    float: left;
    width: 150px;
    background: #B0B0B0;
    padding-bottom: 2000px;
    margin-bottom: -2000px;
}
.right{
    float: left;
    width: 450px;
    background: #6CC;
    padding-bottom: 2000px;
    margin-bottom: -2000px;
}
```
