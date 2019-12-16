[TOC]

> 出面试题。待续...

# html
* 简述一下你对HTML语义化的理解？`对seo友好，结构清晰，便于阅读`。

# css
### 选择器
* css选择器优先级？`id选择器 > class选择器 > 标签选择器`。
* 选择器`+`和`~`以及`>`的区别？`相邻兄弟选择器，兄弟选择器，直属子元素选择器`。
* nth-of-type和nth-child的区别？`前者选指定类型的第几个元素，后者选第几个元素`。
### 盒模型
* 标准盒模型包含哪些属性？标准盒模型和怪异盒模型的区别？`margin、padding、border、width、height。标准盒模型的border和padding会撑大width和height`。
* box-sizing:border-box的特性？`border和padding不会撑大width和height`。
### 过渡和动画
* 如果加过渡效果？`transition`。
* 如果定义动画？`@keyframes`。
### 单位
* px，%, em，rem, vw, vh的区别。`px是基础单位，%是百分比，em大小相对于父节点，rem大小和html的font-size有关，vw和vh相对于视口宽高`。
* 1rem等于多少px？rem和px的转换关系受什么影响？`默认16，受html的font-size影响`。
* 移动端适配方案？`rem` + `<meta name="viewport" content="width=device-width,initial-scale=1.0">`。
### 应用
* 单行省略号怎么写？多行省略号有无使用过？
* css怎么画实心右箭头？
* css怎么画空心右箭头？
* 如何给一个div加0.5px的边框？
* 不定宽高如何让盒子垂直水平居中？用定位如何实现？用flex如果实现？
* 如果让兄弟盒子上下margin不重叠？`给子级设置display:inline-block或者display:inline-flex或者float为left都可以解决。或者给父级加display:flex;flex-wrap:wrap;子级的上下margin就不会折叠了`。
* `display:inline-block`移除间隙？`移除html标签间空格、使用font-size:0、letter-spacing、word-spacing、使用margin负值`。
* 消除图片底部间隙的方法？`vertical-align:bottom、line-height:0、font-size:0、display:block`。
* 如果让margin-top和margin-bottom不穿透父级？`触发BFC即可`。
* 如何触发BFC？`html根元素或包含html根元素的元素、float属性不为none、position为absolute或fixed、display为inline-block, table-cell, table-caption, flex, inline-flex、overflow不为visible`。
* CSS隐藏元素的几种方式及区别？`display:none,visibility:none,opacity:0,position,transform`。
### scss
* 如何定义变量？`$color: #f00;`
* 如果定义函数？`@function fn() { @return 123;}`
* 如果定义mixin？`@mixin ellipsis1() {overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}`

# js
### es5
* js有哪些数据类型？
  - 7种原始数据类型：`Boolean、Null、Undefined、Number、String、Symbol、BigInt`。
  - 1中Object类型。
* 字符串变数组？`split`。
* 数组变字符串？`join`。
* 数组常用方法？`unshift、shift、push、pop、slice、splice、find、findIndex、forEach、filter、map`。
* 数组去重？`[...new Set([1, 2, 2, 3])]`。
* 数组左移右移？`arr[num] = arr.splice(num - dir, 1, arr[num])[0]`。
* 类数组转数组怎么转？`Array.from(arrayLike)`。
* 数组扁平化？`[[1], [2]].flat(2)`。
* 什么是稀疏数组？稀疏数组能使用forEach、map、filter等方法么？稀疏数组怎么转密集数组？
```
* Array.apply(null, Array(5))
* [...Array(5)]
```
* 类数组转数组
```
* Array.from({length: 5}) // 转出来的是密集数组
* Array.prototype.slice.call({length:10}) // 转出来的是稀疏数组
```
* 有以下3个判断数组的方法，请分别介绍它们之间的区别和优劣`Object.prototype.toString.call()`、`instanceof`以及`Array.isArray()`。
  - Object.prototype.toString.call无法判断自定义的构造函数。 自定义的会返回`[object Object]`。
  - Array.isArray优于instanceof，因为Array.isArray和Object.prototype.toString.call可以检测出iframe中的arr，而instanceof不能。
  - instanceof只能用来判断对象类型，原始类型不可以。并且所有对象类型instanceof Object都是 true，且不同于其他两种方法的是它不能检测出iframe。
* `===` 与 `==` 的区别？`前者不会隐式类型转换，后者会`。
* null和undefined的区别？`undefined派生于null`。
* [] == ![]？`true`。
* NaN == NaN？`false`。
* setTimeout倒计时为什么会出现误差？`单线程，异步，线程空闲`。
* 对象引用举例？
* 对象移除引用？
* 深拷贝和浅拷贝？
* 事件冒泡和事件捕获?
* 怎么阻止事件冒泡和事件的默认行为？
* 事件委托？
* call和apply以及bind的区别？
* 什么是函数去抖？什么是函数节流？
* 什么是作用域链？
* 什么是原型链？
* Object.create 有什么作用？`Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__`。
* new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？`字面量创建对象，不会调用 Object构造函数, 简洁且性能更好`。
* new操作符具体干了什么呢？
```
1、通过new Object()创建一个新的空对象
2、将新对象的prototype指向构造函数的prototype
3、执行构造函数，将this绑定到新对象上，通常是给新对象赋值
4、如果函数没有返回其他对象，那么this指向这个新对象，否则this指向构造函数中返回的对象
```
### es6
* 什么是变量提升？什么是暂时性死区？`使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区`。
* var let const？
* 解构赋值？
* 字符串模板？
* 模块？
* 类？
* 扩展运算符？
### Promise和async以及await
* Promise是怎么使用的？
* async和await怎么使用？
* await的返回值？

# html5
* canvas和svg图形的区别是什么？`位图和矢量图`。
* 上传的文件怎么转base64格式？`FileReader`。
* 你工作中上传文件走的是怎样的流程？七牛云有用过么？使用七牛云上传文件时流程是怎样的？

# cookie
* 请描述一下 cookies，sessionStorage 和 localStorage 的区别？
* cookie的基础格式？`a=1; b=2`。
* 怎么新增cookie？`document.cookie='a=1; domain=.baidu.com'`。
* 设置cookie时怎么跨子域？`document.cookie='a=1; domain=.baidu.com'`。
* 请求跨主域了，默认会携带cookie么？`不会`。
* 请求跨主域了怎么携带cookie？`xhr.withCredentials = true`。
* 跨主域怎么设置cookie？例如A网站怎么给B网站设置cookie？`iframe postMessage`。
* 设置什么属性可以使某条cookie不能被js获取到？`httpOnly`。

# token
* CSRF是什么？

# vue
* 基础语法？
* $set的作用？
# vue-router
# vuex
# 字体图标
* 使用的什么字体图标？阿里字体图标。

# mini program
* 跳转方式？
* 循环和判断？
* 图片太多太大，占用小程序大小，怎么处理？

# git
* 常用命令？`add、commit、push、pull、checkout、reset --hard`。

# http
* 常见状态码？`200 301 302 304 307 308 401 403 404 500 502 504`。
* 常用请求方式？`POST DELETE UPDATE PATCH GET OPTIONS`。
* Cache-Control是干啥的？`强缓存`。
* 怎么防止缓存？`文件加版本号或加md5`。
* 什么是CDN，有什么特性？`内容分发网络，会就近找服务器读取被缓存的资源，提高访问速度`。

# 遇到问题怎么解决？
* 百度一下，你就知道。
