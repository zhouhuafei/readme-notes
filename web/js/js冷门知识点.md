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
    - 使用reduce进行数组转对象。
    ```javascript
    const arr = [{ key: 'a' }, { key: 'b' }]
    arr.reduce((result, current) => {
      return {
        ...result,
        [current.key]: current
      }
    }, {})
    ```

* checkbox,radio,select没有readonly属性。
    - 具有disabled属性的表单元素，表单提交(submit)时，name和value不会被带过去(这个不算冷门知识)。

* form的submit只支持GET和POST(非冷门)。
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
    - 原生js的方法包含自身。
    ```
    document.querySelector('html').contains(document.querySelector('body')); // true
    document.querySelector('html').contains(document.querySelector('html')); // true
    ```
    - jQuery的方法不包含自身。
    ```
    $.contains(document.querySelector('html'), document.querySelector('body')); // true
    $.contains(document.querySelector('html'), document.querySelector('html')); // false
    ```

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

* Object.values在低版本ios的微信上不支持。

* ```fn.call()```不传参数时```this```指向```window```对象。严格模式下```"use strict"```指向```undefined```。
    - 手写call
    - call的实现核心：
    ```
    Function.prototype.call2 = function (content) {
        content = content || window;
        content.randomFn = this; // 重点一：this就是fn
        content.randomFn([...arguments].slice(1)); // 重点二：参数传递
        delete content.randomFn;
    };

    function fn() {
        console.log(this);
    }

    fn.call2({}, 1, 2);
    ```

* 怎么才能得知被new出来的对象所属的构造函数是谁？
```
function A(){
    this.mm = 'mm';
}
var a = new A();
// 方法1
console.log(a.constructor.name); // 打印 'A'
// 方法2
console.log(Object.getPrototypeOf(a).constructor.name); // 打印 'A'
// 方法3
console.log(a.__proto__.constructor.name); // 打印 'A'
```
  - 三种不常用的方法
    - isPrototypeOf：方法用于测试一个对象是否存在于另一个对象的原型链上。
    ```
    A.prototype.isPrototypeOf(a); // true
    ```
    - getPrototypeOf：方法返回指定对象的原型
    ```
    Object.getPrototypeOf(a); // 返回原型。
    ```
    - hasOwnProperty：方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性。
    ```
    a.hasOwnProperty('mm'); // 'a'
    ```

* 检测子类继承于哪个类？
```
class A {}
class B extends A {}
// 等同于
function A() {}
function B() {}
B.prototype.__proto__ = A.prototype
B.__proto__ = A
// 以上可被使用以下方法进行检测
Object.getPrototypeOf(B).name // 'A'
// 其他(和以上无关) - 检测实例源自哪个构造函数
Object.getPrototypeOf(new B()).constructor.name // 'B'
```

* 多为数组扁平化 - 方案1：
    - 1、使用toString成字符串。
    ```javascript
    [1,[2,[3]]].toString(); // 1,2,3
    ```
    - 2、使用toString成字符串。
    - 劣势：会把所有值全部都转成字符串，所以解析不了函数和json对象以及布尔值等复合类型和基本类型的数据。
* 多为数组扁平化 - 方案2：
    - 使用数组的flat方法。
    ```javascript
    [1,[2,[3]]].flat(2); // [1,2,3]
    ```

* 生成10条数据
    - 方法1
    ```javascript
    Array.apply(Array, new Array(10)).map(() => ({ code: 'code123', name: '岗位名称', remark: '备注', status: '启用' })) // ```new Array```换成```Array```也是对的。
    ```
    - 方法2
    ```javascript
    Array.apply(Array, {length:10}).map(() => ({ code: 'code123', name: '岗位名称', remark: '备注', status: '启用' })) // apply的第二参数是一个数组或者类数组对象
    ```
    - 方法2的引申知识点：```Array.prototype.slice.call({length:10})```转出来的是稀疏数组。稀疏数组使用map，filter，forEach等方法时不会处理稀疏数组中的空项。
    - 方法3
    ```javascript
    Array.from({length:10}).map(() => ({ code: 'code123', name: '岗位名称', remark: '备注', status: '启用' }))
    ```
    - 方法4
    ```javascript
    [...new Array(10)].map(() => ({ code: 'code123', name: '岗位名称', remark: '备注', status: '启用' })) // ```new Array```换成```Array```也是对的。
    ```
    - 方法5
    ```javascript
    new Array(10).fill({ code: 'code123', name: '岗位名称', remark: '备注', status: '启用' })
    ```
    - 以上`new Array`换成`Array`也是对的。

* 对象```{1: 'a'}```的```key```会自动转成字符串类型。用```Object.keys({1: 'a'})```即可看出来。

* JSON.stringify格式化：`JSON.stringify({ a: 1, b: 2 }, null, '\t')`。
    - 语法：`JSON.stringify(value[, replacer [, space]])`
    - value：将要序列化成 一个JSON 字符串的值。
    - replacer：可选
        - 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
        - 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
        - 如果该参数为null或者未提供，则对象所有的属性都会被序列化；
    - space：可选
        - 指定缩进用的空白字符串，用于美化输出（pretty-print）；
        - 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；
        - 如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
        - 如果该参数没有提供（或者为null）将没有空格。

* 数组上移(左移)和下移(右移)
```
/**
 * @param {Array} arr - 数组本身
 * @param {Number} num - 数组索引
 * @param {Number} dir - 1上移(左移) -1下移(右移)
 * */
function move (arr, num, dir) {
  if (dir === -1 && num === arr.length - 1) return arr
  if (dir === 1 && num === 0) return arr
  arr[num] = arr.splice(num - dir, 1, arr[num])[0]
  return arr
}
```

* sort
如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。
```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 7, 7, 9, 10, 88]
arr.sort() // [1, 10, 2, 3, 4, 5, 6, 7, 7, 7, 88, 9]
arr.sort((v1,v2)=>v1-v2) // [1, 2, 3, 4, 5, 6, 7, 7, 7, 9, 10, 88]
arr.sort((v1,v2)=>v2-v1) // [88, 10, 9, 7, 7, 7, 6, 5, 4, 3, 2, 1]
```
