```
window.parent // 当前window的父级窗口window
window.parent.document // 当前window的父级窗口window的document对象
window.parent.document.querySelector('iframe').dataset // iframe的dataset

window.top // 当前window的顶级窗口window
window.top.document // 当前window的顶级窗口window的document对象
window.top.document.querySelector('iframe').dataset // iframe的dataset

domIframe.contentWindow // iframe标签的window对象
domIframe.contentDocument  // iframe标签的document对象
domIframe.contentWindow.contentDocument  // iframe标签的document对象
domIframe.dataset // iframe的dataset
```
