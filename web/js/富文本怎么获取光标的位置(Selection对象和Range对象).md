* 任意时间最多只有一个 Selection，但是这个 Selection 可以包含多个 Range。（按住 Ctrl 来多选）
    - Chrome测试得到结果：按住 Ctrl 不能多选。
    - Chrome版本号：70.0.3538.77。
* IE
    - document.selection
    - document.selection.createRange()
* Chrome、Safari、FireFox
    - window.getSelection()
    - document.createRange()

摘自文章：https://www.jianshu.com/p/c85958c277b7

# 定义
Selection代表了当前激活选中区，即高亮文本块，和/或文档中用户可执行某些操作的其它元素。

# 特性
一个文档同一时间只能有一个选中区。选中区的类型决定了其中为空或者包含文本和/或元素块。尽管空的选中区不包含任何内容，你仍然可以用它作为文档中的位置标志。

# IE
```
// 对选定的文字进行加粗
document.selection.createRange().execCommand("Bold")
//  获取选定的文本
document.selection.createRange().text
// 获取选定的html
document.selection.createRange().htmlText
// 清除选定的内容
document.selection.clear()
// 弹出选择区的类型( None,Text,...)
document.selection.type
 // 获取选取区的文字
var range = document.selection.createRange();  // 创建文本区域对象
range.moveStart("character",2);                          // 选定区起始点向后移动2个字符
range.moveEnd("character",1);                          // 选定区结束点向后移动1个字符
console.log(range.text)
```

# Chrome Firefox
```
window.getSelection().rangeCount // 获取选定区数量
window.getSelection().isCollapsed // 选取定区起始点是否重叠
// 在光标处插入图片
document.execCommand("insertImage","false","https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png")
// 在光标处插入html代码
document.execCommand("insertHTML","false","<br/>")
// 在焦点状态下，移动光标至第一个字符后面
document.getElementById('txt').select();
document.getElementById('txt').setSelectionRange(1,1)
// 复制选定文本到剪切板
document.execCommand("Copy","false",null);
```

# 案例
```
// 插入span到第二个字符后面
var span = document.createElement('span');
span.innerHTML = '[this is add element]';

var sel = window.getSelection();
var startEl = $("#editor_id").next()[0].firstChild, startOffset = 2;
var range = document.createRange();
range.setStart(startEl, startOffset)
range.setEnd(startEl, startOffset);
range.collapse(true);
range.insertNode(span);
sel.removeAllRanges();
sel.addRange(range);
```

```
// 保存选定区
function saveSelectionRange() {
    if( window.getSelection ) {
        var sel = window.getSelection();
        if( sel.rangeCount > 0 ) {
            return sel.getRangeAt(0);
        }
    } else if( document.selection ) {
        var sel = document.selection;
        return sel.createRange();
    }
    return null;
}
```

```
// 载入选定区
function setSelectionRange(savedSel ) {
    if( !savedSel ) {
        return;
    }
    if( window.getSelection ) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedSel);
    } else if( document.selection ) {
        savedSel.select();
    }
}
```

```
// 获取光标位置
function getCursortPosition (ctrl) {
    //获取光标位置函数
    var CaretPos = 0;
    if (document.selection) { // IE Support
        ctrl.focus (); // 获取焦点
        var Sel = document.selection.createRange (); // 创建选定区域
        Sel.moveStart('character', -ctrl.value.length); // 移动开始点到最左边位置
        CaretPos = Sel.text.length;                      // 获取当前选定区的文本内容长度
    } else if (ctrl.selectionStart || ctrl.selectionStart == '0') { // Firefox support
        CaretPos =ctrl.selectionStart; // 获取选定区的开始点
    }
    return CaretPos;
}
```

```
// 设置光标位置
function setCaretPosition(ctrl, pos) {
    //设置光标位置函数
    if(ctrl.setSelectionRange) {
        ctrl.focus();  // 获取焦点
        ctrl.setSelectionRange(pos,pos);  // 设置选定区的开始和结束点
    } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();  // 创建选定区
        range.collapse(true);                // 设置为折叠,即光标起点和结束点重叠在一起
        range.moveEnd('character', pos);     // 移动结束点
        range.moveStart('character', pos);   // 移动开始点
        range.select();                      // 选定当前区域
    }
}
```

```
// 插入指定元素到指定位置
<!doctype html>
<html>
<head>
<title>selection</title>
</head>
<body>
    <p id="p1" contenteditable="true"><b>Hello</b> World</p>
    <input type="button" value="insertSpan" onclick="insertSpan()" />
</body>
<script>
function insertSpan() {
    var oP1 = document.getElementById("p1");
    var oHello = oP1.firstChild.firstChild;
    var oWorld = oP1.lastChild;
    var oRange = document.createRange();
    var oSpan = document.createElement("span");
    oSpan.style.color = "red";
    oSpan.appendChild(document.createTextNode("Inserted text"));

    oRange.setStart(oHello, 2);
    oRange.setEnd(oWorld, 3);
    oRange.insertNode(oSpan);
}
</script>
</html>
```
