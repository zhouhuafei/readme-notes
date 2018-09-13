* 钩子函数
```
dom.onclick = function () {
    console.log('钩子函数');
};
```
* 回调函数
```
dom.addEventListener('click', function () {
    console.log('回调函数');
});
```

* 区别：
    - 钩子函数会第一时间触发。
    - 回调函数是在钩子函数内执行的函数。

# 自我理解
* 封装构造函数的时候，如果你预留一个方法，可以让用户改写。那么你这个方法，在流程中被调用，这个方法就是钩子函数。
* 封装构造函数的时候，如果你预留一个函数形参，在流程中执行某个方法的时候，你这个函数形参在执行的方法内被调用了，那么你这个函数形参就是回调函数。

# 案例
```
class Super {
    constructor(cbBeforeRender, cbRendered) {
        this.cbBeforeRender = cbBeforeRender; // 渲染之前的回调函数被定义(提供给用户使用)
        this.cbRendered = cbRendered; // 渲染之后的回调函数被定义(提供给用户使用)
        this.init();
    }
    init() {
        this.beforeRender(); // 渲染之前的钩子函数被触发(流程中执行)
        this.render(); // 渲染(流程中执行)
        this.rendered(); // 渲染之后的钩子函数被触发(流程中执行)
    }
    beforeRender() {} // 渲染之前的钩子函数被定义(提供给用户使用)
    render() {
        this.cbBeforeRender(); // 渲染之前的回调函数被触发(提供给用户使用)
        console.log('此处进行一系列渲染操作');
        this.cbRendered(); // 渲染之后的回调函数被触发(提供给用户使用)
    }
    rendered() {} // 渲染之后的钩子函数被定义(提供给用户使用)
}
```
* 回调函数：cbBeforeRender、cbRendered。
* 钩子函数：beforeRender、rendered。
