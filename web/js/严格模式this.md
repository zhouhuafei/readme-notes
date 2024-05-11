## ES6模块下
* ES6模块的全局this指向`undefined`。ES6的模块自动采用严格模式，不管你有没有在模块头部加上`'use strict'`。

## 浏览器环境下
* 在全局作用域中，this指向window对象(和非严格模式一致)
* 对象的函数中的this指向调用函数的对象实例(和非严格模式一致)
* 构造函数中的this指向构造函数创建的对象实例(和非严格模式一致)
* 在事件处理函数中，this指向触发事件的目标对象(和非严格模式一致)
* 函数自执行,和函数调用,this指向undefined(和非严格模式不一致，非严格模式指向window)

# nodeJS环境下
* CommonJS规范下，nodeJS中的this，模块中指向`module.exports`，函数中指向`global`。方法中指向方法所属对象。
```
console.log(this === module.exports); // true

function fn() {
    console.log(this === global); // true
}

fn();
```
