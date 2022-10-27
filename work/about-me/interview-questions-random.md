#### 白屏时间和什么有关？怎么优化？
* https://developer.aliyun.com/article/933842

#### 滚动事件是否会触发冒泡？是否会触发捕获？
* 不会触发冒泡！会触发捕获！

#### 前端性能优化之请求优化？
* https://developer.aliyun.com/article/979828
* 从js的使用方面讲下性能优化？
  - 使用节流、防抖。
  - 使用事件委托。
  - 减少重排重绘。

#### JS执行栈和浏览器事件循环机制？
* https://juejin.cn/post/6844903606466904078

#### JS堆内存和栈内存？
...TODO

#### JS垃圾回收机制？
...TODO

#### JS洋葱模型？
...TODO

#### JS洋葱模型是如何实现请求拦截的？
...TODO

#### TCP和UDP有什么区别？
* 1、TCP是面向连接的，UDP是无连接的。
* 2、TCP是可靠传输，UDP是不可靠传输。UDP适用于实时应用，例如IP电话，视频会议，直播等。
* 3、TCP是面向字节流传输，UDP是面向报文传输。

#### http2与http1.1的区别？
...TODO

#### http3与http2的区别？
...TODO

#### https和http的区别？
* 1、http的端口是80，https的端口是443，且两者的连接方式不同。
* 2、http不需要申请ssl证书，https需要申请ssl证书。
* 3、http传输是明文的，响应更快，而https是用ssl进行加密的，安全性更高。

#### 天翼云前端面经
https://www.nowcoder.com/discuss/1083153

#### gulp rollup webpack vite的区别？
...TODO

#### 手写深拷贝？
...TODO

#### 手写call？
...TODO

#### vue在进行dom渲染时存在什么问题？
* 因存在就地复用策略。所以使用v-if配合v-else渲染input时，其value存在清理不掉的问题。可以加key解决。

#### 虚拟dom和真实dom的区别？
...TODO

#### vue怎么将虚拟dom渲染成真实dom？
...TODO

#### vue的diff算法？
...TODO

#### vue长列表如何进行性能优化？
* 对于纯展示数据，不需要做vue数据劫持，可以对数据进行冻结。`Object.freeze(dataList)`。
* 使用虚拟列表进行滚动 - 只渲染可视区以及上一屏和下一屏的内容。

#### Vue3为什么要新增组合式api（setup）？
* https://zhuanlan.zhihu.com/p/68477600

#### 函数式组件为什么是一种趋势？函数式组件的优点？
* 函数更灵活，更易拆分，更易测试。
* 函数式组件是无状态的，更易对组件进行逻辑组合与复用。
* 基于函数的 API 天然对类型推导很友好。
* 函数对 tree-shaking 非常友好。

#### interface和type的区别？
* 相同点
  - 都可以用来描述对象或函数。
  - 都支持拓展。interface可以使用`extends关键字`或`声明合并`来进行扩展。type只能使用交叉类型`&`来进行扩展。
* 不同点
  - interface定义两个同名的会进行声明合并。type定义两个同名的会报错。
  - type可以做到，但interface不能做到的事情。
    - type可以定义 基本类型，如：`type myString = string`。
    - type可以定义 元组类型，如：`type yuanzu = [myType1, myType2]`。
    - type可以定义 联合类型，如：`type unionType = myType1 | myType2`。
    - type可以定义 交叉类型，如：`type unionType = myInterface1 & myInterface2`。
    - type可以通过 keyof操作符来定义，如：`type myType = keyof someObjType`。注意，keyof后面是ts的类型。
    - type可以通过 typeof操作符来定义，如：`type myType = typeof someObj`。注意，typeof后面是js的数据类型。

#### TS类型兼容？
* 函数的参数。可以把参数少的函数赋值给参数多的声明。
* 对象的字段。可以把字段多的对象赋值给字段少的声明。

#### babel工作原理？
* Babel的功能非常纯粹，以字符串的形式将源代码传给它，它会返回一段新的代码字符串（以及sourcemap）。他既不会运行你的代码，也不会将多个代码打包到一起，它是个编译器，输入的语言是ES6+，编译目标语言是ES5。
* Babel的编译过程跟大多数其他语言的编译器大致同理，分为三个阶段：
  - 1.解析：将代码字符串解析成抽象语法树
  - 2.变换：对抽象语法树进行变换操作
  - 3.再建：根据变化后的抽象语法树再生成代码字符串

#### 如何优化webpack的打包体积？
* 对第三方模块进行提取。例如提取第三方的js和css。
* 对业务中的公共模块进行提取。例如提取业务中自己写的公共js和css。
* 对路由模块使用懒加载。
* 使用Tree Shaking去除js中无用代码。
* 对静态文件进行压缩。

#### Tree Shaking原理？
* Tree Shaking的本质是消除无用的js代码。
* ES6 Module引入时，会进行静态分析，故而编译的时候能正确判断到底加载了哪些变量。当变量未被使用时，进而删除对应的代码。
* 场景测试，下述均为亲测。
  - import * as xxx时，只使用到了xxx.a，那么xxx.b会被删除么？`会被删除 - es module静态分析`。
  - export default导出的变量，未被使用时会被删除么？`会被删除 - es module静态分析`。
  - 如果导出的是一个obj对象，只用到了obj.a方法，那么obj.b方法会被删除么？`不会被删除 - 因为编译期间的静态分析只能对es module的相关语法做分析，是不会真正去执行代码的。`。

#### 移动端上拉加载分页数据时，删除一条数据，导致后面加载数据少一条怎么办？
* 最后和后端商量采用以下方式，不删除数据就传pageNo和PageSize，如果删了数据，就再加一个id，这个id为当前获取数据总量的最后一条数据的id，后端会根据这个id获取它后面的数据，这样就不会少获取数据了。
