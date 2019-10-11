# commonjs之exports是module.exports的一个引用
* 在 node 编译的过程中，会把 js 模块封装成如下形式：
    ```
    // require 是对 Node.js 实现查找模块的 Module._load 实例的引用
    // __finename 和 __dirname 是 Node.js 在查找该模块后找到的模块名称和模块目录的完整绝对路径
    (function(exports, require, module, __filename, __dirname){
      function plus(a,b){
        return a+b;
      }
      exports.plus = plus;
    })
    ```
* exports 是 module.exports 的一个引用
* module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
* require 引用模块后，返回的是 module.exports 而不是 exports!（重点）
* exports = 相当于给 exports 对象重新赋值，引用就断开了，所以调用模块不能访问 exports 对象及其属性
* 安全导出模块的写法
    ```
        module.exports = {}
    ```
    ```
        module.exports = function(){}
    ```
    ```
        module.exports.a = function(){}
    ```
