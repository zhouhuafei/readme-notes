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
  - 多行省略号怎么写？`单行省略号` + `word-break: break-all;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;line-height: 18px;max-height: 36px;`。
  - 怎么解决`display: flex;`会让自身容器中文字单行省略号失效的问题？`给文字外再套一层父级`。
  - 怎么解决父级设置`flex: 1;`导致子级的单行省略号失效的问题？`给子级设置width或max-width | 子级使用多行省略号模拟单行省略号 | 父级加overflow: hidden; | 父级加min-width: 0;`。注：`给子级再套一层父级行不通`。
* css怎么画实心右箭头？`width: 0;height: 0;border: 10px solid transparent;border-left-color: #000;`。
* css怎么画空心右箭头？`width: 10px;height: 10px;border-top: 2px solid #000;border-right: 2px solid #000;transform: rotate(45deg);`。
* 如何给一个div加0.5px的边框？`主要知识点是absolute各方位-50%;transform: scale(0.5);pointer-events: none;`。
  - 怎么使用css让js的点击事件失效？`pointer-events: none;`。
* 不定宽高如何让盒子垂直水平居中？用定位如何实现？用flex如何实现？`主要考内联元素和块元素的水平居中和垂直居中`。
* 如何让兄弟盒子上下margin不重叠？`给子级设置display: inline-block;或者display: inline-flex;或者float: left;都可以解决。或者给父级加display: flex;flex-wrap: wrap;子级的上下margin就不会折叠了`。
* 如何移除内联块之间的间隙？`布局时标签之间不加换行 | 用html注释连接换行 | 给父级加font-size: 0;`。
* 消除图片底部间隙的方法？`vertical-align: top/bottom/text-top/text-bottom/middle; | 给父级加line-height: 0; | 给父级加font-size: 0; | display: block;`。
* 如何让margin-top和margin-bottom不穿透父级？`触发BFC即可`。
  - 如何触发BFC？`html根元素或包含html根元素的元素 | float属性不为none | position为absolute或fixed | display为inline-block、table-cell、table-caption、flex、inline-flex | overflow不为visible`。
  - BFC的特性？`同一个BFC内子元素上下margin不会穿透父级、同一个BFC内子元素上下margin会发生折叠、BFC可以包含浮动的元素（可用来清除浮动）、BFC可以阻止元素被浮动元素覆盖（可用来清除文字环绕现象）`。
#### scss？
* 如何定义变量？`$color: #f00;`。
* 如何定义函数？`@function px2upx($px, $psdW:375) { @return $px * math.div(750, $psdW) + upx; }`。
* 如何定义mixin？`@mixin ellipsis1() { overflow: hidden;white-space: nowrap;text-overflow: ellipsis; }`。

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
#### dom？...TODO
* 事件冒泡和事件捕获?
* 怎么阻止事件冒泡和事件的默认行为？
* 事件委托？
#### bom？
#### es6
* 解构赋值？实现变量交换。
* 字符串模板？
* 扩展运算符？用在函数的入参里？用在对象上？
* 模块？导出和导入？
* 类？原型如何实现继承？Class 如何实现继承？Class 本质是什么？
#### Promise和async以及await
* Promise是怎么使用的？使用Promise实现串行和并行？
* async和await怎么使用？
* 使用async定义的函数的返回值？await的返回值？
* async内多个await如何并行请求？
#### 应用
* 写一个简单校验手机号的正则？`/^1\d{10}$/`。
* 写一个1-3的随机数？`Math.round(Math.random() * (3 - 1)) + 1`。
* `['1', '2', '3'].map(parseInt)` 答案是多少？`[1, NaN, NaN]`。
* 5的阶乘？用递归怎么实现？`fn(5)`
```
function fn (n) {
  return n < 1 ? 1 : n * fn(n - 1)
}

fn(5) // 120
```
* 5的阶乘？用尾递归怎么实现？`fn(5, 1)`
```
function fn(n, total = 1) {
  if (n === 1) return total
  return fn(n - 1, n * total)
}

fn(5) // 120
```
* 1+2+...+100？用递归怎么实现？`fn1(1, 100)`
```
function fn1 (n1, n2) {
  return n1 === n2 ? n2 : n1 + fn1(n1 + 1, n2)
}

fn1(1, 100)
```

## html5
* canvas和svg图形的区别是什么？`位图和矢量图`。
* 上传的文件怎么转base64格式？`FileReader`。

## cookie
* 请描述一下 cookies，sessionStorage 和 localStorage 的区别？
* cookie的基础格式？`a=1; b=2`。
* 怎么新增cookie？`document.cookie='a=1; domain=.baidu.com'`。
* 设置cookie时怎么让cookie可以跨子域？`document.cookie='a=1; domain=.baidu.com'`。
* 请求跨主域了，默认会携带cookie么？`不会`。
* 请求跨主域了怎么携带cookie？`xhr.withCredentials = true`。
* 前端跨主域怎么设置cookie？例如A网站怎么给B网站设置cookie？`iframe postMessage`。
* 服务端设置什么属性可以使某条cookie不能被js获取到？`httpOnly`。

## 网站安全
* XSS是什么？怎么预防？
* CSRF是什么？怎么预防？
* iframe钓鱼网站原理？怎么预防？

## vue
* v-if 和 v-show 有什么区别?
* v-for与v-if当它们处于同一节点的优先级？`v-for 具有比 v-if 更高的优先级`。
* 如何将原生事件绑定到组件？`.native、$listeners`。
* Vue 组件中 data 为什么必须是函数？`当 data 的值是一个对象时，它会在这个组件的所有实例之间共享`。
* vue怎么通过索引更新数组并触发视图更新？`Vue.set或this.$set`。
* $nextTick 的作用？`在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM`。
* 如何让 CSS 只在当前组件中起作用？`scoped`。
* 在加了scoped的场景下，在父组件中怎么更新子组件的样式？`::v-deep`。`或者style无scoped配合独立class进行修改`。
* key的作用？`防止Vue对DOM的就地复用，让DOM具有唯一性`。
* vue生命周期钩子函数有哪些？
* .sync修饰符？
* 父子组件通信？
* vue的单向数据流和双向数据绑定？
```
1、单项数据流是指所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定。父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
2、双向数据绑定v-model是语法糖，本质还是单项数据流。
```
* v-model是什么的简写？自定义组件怎么使用v-model？
* 计算属性和methods的区别？https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95 `计算属性是基于它们的响应式依赖进行缓存的。如果你不希望有缓存，请用方法来替代。`
* 计算属性和watch的区别？https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7 `watch 允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。`
* vue是怎么实现数据响应式更新的？`Object.defineProperty set get`。
* 对于vue是一套渐进式框架的理解？
* 对于MVVM的理解？

## vue-router
* vue-router 跳转和 location.href 有什么区别？
* vue-router 如何监听 路由参数 的变化？
* vue-router 如何实现路由懒加载？
* vue-router 如何定义嵌套路由？
* vue-router 动态路由匹配以及使用？
* vue-router 表单页面点了回退怎么给予用户表单还未保存是否确定退出的提示并阻止用户离开？`使用组件内守卫：beforeRouteLeave`。
* vue-router 如何实现权限拦截？

## vuex
* vuex是什么？怎么使用？哪种功能场景使用它？

## mini program
* 常用组件有哪些？`view、text、cover-view、scroll-view、navigator、swiper、swiper-item、picker、button、input、form、canvas`。
* 常用api有哪些？`wx.getUserInfo、wx.showToast、wx.showModal、wx.showLoading、getStorageSync、wx.previewImage、wx.openLocation`。
* 跳转方式？`wx.switchTab、wx.reLaunch、wx.redirectTo、wx.navigateTo、wx.navigateBack`。
* 事件怎么传递数据？`e.currentTarget.dataset`。
* 小程序页面间有哪些传递数据的方法？`query、setStorageSync`。
* 如何实现下拉刷新? `"enablePullDownRefresh": true`。`onPullDownRefresh`。
* 小程序的生命周期有哪些？`onLoad、 onShow、 onReady、onHide、onUnload`。
* 分包怎么使用？`配置 app.json的subpackages`。
* 小程序生成某个页面二维码的前提是？`不需要前提，官方支持对尚未发布的小程序以及不存在的页面进行二维码的生成`。
* 小程序生成的页面二维码，扫码能跳开发版或者体验版的小程序么？`能`。
* 怎么在开发阶段保证二维码能正常生成？`官方支持直接生成，如果后端接口不支持，就做个scene中转页`。
* 怎么本地模拟二维码扫码进入？`模拟器里进行数据模拟或使用模拟器进行二维码识别`。
* scene超出32位怎么解决？`存数据库`。
* 怎么兼容解析二维码参数和query参数？`页面数据接收时进行合并 或 路径参数生成时保证页面转发的数据和页面二维码的数据格式一致`。
* 小程序如何瘦身？图片太多太大，占用小程序大小，怎么处理？`CDN`。
* 有没有以第三方平台的身份开发过小程序？`SaaS`。
* extAppid和appid的区别？`前者是租户的appid，后者是第三方平台授权用以开发的小程序`。
* canvas绘图时，模拟器上正常，真机上不行，问题可能出在哪？`下载域名没配置`。`request合法域名、socket合法域名、uploadFile合法域名、downloadFile合法域名`。
* 小程序遇到问题第一时间应该去哪里寻求帮助？`小程序社区`。

## git
* 常用命令？`add、commit、push、pull、checkout、reset --hard`。

## http
* 常见状态码？`101 200 301 302 304 307 308 400 401 403 404 405 413 429 500 502 504`。
* 常用请求方式？`POST DELETE PUT PATCH GET OPTIONS`。
* Cache-Control是干啥的？`强缓存`。
* 怎么防止缓存？`文件加版本号或加md5`。
* 什么是CDN，有什么特性？`内容分发网络，会就近找服务器读取被缓存的资源，提高访问速度`。
* 客户端根据什么识别一张图片应该被预览还是被下载？`Content-Type`。

## 工作流
* 阿里字体图标有用过么？
* 你们是怎么解决接口跨域问题的？`主域：代理、jsonp(仅支持GET)、postMessage`。`子域：document.domain`。`还是服务端解决最为稳妥`。
* 你们前后端接口通信使用的什么数据格式？图片上传一般是以什么格式上传？get的请求头中有Content-Type么？
```
application/x-www-form-urlencoded
application/json
multipart/form-data
```
* 你工作中上传文件走的是怎样的流程？七牛云有用过么？使用七牛云上传文件时流程是怎样的？
* 接口的错误处理你是怎么做的？
* 对接口响应的数据，你是怎么做二次处理的？
* 平常遇到问题都是怎么解决的？`去社区找答案或者百度谷歌找答案`。
