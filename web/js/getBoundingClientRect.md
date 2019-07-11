> getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
* 语法：
    - ```domRect = dom.getBoundingClientRect();```
* 返回值类型：
    - ```domRect.top``` 元素上边到视窗上边的距离。
    - ```domRect.right``` 元素右边到视窗左边的距离。
    - ```domRect.bottom``` 元素下边到视窗上边的距离。
    - ```domRect.left``` 元素左边到视窗左边的距离。
    - ```domRect.width``` 元素计算后的宽度(如果是标准盒模型则包含padding和border)。
    - ```domRect.height``` 元素计算后的的高度(如果是标准盒模型则包含padding和border)。
* 标准盒模型
    - ```box-sizing: content-box;```
* 怪异盒模型
    - ```box-sizing: border-box;```
