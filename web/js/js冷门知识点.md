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
    - `\t` 可以更换为两个空格 `  `
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
    - 案例：
        - `console.log(JSON.stringify({a:undefined})) // {}`
        - `console.log(JSON.stringify({a:null})) // {"a":null}`

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

### forEach中的async/await不会阻塞forEach外的流程
> 其他方法也存在类似问题 例如 map filter 问题的本质是回调函数导致
```javascript
function test () {
  const arr = [1, 2, 3]
  arr.forEach(async value => {
    await fnPromise(value)
    console.log('这里想要的是先打印，但是会后打印', value)
  })
  console.log('这里想要的是后打印，但是会先打印')
}

function fnPromise (value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

test()
```
* 使用`for i`或者`for in`或者`for of`。
```javascript
async function test () {
  const arr = [1, 2, 3]
  for (let item = 0; item < arr.length; item++) {
    const value = arr[item]
    await fnPromise(value)
    console.log('这里想要的是先打印，所以会先打印', value)
  }
  console.log('这里想要的是后打印，所以会后打印')
}

function fnPromise (value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

test()
```
* 使用`Promise.all`。
```javascript
async function test () {
  const arr = [1, 2, 3]
  const promiseA = []
  arr.forEach(value => {
    promiseA.push(fnPromise(value))
  })
  const r = await Promise.all(promiseA)
  r.forEach(value => {
    console.log('这里想要的是先打印，所以会先打印', value)
  })
  console.log('这里想要的是后打印，所以会后打印')
}

function fnPromise (value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

test()
```

### 使用`let`和`const`取代`var`解决`for i`配合`dom事件`或配合`定时器`进行输出时值异常的问题
> 以前的解决方案是使用闭包，现在使用`let`和`const`即可解决。
* 使用var
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) // 5、5、5、5、5
  }, 0)
}
for (var i = 0; i < 5; i++) {
  setTimeout((i) => {
    console.log(i) // 0、1、2、3、4
  }, 0, i)
}
for (var i = 0; i < 5; i++) {
  (function(i){
    setTimeout(() => {
      console.log(i) // 0、1、2、3、4
    }, 0)
  })(i)
}
```
* 使用let
```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) // 0、1、2、3、4
  }, 0)
}
```
* 错误的使用const会报错：Uncaught TypeError: Assignment to constant variable.
  - 在`for i`循环语句中使用`const`会报上述错误，因为const表示常量，常量不可变，不允许被重新赋值。
  - 而`for i`的自增语句相当于重新赋值。
  - 可以在`for of`和`for in`的循环语句中使用`const`。
* 正确的使用const
```javascript
for (var i = 0; i < 5; i++) {
  const j = i
  setTimeout(() => {
    console.log(j) // 0、1、2、3、4
  }, 0)
}
```

### Object.keys和Object.getOwnPropertyNames的区别
* `for in`会遍历原型上可被枚举的属性。下述两个均不会遍历原型上的属性。
* Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。
* Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
```javascript
Person = function (name) {
  this.name = name || ''
}
Person.prototype.sayHello = function () {
  console.log('hello')
}
p = new Person('yangyang')
p.age = 18
Object.defineProperties(p, {
  age: {
    enumerable: false
  }
})
for (const attr in p) {
  console.log(attr)
  // 'name'
  // 'sayHello'
}
console.log(Object.keys(p)) // ['name']
console.log(Object.getOwnPropertyNames(p)) // ['name', 'age']
```

### JavaScript中数字占几个字节
* JavaScript的number基本类型占8个字节
* 1B = 8bit
* 8B = 64bit
* Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true
* Number.MIN_SAFE_INTEGER === Math.pow(-2, 53) + 1 // true

### location.hash
* hash虽然会出现在url中，但不会被包含在HTTP请求中。
* 亲测，确实如此，服务端对应请求的url上不会出现#号以及#号之后相关的数据。
* 主要是浏览器发送的请求上没有对应的数据，就算在url上强行拼接，在network中也不会出现。

### `?`和`??`
> https://blog.csdn.net/lzfengquan/article/details/120302244
* `?`可以防止报错。
```javascript
var obj = { a: 'a' }
obj?.a?.length // 1
obj?.b?.length // undefined
```
* `??`可以赋值默认值。
```javascript
null ?? 'a' // 'a'
undefined ?? 'b' // 'b'
'' ?? 'c' // ''
false ?? 'd' // false
0 ?? 'e' // 0
```

## 随机数公式
```javascript
// 公式1
Math.round(Math.random() * (max - min) + min)
// 公式2
Math.floor(Math.random() * (max - min + 1) + min)
```

## 前端错误监控
* 使用`window.onerror`和`window.onunhandledrejection`事件能监控到js错误。
* 普通异步错误用`window.onerror`捕获。
* promise异步错误用`window.onunhandledrejection`捕获。

## try/catch捕获错误
* 能捕获同步错误
* 还能在async函数内捕获await抛出的错误

## 语音录入
> js录音、语音录入、语音识别
* https://www.zhihu.com/question/485683744/answer/2771614252
* https://blog.csdn.net/WangYanWenXin/article/details/120447875
* https://recorder.api.zhuyuntao.cn/Recorder/start.html
* https://recorder.zhuyuntao.cn/
