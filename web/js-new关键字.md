```
var b = new boolean(false);
b === false; // false
b == false; // true
if (b) {
    console.log('因为b是一个对象，所以可以通过');
}
```
* b是一个对象，不是布尔值，其他类型new出来也是对象。

# 构造函数new的时候
* 如果构造函数没有用return进行返回值。
    - 返回一个正常的实例（也就是构造函数内部的this，不写return，默认返回this）。
* 如果构造函数用return返回了值，且值是基本类型。（冷知识）
    - 返回一个正常的实例（也就是构造函数内部的this）。
* 如果构造函数用return返回了值，且值是复合类型。
    - 返回这个复合类型。

