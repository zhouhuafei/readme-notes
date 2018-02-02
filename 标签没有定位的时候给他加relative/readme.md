```
var divDom = document.querySelector('div');
if (getComputedStyle(divDom).position === 'static') {
    if (divDom.style.position === '' || divDom.style.position === 'static') {
        divDom.style.position = 'relative';
    }
}
```