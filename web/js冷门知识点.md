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
