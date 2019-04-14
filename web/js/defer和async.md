# 当浏览器碰到 script 脚本的时候：
* ```<script src="script.js"></script>```没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
    - js的加载是并行的，执行是有序的，会阻塞DOM渲染。
* ```<script async src="script.js"></script>```有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。
    - js的加载是并行的，执行是无序的。不会阻塞DOM渲染。
* ``` <script defer src="script.js"></script>```有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
    - js的加载是并行的，执行是有序的。不会阻塞DOM渲染。
    - 在现实当中，延迟脚本并不一定会按照顺序执行，也不一定会在DOMContentLoaded事件触发前执行，因此最好只包含一个延迟脚本。《JavaScript高级程序设计》
