# 个人总结
* 获取光标位置主要使用的几个方法：
```
var Selection = document.getSelection();
var hasRange = Selection.rangeCount;
var Range = Selection.getRangeAt(0);
Range.insertNode(node);
```
* 主要细节：
    - 富文本容器失去焦点时要保存Range。
    - Range不存在的话要看保存的Range存不存在。
    - 插入节点的时候。要判断Range的选中区域是否是富文本容器的区域。
* 案例：https://github.com/zhouhuafei/hello-world/blob/master/html/%E5%AF%8C%E6%96%87%E6%9C%AC%E6%80%8E%E4%B9%88%E8%8E%B7%E5%8F%96%E5%85%89%E6%A0%87%E7%9A%84%E4%BD%8D%E7%BD%AE(Selection%E5%AF%B9%E8%B1%A1%E5%92%8CRange%E5%AF%B9%E8%B1%A1).html

以下摘自文章：https://www.jianshu.com/p/ad2f818cc3b0

# 一：Range对象的概念
* ```Range对象代表页面上一段连续的区域```，通过Range对象可以获取或者修改页面上任何区域的内容。也可以通过Range的方法进行复制和移动页面任何区域的元素。
* 在Js的document文档中有一个方法用来创建一个Range对象，代码如下：
```
var  range = document.createRange();
```
* 在html5中，每一个浏览器窗口都会有一个```Selection对象，代表用户鼠标在页面中所选取的区域```，(注意：经过测试IE9以下的浏览器不支持Selection对象), 可以通过如下语句创建selection对象；
```
var  selection = document.getSelection();
或者
var  selection  = window.getSelection();
```
* 每一个selection对象都有一个或者多个Range对象，每一个range对象代表用户鼠标所选取范围内的一段连续区域，在firefox中，可以通过ctrl键可以选取多个连续的区域，因此在firefox中一个selection对象有多个range对象，在其他浏览器中，用户只能选取一段连续的区域，因此只有一个range对象。
* 可以通过selection对象的getRangeAt方法来获取selection对象的某个Range对象，如下：
    - getRangeAt方法有一个参数index，代表该Range对象的序列号；我们可以通过Selection对象的rangeCount参数的值判断用户是否选取了内容；
    - 1. 当用户没有按下鼠标时候，该参数的值为0.
    - 2. 当用户按下鼠标的时候，该参数值为1.
    - 3. 当用户使用鼠标同时按住ctrl键时选取了一个或者多个区域时候，该参数值代表用户选取区域的数量。
    - 4. 当用户取消区域的选取时，该属性值为1，代表页面上存在一个空的Range对象；

# 二：Range对象的属性和方法
## (1)属性
* startContainer
    - 包含“起点”的节点。“包含”的意思是起点所属的节点。
* endContainer
    - 包含“结束点”的节点
* startOffset
    - “起点”在startContainer中的偏移量。
    - 如果startContainer是文本节点、注释节点或CDATA节点，则返回“起点”在startContainer中字符偏移量。
    - 如果startContainer是元素节点，则返回“起点”在startContainer.childNodes中的次序。
* collapsed:
    - 起点和结束点在一起时为true；Range对象为空（刚createRange()时）也为true。
* commonAncestorContainer
    - 第一个包含Range的节点，同时包含起点和结束点。

## (2)定位（设置“起点”和“结束点”）的一些方法
* setStart(node, offset)和setEnd(node, offset)
    - setStart：设置起点的位置，node是对startContainer的引用，偏移则是startOffset；
    - setEnd：设置结束点的位置，node是对endContainer的引用，偏移则是startOffset；
* setStartBefore(referenceNode)、setStartAfter(referenceNode)、setEndBefore(referenceNode)、setEndAfter(referenceNode)。
    - setStartBefore：将“起点”设置到referenceNode前
    - setStartAfter：将“起点”设置到referenceNode后
    - setEndBefore：将“结束点”设置到referenceNode前
    - setEndAfter：将“结束点”设置到referenceNode后
    - 注意：使用这四个方法设置的“起点”或“结束点”的父节点与referenceNode的父节点是同一个元素。

## (3)修改范围的方法
* cloneRange()
    - cloneRange()方法将返回一个当前Range的副本，它也是Range对象。
    - 注意它和cloneContents()的区别在于返回值不同，一个是HTML片段，一个是Range对象 。
* cloneContents()
    - 可以克隆选中Range的fragment并返回改fragment。这个方法类似extractContents()，但不是删除，而是克隆。
* deleteContents()
    - 从Dom中删除Range选中的fragment。注意该函数没有返回值（实际上为undefined）。
* extractContents()
    - 将选中的Range从DOM树中移到一个fragment中，并返回此fragment。
* insertNode()
    - insertNode方法可以插入一个节点到Range中，注意会插入到Range的“起点”。
* compareBoundaryPoints()
    ```
    var compare = comparerange.compareBoundaryPoints(how, sourceRange);
    ```
    - compare：返回1, 0, -1.（0为相等，1为时，comparerange在sourceRange之后，-1为comparerange在sourceRange之前）。
    - how：比较哪些边界点，为常数。
    - Range.START_TO_START - 比较两个 Range 节点的开始点
    - Range.END_TO_END - 比较两个 Range 节点的结束点
    - Range.START_TO_END - 用 sourceRange 的开始点与当前范围的结束点比较
    - Range.END_TO_START - 用 sourceRange 的结束点与当前范围的开始点比较
    - sourceRange：个Range对象的边界。
* detach()
    - 虽然GC（垃圾收集器）会将其收集，但用detach()释放range对象是一个好习惯。语法为：oRange.detach();
* toString()
    - 返回该范围表示的文档区域的纯文本内容，不包含任何标签;
