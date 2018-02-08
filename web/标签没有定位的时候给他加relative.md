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