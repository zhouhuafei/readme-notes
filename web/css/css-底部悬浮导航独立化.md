* 1、有一个标签在最底部占位置。有高度。有宽度。
* 2、内部的子元素进行fixed。宽继承。高继承。如此就可以保证底部导航的独立。
    - 就不用给body之类的标签加padding-bottom来补充这段悬浮的差距了。
* 代码示例：
```
<div style="height: 80px;width: 300px;background: #000;">
    <div style="width: inherit;height: inherit;background: #f00;position: fixed;"></div>
</div>
```
* 注：如果初始位置不在首屏，子元素(第二个div)需要加bottom或者top才会显示。

