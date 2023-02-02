#### JS try-catch-finally 中的 return
* https://zhuanlan.zhihu.com/p/427344201

#### 白屏时间和什么有关？怎么优化？
* https://developer.aliyun.com/article/933842

#### 滚动事件是否会触发事件冒泡？是否会触发事件捕获？
* 不会触发事件冒泡！会触发事件捕获！

#### 前端性能优化之请求优化？
* https://developer.aliyun.com/article/979828
* 从js的使用方面讲下性能优化？
  - 使用节流、防抖。
  - 使用事件委托。
  - 减少重排重绘。

#### JS执行栈和浏览器事件循环机制？
* https://juejin.cn/post/6844903606466904078

#### JS堆内存和栈内存？
* https://www.jianshu.com/p/5b3e4e129877

#### JS垃圾回收机制？
* https://www.jianshu.com/p/4db45984e4ee

#### https和http的区别？
* https://www.jianshu.com/p/f0b64eaec7f0
* 1、http的端口是80，https的端口是443，且两者的连接方式不同（https需要经历SSL协商过程）。
* 2、http不需要申请ssl证书，https需要申请ssl证书。
* 3、http传输是明文的，响应更快，而https是用ssl进行加密的，安全性更高。

#### http1.0，http1.1，http2，http3的区别？
* https://zhuanlan.zhihu.com/p/469988032

#### TCP和UDP有什么区别？
* https://www.cnblogs.com/mlfz/p/13083788.html
* 1、TCP是面向连接的，UDP是无连接的。
* 2、TCP是可靠传输，UDP是不可靠传输。UDP适用于实时应用，例如IP电话，视频会议，直播等。
* 3、TCP是面向字节流传输，UDP是面向报文传输。

#### 天翼云前端面经
https://www.nowcoder.com/discuss/1083153

#### gulp rollup webpack vite的区别？
* gulp：gulp是一个工具包，可以帮助您在开发工作流中自动化痛苦或耗时的任务。
  - https://cn.vitejs.dev/guide/
* webpack：webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
  - https://www.webpackjs.com/concepts/
* rollup：Rollup 是一个 JavaScript 模块打包工具，可以将多个小的代码片段编译为完整的库和应用。与传统的 CommonJS 和 AMD 这一类非标准化的解决方案不同，Rollup 使用的是 ES6 版本 Javascript 中的模块标准。新的 ES 模块可以让你自由、无缝地按需使用你最喜爱的库中那些有用的单个函数。这一特性在未来将随处可用，但 Rollup 让你现在就可以，想用就用。
  - https://www.rollupjs.com/
* vite：Vite是一种新型前端构建工具，能够显著提升前端开发体验。
  - https://cn.vitejs.dev/guide/

#### webpack中loader和plugin的区别？
* loader：用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！ 因为 webpack 本身只能处理 JavaScript，如果要处理其他类型的文件，就需要使用 loader 进行转换，loader 本身就是一个函数，接受源文件为参数，返回转换的结果。
* Plugin：是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。 通过plugin（插件）webpack可以实 loader 所不能完成的复杂功能，使用 plugin 丰富的自定义 API 以及生命周期事件，可以控制 webpack 打包流程的每个环节，实现对 webpack 的自定义功能扩展。

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

#### babel工作原理？
* Babel的功能非常纯粹，以字符串的形式将源代码传给它，它会返回一段新的代码字符串（以及sourcemap）。他既不会运行你的代码，也不会将多个代码打包到一起，它是个编译器，输入的语言是ES6+，编译目标语言是ES5。
* Babel的编译过程跟大多数其他语言的编译器大致同理，分为三个阶段：
  - 1.解析：将代码字符串解析成抽象语法树
  - 2.变换：对抽象语法树进行变换操作
  - 3.再建：根据变化后的抽象语法树再生成代码字符串

#### 手写Promise？
...TODO

#### 手写reduce？
* https://github.com/zhouhuafei/readme-notes/tree/master/web/js-handwriting-something/myReduce.js

#### 手写深拷贝？
* https://github.com/zhouhuafei/readme-notes/tree/master/web/js-handwriting-something/deepCloneEasyScene.js

#### 手写call？
* https://github.com/zhouhuafei/readme-notes/tree/master/web/js-handwriting-something/myCall.js

#### 手写JS洋葱模型？
* https://github.com/zhouhuafei/readme-notes/tree/master/web/js-handwriting-something/onionModel.js

#### vue在进行dom渲染时存在什么问题？
* 因存在就地复用策略。所以使用v-if配合v-else渲染input时，其value存在清理不掉的问题。可以加key解决。

#### 虚拟dom和真实dom的区别？
* https://juejin.cn/post/7126155840070877197
* https://www.jianshu.com/p/9a2fad724371
* Real DOM，真实DOM， 意思为文档对象模型，是一个结构化文本的抽象，在页面渲染出的每一个结点都是一个真实DOM结构。
* Virtual Dom，本质上是以 JavaScript 对象形式存在的对 DOM 的描述。（虚拟DOM是表示真实DOM的JS对象）。
  - 操作虚拟DOM比直接操作真实DOM多了一层，因此操作虚拟DOM一定比操作真实DOM慢。vue和react等框架引入虚拟DOM是为了更好的更新DOM，增加了框架使用的便利性。
  - 虚拟DOM最大的好处在于抽象了渲染的过程，为应用带来了跨平台的能力，不再是仅仅局限于浏览器端。比如React-Native和WeeX可以运行在Android、IOS平台上。

#### vue怎么将虚拟dom渲染成真实dom？
* https://blog.csdn.net/wangyuiba1314/article/details/123900151
* 虚拟DOM是通过render函数渲染成真实DOM的。

#### vue的diff算法？
* https://www.bilibili.com/video/BV1JR4y1R7Ln

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
    - type可以通过 typeof操作符来定义，如：`type myType = typeof someObj`。注意，typeof后面是js的数据。

#### TS类型兼容？
* 对象的字段。可以把字段多的对象赋值给字段少的对象。
  - 结构之间兼容：成员少的兼容成员多的。
* 函数的参数。可以把参数少的函数赋值给参数多的函数。
  - 函数之间兼容：参数多的兼容参数少的。

#### TS类型保护？
* https://juejin.cn/post/7008778836150075406
* 使用instanceof、in、typeof、自定义类型保护函数等规避断言的不合理使用

#### 移动端上拉加载分页数据时，删除一条数据，导致后面加载数据少一条怎么办？
* 最后和后端商量采用以下方式，不删除数据就传pageNo和PageSize，如果删了数据，就再加一个id，这个id为当前获取数据总量的最后一条数据的id，后端会根据这个id获取它后面的数据，这样就不会少获取数据了。

#### 熔断、限流、降级的区别？
* https://blog.csdn.net/qq_37469055/article/details/118517994

#### cpu，内存，硬盘，分别满了会怎样？
* https://www.zhihu.com/question/448589744

#### nodejs的优缺点？
* https://www.zhihu.com/question/19653241/answer/15993549

#### 如何理解nodejs的单线程？
* https://www.zhihu.com/question/46783742/answer/2411784698

#### 什么是CPU密集型、IO密集型？
* https://zhuanlan.zhihu.com/p/62766037

#### PM2中的Cluster和Fork模式差异？
* https://stackoverflow.com/questions/34682035/cluster-and-fork-mode-difference-in-pm2
