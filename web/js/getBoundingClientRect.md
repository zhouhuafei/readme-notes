> getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
* 语法：
    - ```domRect = dom.getBoundingClientRect();```
* 返回值类型：
    - ```domRect.top``` 元素上边到视窗上边的距离。
    - ```domRect.right``` 元素右边到视窗左边的距离。
    - ```domRect.bottom``` 元素下边到视窗上边的距离。
    - ```domRect.left``` 元素左边到视窗左边的距离。
    - ```domRect.width``` 元素计算后的宽度(如果是标准盒模型则要计算上padding和border，如果是怪异盒模型则就是元素被设置的css属性width对应的值)。
    - ```domRect.height``` 元素计算后的的高度(如果是标准盒模型则要计算上padding和border，如果是怪异盒模型则就是元素被设置的css属性height对应的值)。
* 标准盒模型
    - ```box-sizing: content-box;```
* 怪异盒模型
    - ```box-sizing: border-box;```
