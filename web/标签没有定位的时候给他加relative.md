```
var divDom = document.querySelector('div');
// 先判断有优先级高的
if (divDom.style.position === '' || divDom.style.position === 'static') {
    // 再判断优先级低的
    if (getComputedStyle(divDom).position === 'static') {
        divDom.style.position = 'relative';
    }
}
```
* 我简单的封装了一下
* 封装是根据commonjs的模块规范进行封装的，不可以直接使用，建议配合webpack或者browserify使用
* github地址
```
https://github.com/zhouhuafei/zhf.dom-add-position
```
* npm地址
```
https://www.npmjs.com/package/zhf.dom-add-position
```