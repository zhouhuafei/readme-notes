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

# 结论
* new 函数时，程序期望得到一个复合类型的返回值。
* 你不给返回值，默认返回一个实例对象（this）。
* 如果你给了返回值，但是给的不是程序期望得到的复合类型的值，则程序返回出一个空对象。
* 如果你给了返回值，给的是程序期望得到的复合类型的值，则程序返回这个复合类型的值。
