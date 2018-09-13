* 钩子函数
```
dom.onclick = function () {
    console.log('钩子函数');
};
```
* 回调函数
```
dom.addEventListener('click', function () {
    console.log('回调函数');
});
```

* 区别：
    - 钩子函数会第一时间触发。
    - 回调函数是在钩子函数内执行的函数。
