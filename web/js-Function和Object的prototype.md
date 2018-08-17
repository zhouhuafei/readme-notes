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
console.log(obj.constructor === Object); // true
```
* Object.getF能找到的原因是：
```
console.log(Object.constructor === Function); // true;
```
* Number.getF能找到的原因是：
```
console.log(Number.constructor === Function); // true;
```
* Function.getO能找到的原因是：
```
console.log(Function.prototype.__proto__.constructor === Object); // true;
```

# 坑
* 其实这里我理的还不是很清晰。待续...
