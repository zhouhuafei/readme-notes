> 出面试题。

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
```
1、7种原始数据类型：`Boolean、Null、Undefined、Number、String、Symbol、BigInt`。
2、1种Object类型。
```
* 字符串变数组？`split`。
* 数组变字符串？`join`。
* 数组常用方法？`unshift、shift、push、pop、slice、splice、find、findIndex、forEach、filter、map`。
* 数组去重？`[...new Set([1, 2, 2, 3])]`。
* 数组左移右移？`arr[num] = arr.splice(num - dir, 1, arr[num])[0]`。
* 类数组转数组怎么转？`Array.from(arrayLike)`。
* 数组扁平化？`[[1], [2]].flat(2)`。
* 数组排序？`sort、reverse`。
* 什么是稀疏数组？稀疏数组能使用forEach、map、filter等方法么？稀疏数组怎么转密集数组？
```
1、Array.apply(null, Array(5))
2、[...Array(5)]
```
* 类数组转数组
```
1、Array.from({length: 5}) // 转出来的是密集数组
2、Array.prototype.slice.call({length:10}) // 转出来的是稀疏数组
```
* 有以下3个判断数组的方法，请分别介绍它们之间的区别和优劣`Object.prototype.toString.call()`、`instanceof`以及`Array.isArray()`。
```
1、Object.prototype.toString.call无法判断自定义的构造函数。 自定义的会返回`[object Object]`。
2、Array.isArray优于instanceof，因为Array.isArray和Object.prototype.toString.call可以检测出iframe中的arr，而instanceof不能。
3、instanceof只能用来判断对象类型，原始类型不可以。并且所有对象类型instanceof Object都是 true，且不同于其他两种方法的是它不能检测出iframe。
```
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
* call和apply以及bind的区别？取数组最大值ES5、ES6？`es5 Math.max.apply(null, [14, 3, 77, 30])`。`es6 Math.max(...[14, 3, 77, 30])`。
* 什么是函数去抖？什么是函数节流？
* 什么是变量预解析和函数预解析？函数声明式和函数表达式哪种会预解析？预解析的权重？`函数>形参>变量`。
* 作用域链的工作流程？
* 原型链的工作流程？
* Object.create 有什么作用？`Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__`。
* new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？`字面量创建对象，不会调用 Object构造函数, 简洁且性能更好`。
* new操作符具体干了什么呢？
```
1、通过new Object()创建一个新的空对象
2、将新对象的prototype指向构造函数的prototype
3、执行构造函数，将this绑定到新对象上，通常是给新对象赋值
4、如果函数没有返回其他对象，那么this指向这个新对象，否则this指向构造函数中返回的对象
```
* 什么是闭包？为什么要使用闭包？`闭包就是能够读取其他函数内部变量的函数。为了访问其他函数内部的变量，防止全局变量污染，可以用私有变量模拟私有属性，可以用私有函数模拟私有方法`。
### 应用
* 写一个简单校验手机号的正则？`/^1\d{10}$/`。
* 写一个1-3的随机数？`Math.round(Math.random() * (3 - 1)) + 1`。
* `['1', '2', '3'].map(parseInt)` 答案是多少？`[1, NaN, NaN]`。
### 高级
* 什么是函数柯里化？实现sum(1)(2)(3)返回结果是1,2,3之和？待续...
* 什么是函数式编程？待续...
### es6
* var let const？
* 什么是暂时性死区？`使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区`。
* 解构赋值？实现变量交换。
* 字符串模板？
* 扩展运算符？用在函数的入参里？用在对象上？
* 模块？导出和导入？
* 类？原型如何实现继承？Class 如何实现继承？Class 本质是什么？
### Promise和async以及await
* Promise是怎么使用的？使用Promise实现串行和并行？
* async和await怎么使用？
* 使用async定义的函数的返回值？await的返回值？
* async内多个await如何并行请求？

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
* CSRF是什么？怎么预防？

# vue
* v-if 和 v-show 有什么区别?
* v-for与v-if当它们处于同一节点的优先级？`v-for 具有比 v-if 更高的优先级`。
* 如何将原生事件绑定到组件？`.native、$listeners`。
* Vue 组件中 data 为什么必须是函数？`当 data 的值是一个对象时，它会在这个组件的所有实例之间共享`。
* vue更新数组时触发视图更新的方法？`Vue.set或this.$set`。
* $nextTick 的作用？`在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM`。
* 如何让 CSS 只在当前组件中起作用？`scoped`。
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

# vue-router
* vue-router 跳转和 location.href 有什么区别？
* vue-router 如何监听 路由参数 的变化？
* vue-router 如何实现路由懒加载？
* vue-router 如何定义嵌套路由？
* vue-router 动态路由匹配以及使用？
* vue-router 如何实现权限拦截？
# vuex
* vuex是什么？怎么使用？哪种功能场景使用它？
# 字体图标
* 使用的什么字体图标？阿里字体图标。

# mini program
* 常用组件有哪些？`view、text、cover-view、scroll-view、navigator、swiper、swiper-item、picker、button、input、form、canvas`。
* 常用api有哪些？`wx.getUserInfo、wx.showToast、wx.showModal、wx.showLoading、getStorageSync、wx.previewImage、wx.openLocation`。
* 跳转方式？`wx.switchTab、wx.reLaunch、wx.redirectTo、wx.navigateTo、wx.navigateBack`。
* 事件怎么传递数据？`e.currentTarget.dataset`。
* 小程序页面间有哪些传递数据的方法？`query、setStorageSync`。
* 如何实现下拉刷新? `"enablePullDownRefresh": true`。`onPullDownRefresh`。
* 小程序的生命周期有哪些？`onLoad、 onShow、 onReady、onHide、onUnload`。
* 分包怎么使用？`配置 app.json的subpackages`。
* 小程序如何瘦身？图片太多太大，占用小程序大小，怎么处理？`CDN`。
* 小程序生成某个页面二维码的前提是？`小程序审核通过并已上线，且有对应页面`。
* 小程序生成的页面二维码，扫码能跳开发版或者体验版的小程序么？`不能`。
* 怎么在开发阶段保证二维码能正常生成？`中转页`。
* 怎么本地模拟二维码扫码进入？`模拟器里进行数据模拟`。
* scene超出32位怎么解决？`存数据库`。
* 怎么兼容解析二维码参数和query参数？`页面数据接收时进行合并 或 路径参数生成时保证页面转发的数据和页面二维码的数据格式一致`。

# git
* 常用命令？`add、commit、push、pull、checkout、reset --hard`。

# http
* 常见状态码？`200 301 302 304 307 308 401 403 404 500 502 504`。
* 常用请求方式？`POST DELETE UPDATE PATCH GET OPTIONS`。
* Cache-Control是干啥的？`强缓存`。
* 怎么防止缓存？`文件加版本号或加md5`。
* 什么是CDN，有什么特性？`内容分发网络，会就近找服务器读取被缓存的资源，提高访问速度`。

# 综合
* 接口的错误处理你是怎么做的？
* 对接口响应的数据，你是怎么做二次处理的？
* 平常遇到问题都是怎么解决的？`去社区找答案或者百度谷歌找答案`。
