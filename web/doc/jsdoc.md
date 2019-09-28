> ###### 手册：http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/PARAM.html
> ###### 文档：https://jsdoc.app/index.html 往下拉能拉到每个`Block Tags`表示的含义
> ###### 文档：https://www.html.cn/doc/jsdoc/tags-param.html
> ###### 工具：https://github.com/jsdoc/jsdoc

# 随机看了几个vue文件的注释风格：
* 方法上使用`jsdoc`规范风格的多行注释，说明方法用途。
* 方法内使用一个或多个单行注释，说明细节。

# `Block Tags`
> `@param` `@returns` 类似这种，即为`Block Tags`。

# 案例 - 参数：`@param`
> `@param` 后可以接 `String` `Number` `Array` `Object`。
* 参数是对象
```
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {String} employee.name - The name of the employee.
 * @param {String} employee.department - The employee's department.
 */
function fn(employee) {
    // ...
}
```
* 参数是数组。
```
/**
 * Assign the project to an employee.
 * @param {Array} employee - The employee who is responsible for the project.
 */
function fn(employee) {
    // ...
}
```
* 参数和默认值
```
/**
 * @param {String} somebody=John Doe - Somebody's name.
 */
function sayHello(somebody = 'John Doe') {
}
```
* 可选参数`@param`和默认值
```
/**
 * @param {String} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody = 'John Doe') {
}
```

# 案例 - 构造函数
```
/**
 * Represents a book.
 * @constructor
 * @param {String} title - The title of the book.
 * @param {String} author - The author of the book.
 */
function Book(title, author) {
}
```

# 案例 - 返回值：`@returns`
```
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum(a, b) {
    return a + b;
}
```
