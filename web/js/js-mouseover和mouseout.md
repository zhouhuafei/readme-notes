* 鼠标移入事件mouseover和鼠标移出事件mouseout
```
<div>
    <h2></h2>
</div>
```
* 给div加鼠标移入事件
    - 当鼠标移入div时会触发事件，移入到h2上会触发事件，鼠标移出h2但是鼠标仍在div里此时依然会触发事件。
* 给div加鼠标移出事件
    - 当鼠标移出div时会触发事件，移入到h2上会触发事件，鼠标移出h2时不管鼠标在不在div里此时都会触发事件。

# 基于鼠标移入事件mouseover和鼠标移出事件mouseout封装mouseenter和mouseleave
* relatedTarget 事件属性返回与事件的目标节点相关的节点。
* 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
* 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
* 对于其他类型的事件来说，这个属性没有用。
* 鼠标移入div和移出div时，判断ev.relatedTarget属性。如果这个属性得到的dom对象是div本身或者是div的子级，则不触发。

# 冷门知识点
* mouseenter和mouseleave原生js有这两个事件，不过这两个事件是没有办法冒泡的。
