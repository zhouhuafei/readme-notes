js中一切皆是对象
```
    Function.prototype.getF = function () {
    };
    Object.prototype.getO = function () {
    };
    var obj = new Object();
    console.log(obj.getF); // undefined
    console.log(obj.getO); // function(){}
    console.log(Object.getF); // function(){}
    console.log(Number.getF); // function(){}
    console.log(Function.getO); // function(){}
```
* obj.getO能找到的原因是：
```
console.log(obj.__proto__ === Object.prototype); // true; obj的原型指向Object.prototype
```
* Object.getF能找到的原因是：
```
console.log(Object.__proto__ === Function.prototype); // true; Object的原型指向Function.prototype
```
* Number.getF能找到的原因是：
```
console.log(Number.__proto__ === Function.prototype); // true; Number的原型指向Function.prototype
```
* Function.getO能找到的原因是：
```
console.log(Function.__proto__.__proto__ === Object.prototype); // true; Function的原型的原型指向Object.prototype
```

# 其他
```
console.log(Object.prototype.__proto__); // null; Object的原型的原型指向null
```
