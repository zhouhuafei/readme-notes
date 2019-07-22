* 在严格模式下，在全局作用域中，this指向window对象(和非严格模式一致)
* 对象的函数中的this指向调用函数的对象实例(和非严格模式一致)
* 构造函数中的this指向构造函数创建的对象实例(和非严格模式一致)
* 在事件处理函数中，this指向触发事件的目标对象(和非严格模式一致)
* 函数自执行,和函数调用,this指向undefined(和非严格模式不一致，非严格模式指向window)

# nodeJS
* nodeJS中的this，模块中指向```module.exports```，函数中指向```global```。方法中指向方法所属对象。
```
console.log(this === module.exports); // true

function fn() {
    console.log(this === global); // true
}

fn();
```
