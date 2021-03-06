* 构造函数里只定义一个参数属性this.opts即可，不定义其它属性。
* 然后调用初始化init方法。
* 其它属性的绑定放到子函数里进行。
* 这样后续出现新的div需要绑定事件时
    - 1、你可以选择重新var superObj = new Super({})。
    - 2、你可以选择重新调用方法superObj.init();如果this.domAllDiv放到构造函数里获取，这种操作方式就行不通了。
    - 3、功能内部使用事件委托。这样只需要new一次Super即可。
* 重复调用会多次绑定事件，给dom上绑定一个属性，可以防止多次绑定事件。事件委托亦如此。
```
function Super(opts) {
    this.opts = opts || {};
    this.init();
}

Super.prototype.init = function () {
    this.render();
    this.power();
};

Super.prototype.render = function () {
    this.domAllDiv = document.querySelectorAll('div');
};

Super.prototype.power = function () {
    this.domAllDiv.forEach(function (v) {
        if (v.isBindSuperClick) { // 防止多次绑定事件
            return;
        }
        v.addEventListener('click', function () {
            console.log('only bind once click');
        });
        v.isBindSuperClick = true;
    });
};
```

# 建议
* 不能给外部调用的方法使用下划线(_)或者($_)当前缀再加上命名空间进行命名。
* 更好的做法：
```
class Fn {
    constructor() {
        this.name = 'name';
    }

    publicMethod() {
        privateFunction();
        console.log(this.name);
    }
}

// 局部函数不对外暴露 - 模拟私有方法
function privateFunction() {
}

export default Fn;
```
