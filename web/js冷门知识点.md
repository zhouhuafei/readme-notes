* 定时器
```
setTimeout(function (parameter) {
    console.log(parameter);
}, 3000, '我是实参');
```

* reload刷新页面
```
location.reload(); // 刷新页面，有缓存
location.reload(true); // 刷新页面，无缓存
```

* visibilitychange事件
    - 浏览器切换窗口的时候，会触发这个事件。
    - document.hidden属性返回布尔值true和false
    - document.visibilityStatus属性返回字符串'visible'和'hidden'
    - 以上两条属性可以判断本次切换是隐藏窗口还是显示窗口。

* reduce
    - arr如果是空数组则会报错。Reduce of empty array with no initial value。
    - arr如果只有一个值，则会返回这个值。不会走到function内部去。
    ```
    var arr = [];
    arr.reduce(function (v1, v2) {
        return v1 + v2;
    });
    ```

* checkbox,radio,select没有readonly属性
