* 定时器。
```
setTimeout(function (parameter) {
    console.log(parameter);
}, 3000, '我是实参');
```

* reload刷新页面。
```
location.reload(); // 刷新页面，有缓存
location.reload(true); // 刷新页面，无缓存
```

* visibilitychange事件。
    - 浏览器切换窗口的时候，会触发这个事件。
    - document.hidden属性返回布尔值true和false
    - document.visibilityStatus属性返回字符串'visible'和'hidden'。
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
    - 具有disabled属性的表单元素，表单提交(submit)时，name和value不会被带过去(这个不算冷门知识)。

* form的submit只支持get和post(非冷门)。
    - 小知识，submit时进行拦截，然后ajax提交处理。

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

* jq的serialize会过滤掉input类型(type)为file的值(非冷门)。
    - new FormData()不会过滤掉input类型(type)为file的值。
    - 没有name以及拥有disabled属性的表单元素会被上面的两种方法都过滤掉。

* scrollHeight
    - Element.scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同。包括元素的padding，但不包括元素的border和margin。scrollHeight也包括 ::before 和 ::after这样的伪元素。

* contains 检测当前节点是否包含某个节点，如果是节点自身，也会返回true，应该过滤掉自身。
    - nowNode.contains(otherNode)

* ++ 和 + +
```
console.log(1 ++ '1'); // 报错：Uncaught ReferenceError: Invalid left-hand side expression in postfix operation
console.log(1 + + '1'); // 2
```

* ie：```window.navigator.userAgent.match(/msie\s([\d\.]+)/i)```

* ie8：```!-[1,]```

* 默认true：```flag !== false```，传入的不是false，就默认为true。
* 默认false: ```flag === true```，传入的不是true，就默认为false。

* es6中，通过class定义的构造函数Super，无法使用Super.call(this)调用，当然Super.apply(this)也不行，也无法直接Super()调用，会报错。

* Object.values在低版本ios上不支持。
