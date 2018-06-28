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

* checkbox,radio,select没有readonly属性。
    - 具有disabled属性的表单元素，表单提交submit时，值不会被带过去(这个不算冷门知识)。

* parseInt(string, radix) 此函数可解析一个字符串，并返回一个整数。
    - 当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为16进制的整数。否则解析为十进制的整数。
    - radix 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
    - radix为1或者大于36返回的是NaN
    - string的值转成数字如果大于等于radix返回的是NaN
    ```
    ['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
    parseInt('1', 0); // 1
    parseInt('2', 1); // NaN
    parseInt('3', 2); // NaN
    ```

* 在浏览器的控制台中，00000011，这种类型的数字，只要0后面的后续位数每个都小于8，就会被认为是8进制数字。输出时会自动转成10进制。
    - 例如00000011会被转成十进制的9。
    - 如果0x开头则表示是16进制。例如0xf会被转成10进制的15。
