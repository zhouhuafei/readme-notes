> 出一些简单的面试题，筛选一些熟练工。

## html
#### 简述一下你对标签语义化的理解？
* 对seo友好，结构清晰，便于阅读。
#### 你用meta标签做过什么？
* 定义字符集。`<meta charset="UTF-8">`。
* 定义页面关键字`keywords`和描述`description`。
* 让手机上的浏览器强制竖屏。`uc浏览器`。`qq浏览器`。
* 对手机上的safari浏览器进行额外配置。`控制状态栏的样式`。`禁止把数字转化为电话号码`。`是否需要默认的工具栏和菜单栏`。
* 移动端自适应布局适配。`控制视口宽度`。

## css
#### 选择器？
* css选择器优先级？`id选择器 > class选择器 > 标签选择器`。
* 选择器`+`和`~`以及`>`的区别？`后面相邻兄弟选择器。后面兄弟选择器。直属子元素选择器`。
* `div p:nth-of-type(2)`和`div p:nth-child(2)`的区别？`前者选div下第2个p元素。后者选div下第2个元素且第2个元素需要是p元素`。
#### 盒模型？
* 标准盒模型包含哪些属性？`margin、padding、border、width、height`。
  - 标准盒模型和怪异盒模型的区别？`标准盒模型的border和padding会撑大width和height`。
* `box-sizing: border-box;`的特性？`border和padding不会撑大width和height`。
#### 过渡和动画？
* 如何加过渡效果？`transition`。
* 如何定义动画？`@keyframes`。
* 如何使用动画？`animation`。
#### 单位？
* px，%，em，rem，vw，vh的区别。`px是相对单位和屏幕分辨率保持一致。%是百分比。em的大小和父节点的font-size有关。rem的大小和html的font-size有关。vw和vh的大小和可视区的宽高有关`。
* 百分比布局的时候width和padding以及margin都是相对什么进行计算的？`相对父级容器的宽度进行计算`。
  - 左右内外间距也是如此么？`也是如此`。
  - absolute的left和top也是如此么？`并非如此，left相对父级容器的宽度进行计算，top相对父级容器的高度进行计算`。
* 1rem默认等于多少px？`1rem默认等于16px`。
* rem和px的转换关系受什么影响？`受html的font-size影响`。
* 移动端自适应布局适配？
  - 方案1：`百分比`。
  - 方案2：`rem` + `<meta name="viewport" content="width=device-width,initial-scale=1.0">`。
  - 方案3：`vw`。
#### 应用？
* CSS隐藏元素的几种方式及区别？`display: none; | visibility: none; | opacity: 0; | position | transform`。
* 单行省略号怎么写？`overflow: hidden;white-space: nowrap;text-overflow: ellipsis;`。
  - 多行省略号怎么写？`overflow: hidden;white-space: normal;text-overflow: ellipsis;word-break: break-all;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;line-height: 18px;max-height: 36px;`。
  - 怎么解决`display: flex;`会让自身容器中文字单行省略号失效的问题？`给文字外再套一层父级`。
  - 怎么解决父级设置`flex: 1;`导致子级的单行省略号失效的问题？`给子级设置width或max-width | 子级使用多行省略号模拟单行省略号 | 父级加overflow: hidden; | 父级加min-width: 0;`。注：`给子级再套一层父级行不通`。
* css怎么画实心右箭头？`width: 0;height: 0;border: 10px solid transparent;border-left-color: #000;`。
* css怎么画空心右箭头？`width: 10px;height: 10px;border-top: 2px solid #000;border-right: 2px solid #000;transform: rotate(45deg);`。
* 如何给一个div加0.5px的边框？`主要知识点是absolute各方位-50%;transform: scale(0.5);pointer-events: none;`。
  - 怎么使用css让js的点击事件失效？`pointer-events: none;`。
* 不定宽高如何让盒子垂直水平居中？用定位如何实现？用flex如何实现？`主要考内联元素和块元素的水平居中和垂直居中`。
* 如何让兄弟盒子上下margin不重叠？`给子级设置display: inline-block;或者display: inline-flex;或者float: left;都可以解决。或者给父级加display: flex;flex-wrap: wrap;子级的上下margin就不会折叠了`。
* 如何移除内联块之间的间隙？`布局时标签之间不加换行 | 用html注释连接换行 | 给父级加font-size: 0;`。
* 消除图片底部间隙的方法？`display: block; | vertical-align: top/bottom/text-top/text-bottom/middle; | 给父级加line-height: 0; | 给父级加font-size: 0;`。
* 如何让margin-top和margin-bottom不穿透父级？`触发BFC即可`。
  - 如何触发BFC？`html根元素或包含html根元素的元素 | float属性不为none | position为absolute或fixed | display为inline-block、table-cell、table-caption、flex、inline-flex | overflow不为visible`。
  - BFC的特性？`同一个BFC内子元素上下margin不会穿透父级、同一个BFC内子元素上下margin会发生折叠、BFC可以包含浮动的元素（可用来清除浮动）、BFC可以阻止元素被浮动元素覆盖（可用来清除文字环绕现象）`。
#### scss？
* 如何定义变量？`$color: #f00;`。
  - 如何使用变量？`color: $color;`。
* 如何定义函数？`@function px2upx($px, $psdW:375) { @return $px * math.div(750, $psdW) + upx; }`。
  - 如何使用函数？`width: px2upx(100);`。
* 如何定义mixin？`@mixin ellipsis1() { overflow: hidden;white-space: nowrap;text-overflow: ellipsis; }`。
  - 如何使用mixin？`@include ellipsis1();`。

## js
#### 数据类型？
* js有哪些数据类型？`7种原始类型数据Boolean、Number、String、null、undefined、Symbol、BigInt和1种复合类型数据Object`。
* typeof有哪些返回值？`'boolean'、'number'、'string'、'object'、'undefined'、'symbol'、'bigint'、'function'`。
  - `typeof []`和`typeof /a/`和`typeof new Date()`会返回什么？`'object'`。
  - 使用什么方法可以区分它们？`Object.prototype.toString.call`。
  - 自定义的类或者构造函数，其实例如果使用`Object.prototype.toString.call`进行检测，会返回什么结果？`'[object Object]'`。
  - 自定义的类或者构造函数，需要怎么处理才能被`Object.prototype.toString.call`区分？`this[Symbol.toStringTag] = 'CustomClassName'`。
#### 数字常用方法？
* 数字转成字符串并保留两位小数？`(Math.floor(parseFloat(10.2) * 1000/10) / 100).toFixed(2)`。`1变成'1.00'`。`10.2变成'10.20'`。`19.9变成'19.90'`。
* 字符串`'1.00'变成'1'`。`'10.20'变成'10.2'`。`'19.90'变成'19.9'`？`String(Number('10.20'))`。
* 生成4到6的随机数？`Math.round(Math.random() * (6 - 4) + 4)`。
#### 字符串常用方法？
* 字符串转大小写？`toUpperCase、toLowerCase`。
* 字符串查找？`[index]、charAt、charCodeAt、search(可以是正则)、indexOf、lastIndexOf、includes`。
  - 如何检测`某个字符`在`一串字符串`中是否重复出现了？`indexOf和lastIndexOf的结果如果一致则未出现重复`。
* 字符串截取？`slice、substr、substring`。
* 字符串替换？`replace(可以是正则)`。
* 字符串匹配？`match(可以是正则)`。
  - 字符串的match方法和正则的exec方法在什么情况下返回的数据是一致的？`非全局匹配的情况下字符串的match方法和正则的exec方法返回的数据是一致的`。
* 字符串去除首尾空格？`trim`。
* 把字符串切割成数组？`split`。
#### 数组常用方法？
* 把数组拼接成字符串？`join`。
* 数组查找？`[index]、find、findIndex、indexOf、lastIndexOf、includes`。
* 数组增删？`push、pop、unshift、shift、splice`。
* 数组截取？`slice（不会改变原数组）、splice（会改变原数组）`。
* 数组排序？`sort`。
  - 根据id属性对数组中的对象进行从大到小排序（id属性的值是数字且唯一）？`[{ id: 1 }, { id: 3 }, { id: 2 }].sort((a, b) => (b.id - a.id))`。
* 数组逆序？`reverse`。
* 数组扁平化？`[[1], [2, [3]]].flat(2)`。
* 数组拼接？`concat`。
* 数组去重？`[...new Set([1, 2, 2, 3])]`。
* filter和map的区别？`前者返回满足条件的项。后者返回被处理后的项。二者全是返回新数组`。
* some和every的区别？`前者只需某项满足条件就会返回true。后者需要全部项满足条件才会返回true`。
* 数组转对象用reduce怎么实现？`['a', 'b'].reduce((r, v, i, a) => ({ ...r, [i]: v }), {})`。
* 类数组转数组？
```javascript
console.log(Array.from({length: 10})) // 转出来的不是稀疏数组
console.log(Array.apply(Array, {length: 10})) // 转出来的不是稀疏数组
console.log(Array.prototype.slice.call({length: 10})) // 转出来的是稀疏数组
```
* 创建稀疏数组？
```javascript
console.log([1, , , , , , , , , 10])
console.log(Array.prototype.slice.call({length: 10}))
```
* 稀疏数组使用`forEach、filter、map`方法处理时会怎么处理稀疏项？`forEach和filter会无视稀疏项。map循环时会无视稀疏项但是会原封不动的返回稀疏项`。
* 稀疏数组怎么转密集数组？
```javascript
console.log(Array.from(Array(10)))
console.log(Array.apply(null, Array(10)))
console.log(Array.call(null, ...Array(10)))
console.log([...Array(10)])
console.log(Array(10).fill())
```
* 稀疏数组压缩？`filter`。
* 有哪些方法可以判断一个值是否是数组？
```javascript
console.log([].__proto__.constructor.name)
console.log(Object.getPrototypeOf([]).constructor.name)
console.log(Object.prototype.toString.call([]))
console.log(Array.isArray([])) // 内部是使用Object.prototype.toString.call实现的
console.log([] instanceof Array) // 无法检测出使用iframe内部环境创建出的数组
```
#### `===` 与 `==` 的区别？`前者不会进行隐式类型转换。后者会进行隐式类型转换`。
* `undefined == null`？`true`。
* `undefined === null`？`false`。
* `undefined`和`null`的区别？
```javascript
// 定义一个变量不赋值则这个变量就是undefined。
// 而null是一个具体存在的值，值的本身就是null。
// undefined值是派生自null值
// JSON序列化时会忽略undefined
console.log(JSON.stringify({ a: undefined })) // '{}'
console.log(JSON.stringify({ a: null })) // '{"a":null}'
```
* `NaN == NaN`？`false`。为什么？`NaN不和任何值相等（包括它本身）`。
* `[] == ![]`？`true`。为什么？`前者先转成字符串后转成数字0。后者先转成false后转成数字0`。
* 隐式类型转换会把数据转成原始类型数据，其流程是怎样的？
  - 隐式类型转换时，会优先调用valueOf方法，把数据转换成原始类型数据。
  - 如果转换后依然不是原始类型数据，会再调用toString方法进行转换。
  - 除了日期类，日期类只使用toString转换。
#### 常用运算符优先级？
* `console.log(typeof 0 == '')`？`false`。
* `console.log(typeof 0 == false)`？`false`。
* `console.log(typeof 0 ? 'a' : 'b')`？`'a'`。
* `console.log(0 == '' ? 'a' : 'b')`？`'a'`。
* `typeof`和`==`和`?:`的优先级排序？`typeof`优先于`==`优先于`?:`。
* 当无法确定优先级时怎么做可以把优先级提到最高？`加圆括号`。`以上述为例，也可以选择换行写，因为代码的执行顺序是从上到下，从左到右`。
#### 如果两个对象存在引用关系？
* 修改其中一个对象的属性，另外一个对象的属性会怎样？`另外一个对象的属性会跟着改变`。
* 属性改变后，使用双等号进行比较时，会返回什么结果？`true`。
* 怎么断开两个对象的引用关系？`浅拷贝 | 深拷贝 | JSON.stringify配合JSON.parse`。
  - 什么是浅拷贝？`只拷贝1层`。
  - 什么是深拷贝？`有多少层就拷贝多少层`。
  - `Object.assign`是浅拷贝还是深拷贝？`浅拷贝`。
#### 正则？
* 匹配英文？`/[a-z][A-Z]/`。
* 匹配数字？`/\d/`。
* 匹配英文数字下划线？`/\w/`。
* 匹配1开头的11位数字？`/^1\d{10}$/`。
* 什么是正则的贪婪匹配和非贪婪匹配？默认是什么匹配？
  - 贪婪匹配是指`整个表达式匹配成功的前提下，会尽可能多的匹配`。
  - 非贪婪匹配是指`整个表达式匹配成功的前提下，会尽可能少的匹配`。
  - 默认是`贪婪匹配`。
  - 匹配style标签及其内容？`/<style[^>]*>[\d\D]*?<\/style>/g`。
* 什么是正则的捕获分组和非捕获分组？
  - 捕获分组是`(exp)`。
  - 非捕获分组是`(?:exp)`。
* 什么是正则的正向前瞻匹配和负向前瞻匹配？`/bc(?=d)/.test('bcd')`。`(?=d)只能放在最后面`。
  - `(?=exp)` 正向前瞻 匹配后面满足表达式exp的位置
  - `(?!exp)` 负向前瞻 匹配后面不满足表达式exp的位置
  - js支持前瞻匹配么？`支持`。
* 什么是正则的正向后瞻匹配和负向后瞻匹配？
  - `(?<=exp)` 正向后瞻 匹配前面满足表达式exp的位置
  - `(?<!exp)` 负向后瞻 匹配前面不满足表达式exp的位置
  - js支持后瞻匹配么？`不支持`。
* 金钱格式化？`'100000000'变成'100,000,000'`。
  - 使用正则：`'100000000'.replace(/(?!\b)(?=(\d{3})+$)/g, ',') // '100,000,000'`。
  - 转成数组：切割成数组、逆序、循环、i用3取模结果为2且i非末位则插入到新数组、对新数组进行逆序并拼接成字符串。
  ```javascript
  function moneyFormat (money = '100000000') {
    const r = []
    const a = money.split('')
    a.reverse().forEach((v, i) => {
      r.push(v)
      if (i % 3 === 2 && i !== a.length - 1) r.push(',')
    })
    return r.reverse().join('')
  }

  moneyFormat()
  ```
#### 类
* 声明一个类？`class A {}`。
* 继承一个类？`class B extends A {}`。
  - 用es5怎么实现？
  ```javascript
  function A () {
  }

  function B () {
    A.call(this)
  }

  B.prototype.__proto__ = A.prototype
  B.__proto__ = A
  ```
  - 怎么知道B继承的谁？`Object.getPrototypeOf(B).name`等同于`B.__proto__.name`。
  - 怎么知道B的实例对应的类是B？`Object.getPrototypeOf(new B()).constructor.name`等同于`new B().__proto__.constructor.name`。
* 什么是原型链？`__proto__`。
* Object.create有什么作用？`Object.create()方法创建一个新对象并使用现有对象来提供新对象的__proto__`。
#### new
* 通过new的方式创建对象和通过字面量创建对象有什么区别？`字面量创建对象，不会调用构造函数，简洁且性能更好`。
* new操作符具体干了什么？
  - 1、创建一个新的空对象。
  - 2、将新对象的__proto__指向构造函数的prototype。
  - 3、将构造函数内的this指向新对象并执行构造函数用以给新对象赋值。
  - 4、如果构造函数没有返回引用类型的数据则返回这个新对象。
#### 作用域？
* 什么是变量的作用域？`变量的作用域是可以访问该变量的代码域`。
* 什么是变量的作用域链？`先在当前作用域中查找某个变量，如果没有找到则去上级作用域中进行查找，依次类推，形成作用域链`。
#### 预解析？
* 用`var`声明的变量会被预解析么？`会被预解析（变量提升）`。
  - 什么是变量预解析？`变量预解析会把变量的声明提升到当前作用域的最前面`。
* 用`function`声明的函数会被预解析么？`会被预解析（函数提升）`。
* 用`let`和`const`声明的变量会被预解析么？`不会被预解析`。
  - 什么是暂时性死区？`使用let和const声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区`。
* 预解析的权重？`函数 > 形参 > 变量`。
#### 闭包？
* 什么是闭包？`闭包就是能够读取其他函数内部变量的函数`。
* 为什么要使用闭包？`因为闭包可以防止全局变量污染、可以访问其他函数内部的变量、可以用私有变量模拟私有属性、可以用私有函数模拟私有方法`。
* 下述循环会打印什么？`5个5`。
  - 示例如下：
  ```javascript
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, 0)
  }
  ```
  - 如何才能打印0到4？
    - 方案1：闭包
    - 方案2：setTimeout第三入参
    - 方案3：var换成let
#### this？
* this指向受什么影响？`受调用者影响谁调用则指向谁`。
* call和apply以及bind的区别？`call和apply入参形式不同、bind返回一个新函数`。
  - 取数组最大值？
  ```javascript
  console.log(Math.max.apply(null, [14, 3, 77, 30]))
  console.log(Math.max(...[14, 3, 77, 30]))
  console.log([14, 3, 77, 30].sort((a, b) => (b - a))[0])
  ```
* 箭头函数和普通函数的区别？
  - 箭头函数不会更改this的指向。
  - 箭头函数中的this不受call、apply和bind影响。
  - 箭头函数不能使用new。
  - 箭头函数不能使用arguments。
  - 箭头函数没有原型属性。
#### 单线程？
* setTimeout倒计时为什么会出现误差？`因为js是单线程，优先执行同步逻辑，等线程空闲才会执行异步逻辑`。
#### 宏任务与微任务？
* 常用的宏任务？`script、setTimeout、setInterval、requestAnimationFrame`。
* 常用的微任务？`Promise.then、Promise.catch、Promise.finally`。
* 宏任务与微任务的执行顺序？`先执行第一个宏任务script，执行期间遇到微任务则放入微任务队列，遇到宏任务则放入宏任务队列。当前宏任务执行完毕，则清理微任务，微任务清理完毕则继续执行下一个宏任务，依次类推`。
#### 应用？
* 什么是函数去抖？`让一个函数在一定间隔内没有被调用时，才开始执行被调用的方法`。
* 什么是函数节流？`让一个函数无法在很短的时间间隔内连续被调用，当上一次函数执行后过了规定的时间间隔，才能进行下一次该函数的调用`。
* 5的阶乘用递归怎么实现？`fn(5)`。
```javascript
function fn (n) {
  return n < 1 ? 1 : n * fn(n - 1)
}

fn(5) // 120
```
* 5的阶乘用尾递归怎么实现？`fn(5, 1)`。
```javascript
function fn(n, total = 1) {
  if (n === 1) return total
  return fn(n - 1, n * total)
}

fn(5, 1) // 120
```
#### dom？
* 什么是事件冒泡？`事件由子元素传递到父元素的过程`。
* 什么是事件捕获？`事件由父元素传递到子元素的过程`。
* 什么是事件委托？`事件委托是对事件冒泡的一种应用，只需要把原本绑定在子元素上的事件绑定到父元素上，然后在父元素的事件监听中进行行为的处理即可`。
* 怎么阻止事件冒泡？`ev.stopPropagation()`。
* 怎么阻止事件的默认行为？`ev.preventDefault()`。
#### bom？
* cookie和sessionStorage以及localStorage的区别？
  - 存储大小：cookie数据大小不能超过4k。后两者均至少可以存储4M。
  - 存储时间：cookie可以设置有效期。sessionStorage关闭窗口就没了。localStorage永久存储。
  - 跨域行为：设置cookie时可以使用domain跨子域（`document.cookie='a=1; domain=.baidu.com'`）。后两者不可以跨子域。
  - 请求携带：不跨域的情况下，发送请求的时候默认会携带cookie（跨子域默认只会携带domain满足规则的cookie）。后两者不会被携带。
    - 请求跨主域了怎么携带cookie？前端设置`xhr`的`withCredentials`属性为`true`。后端设置响应头`Access-Control-Allow-Credentials`为`true`。
    - 前端跨主域怎么设置cookie？例如A网站怎么给B网站设置cookie？`iframe配合postMessage`。
  - 获取行为：通过响应头设置cookie时，如果设置了HttpOnly，则js无法获取到此条cookie。后两者无此特性。
    - 通过响应头设置cookie时附加什么属性可以使某条cookie不能被js获取到？`HttpOnly`。
* canvas创建的图形和svg创建的图形有什么区别？`位图和矢量图`。
* 上传的文件怎么转base64格式？`FileReader`。
#### es6？
* 解构赋值实现变量交换？
```javascript
let a = 1
let b = 2
;[b, a] = [a, b]
console.log(a, b)
```
* 字符串模板怎么使用？
```javascript
const content = 'hello world'
const html = `<div>${content}</div>`
console.log(html)
```
* 箭头函数的实参个数不确定时，怎么使用形参接收到全部实参？`使用扩展运算符（...）`。`箭头函数不能使用arguments`。
```javascript
function fn1 (...args) {
  console.log(...args)
}

fn1(1, 2, 3)
```
* 模块导出？`a.js`。`export default {}`。
* 模块导入？`b.js`。`import a from 'a.js'`。
#### Promise和async以及await？
* Promise的三种状态？`pending、fulfiled、rejected`。
* `new Promise`怎么触发`then`？使用`resolve()`触发。
* `new Promise`怎么触发`catch`？使用`reject()`触发。
* `new Promise`怎么触发`finally`？使用`resolve()`或`reject()`都会触发。
* Promise.all的特性？`所有Promise都触发了resolve则走then，只要有一个Promise触发了reject则走catch`。
* 使用async定义的函数，其返回值是什么？`Promise对象`。
* await的返回值是什么？`await返回Promise对象的处理结果。如果等待的不是Promise对象，则返回该值本身`。

## 网站安全？
* 什么是XSS攻击？`跨站脚本攻击`。
  - 怎么预防XSS攻击？`转义字符`。
* 什么是CSRF攻击？`跨站请求伪造`。
  - 怎么预防CSRF攻击？`referer/csrftoken/jwt`。
* iframe钓鱼网站原理？`当你点击iframe中内容的时候，会先触发iframe的click事件`。
  - 怎么预防iframe钓鱼？`iframe防嵌套`。

## http？
* 常见状态码？`101 200 301 302 304 307 308 400 401 403 404 405 413 429 500 502 504`。
* 常用请求方式？`POST DELETE PUT PATCH GET OPTIONS`。
  - GET和POST区别？
    - GET是从服务器上获取数据，POST是向服务器传送数据。
    - GET数据在`Request URL`中，POST数据在`请求体`中。
  - GET的请求头中有Content-Type么？`无`。
* 什么是CDN？有什么特性？`CDN是内容分发网络。会就近找服务器读取被缓存的资源，提高访问速度`。
  - 使用CDN时，如果某个静态资源已被就近的服务器缓存，此时怎么对这个静态资源进行更新？
    - 访问静态资源时手动加个版本号，使之进行溯源。
    - 给静态资源换个名字，然后访问新的静态资源，就近服务器没这个新的静态资源的缓存，则会自动进行溯源。
    - 使用CDN官方提供的清理工具，进行缓存清理，下次访问时会自动进行溯源。
  - 响应头中的`Cache-Control`可以用来干啥？`可以用来做强缓存`。
* 浏览器怎么识别一张图片是被预览还是被下载？
  - 响应头中`Content-Type`的值为`application/octet-stream`会触发下载行为。
  - 响应头中`Content-Type`的值为`image/gif`、`image/jpeg`、`image/png`等图片类型时会触发预览行为。
* 请求头中的Content-Type？
  - 使用form表单的submit提交POST请求时请求头中的Content-Type是什么？`application/x-www-form-urlencoded`。
  - 图片上传时请求头中的Content-Type是什么？`multipart/form-data`。
  - 使用xhr发送json数据时Content-Type应该设置为什么？`application/json`。

## 工作流？
* git常用命令？`clone、pull、add、commit、tag、push、branch、checkout、reset --hard、log、reflog、stash、stash pop`。
* 字体图标用过么？用的哪家的字体图标？`用过。用的阿里字体图标`。
* 你工作中是怎么解决接口跨域问题的？`jsonp(仅支持GET)、服务端代理、服务端允许跨域`。
  - 什么原因导致的接口跨域？`域名不同 | 端口不同 | 协议不同`。
  - 操作主域相同子域不同的iframe中的对象时会报跨域，应该怎么解决？
    - 设置`document.domain`为顶级域名。
    - `Chrome 101`版本之后，响应头里还需要增加`Origin-Agent-Cluster: ?0`。
  - iframe怎么跨主域通信？使用`postMessage`通信。
* 你工作中上传文件走的是怎样的流程？`直接传到七牛云`。
  - 七牛云有用过么？`用过`。
  - 使用七牛云上传文件时流程是怎样的？`先打后端接口获取七牛云的token，再调七牛云的上传文件接口`。
* 接口的错误处理你是怎么做的？`统一处理`。
* 对接口响应的数据你是怎么做二次处理的？`二次封装`。
* 平常遇到问题都是怎么解决的？`去社区找答案或者百度谷歌找答案`。

## vue3？
* vue的生命周期有哪些？`beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、activated、deactivated、beforeUnmount、unmounted`。
* vue的父子组件通信是怎么通信的？`父传子使用props、子传父使用$emit`。
* v-if和v-show有什么区别？`v-if是添加和删除dom、v-show是显示和隐藏dom`。
* key的作用？`防止Vue对DOM的就地复用，让DOM具有唯一性`。
* $nextTick的作用？`将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新`。
* 如何让CSS只在当前组件中起作用？`给style标签加scoped属性`。
  - 在style标签加scoped属性的场景下，在父组件中怎么修改子组件的样式？`.parentClassName :deep(.childClassName) {}`。
* 计算属性和methods的区别？`计算属性有缓存，只会在相关响应式依赖发生改变时重新求值。如果你不希望有缓存，请用方法来替代`。
* 计算属性和watch的区别？`watch选项允许我们执行异步操作（例如访问某个api），并设置一个执行该操作的条件。这些都是计算属性无法做到的`。
* vue的单向数据流是指什么？`单项数据流是指所有的prop都使得其父子prop之间形成了一个单向下行绑定。父级prop的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解`。
* vue的双向数据绑定是指什么？`双向数据绑定v-model是语法糖，本质还是单项数据流`。
* vue是怎么实现数据响应式更新的？
  - vue2使用Object.defineProperty对数据进行拦截，Object.defineProperty只能拦截对象的属性。
  - vue3使用Proxy对数据进行拦截，Proxy可以拦截整个对象。使用Reflect把this绑定到Proxy的实例。

## vue-router？
* hash模式用的什么api监听的路由变化？`window.onhashchange`。
* history模式用的什么api监听的路由变化？`window.onpopstate`。
* 如何鉴权？例如不允许某些用户访问某些页面？`在router.beforeEach中进行处理即可`。
* 两个路由共用同一个页面视图组件的时候怎么监听路由的变化？`使用watch监听$route`。
* 用户离开表单页面时怎么让用户二次确认后才允许离开？`使用组件内守卫beforeRouteLeave`。

## vuex？
* Mutation和Action的区别？`Mutation只能进行同步操作`。`Action可以进行异步操作`。
* 怎么提交Mutation？`store.commit`。
* 怎么分发Action？`store.dispatch`。

## 微信小程序？
* App的生命周期？`onLaunch、onShow、onHide`。
  - 小程序脚本错误或API调用报错用什么进行监听？`onError`或`wx.onError`。
  - 小程序要打开的页面如果不存在用什么进行监听？`onPageNotFound`。
  - 怎么监听路由变化？`wx.onAppRoute`。
* 页面的生命周期？`onLoad、onShow、onReady、onHide、onUnload`。
  - 如何开启下拉刷新功能？`"enablePullDownRefresh": true`。`onPullDownRefresh`。
  - 如何监听上拉触底？`onReachBottom`。
  - 如何开启右上角三个点转发卡片给好友的功能？`onShareAppMessage`。
* 组件的生命周期？`created、attached、ready、detached`。
  - 怎么监听数据的变化？`observers`。
* 微信小程序的父子组件通信是怎么通信的？`父传子使用properties，子传父使用triggerEvent`。
* 微信小程序跳转方式有哪些？`wx.switchTab、wx.reLaunch、wx.redirectTo、wx.navigateTo、wx.navigateBack`。
* 服务器域名配置中的`request合法域名`是用来干什么的？`配置request合法域名后，才可以正常的使用wx.request接口`。
* 服务器域名配置中的`socket合法域名`是用来干什么的？`配置socket合法域名后，才可以正常的使用wx.connectSocket接口`。
* 服务器域名配置中的`uploadFile合法域名`是用来干什么的？`配置uploadFile合法域名后，才可以正常的使用wx.uploadFile接口`。
* 服务器域名配置中的`downloadFile合法域名`是用来干什么的？`配置downloadFile合法域名，才可以正常的使用wx.downloadFile和wx.getImageInfo接口`。
* `业务域名`的配置是用来干什么的？`配置业务域名后，才可以正常的使用web-view组件`。
* scene长度超出了32位怎么解决？`存数据库`。
* 怎么防止微信小程序的包大小超过2M？`使用分包、使用OSS存储图片和视频`。
* 小程序遇到问题应该去哪里寻求帮助？`小程序社区`。
