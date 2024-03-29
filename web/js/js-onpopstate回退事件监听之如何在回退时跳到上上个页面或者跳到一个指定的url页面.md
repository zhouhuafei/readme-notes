# 问题
* 下单页，下单，跳转到，支付页，点击支付，跳转到，微信支付页，支付完成，跳转到支付结果页。
* 下单页 -> 支付页 -> 微信支付页 -> 支付结果页。
* 回退。又回到了微信支付页。这不是我们想要到结果。我们想要跳转到非微信支付页。跳转到我们自己的页面。
* 但是微信支付页不是我们可以控制的。所以不能在微信支付页使用replace进行跳转。所以只能曲线救国了。
```
// 当前页绑定事件处理函数
window.onpopstate = function (ev) {
    /*
    需求1，往后跳，回退到支付页。
    错误解法：window.location.href = '支付页的url';
    错误原因：回退->支付页，再退->支付结果页，再退->支付页，再退->支付结果页。回退2，4，6，8无限偶数次都是支付结果页。
    伪正确解法：window.location.replace('支付页的url');
    伪正确原因：回退->支付页，再退->支付页，再退->下单页，前进->支付页，再进->支付页。
    正确解法：先阻止默认行为。然后直接使用window.history.go(-2)跳回上上个页面即可。
    正确原因：回退->支付页，再退->下单页，前进->支付页，再进->微信支付页。
    */
    /*
    ev.preventDefault(); // 先阻止掉浏览器的默认回退行为，其实不阻止也没关系。
    window.history.go(-2); // 然后回退到上上个页面(支付页)。此时再点击前进会跳到微信支付页，但是这样的体验并不会感觉到怪异。注：history.go(-2)会回退到上上个页面(支付页)和pushState的次数无关。
    */

    /*
    建议2，往前跳，跳到订单详情页。
    错误解法：window.location.replace('订单详情页的url');
    错误原因：回退->订单详情页，再退->微信支付页。
    伪正确解法：window.location.href = '订单详情页的url';
    伪正确原因：回退->订单详情页，再退->支付结果页，再退->订单详情页，再退->支付结果页。回退2，4，6，8无限偶数次都是支付结果页。
    正确解法：无。
    */

    // 总结：监听回退时。如果往前跳，建议使用location.href属性。如果往后跳，建议使用history.go方法。
};
// 添加并激活一个历史记录条目。如果不加这些，触发不了上面的事件。
history.pushState({state1: 'state data 1'}, 'title1', '#url1');
history.pushState({state2: 'state data 2'}, 'title2', '#url2');
history.pushState({state3: 'state data 3'}, 'title3', '#url3');
```
* 用途1、h5微信支付完，跳转到支付结果页。此时如果点击回退，不能让浏览器再次跳到微信支付页，此时，可以监听回退事件，当触发了回退，可以指定一个新的页面进行跳转或者回退到某个历史页面。
* 用途2、单页路由

# history.pushState
* 假设初始页面路径是：`https://baidu.com`
* `url`如果是`'#a=1'`，会在页面路径上进行追加，变成：`https://baidu.com/#a=1`。
* `url`如果是`'?a=1'`，会在页面路径上进行追加，变成：`https://baidu.com/?a=1`。
* `url`如果是`'abc'`，会在页面路径上进行覆盖，变成：`https://baidu.com/abc`。
* `url`如果是`'/abc'`，会在页面路径上进行覆盖，变成：`https://baidu.com/abc`。

# `popstate`和`hashchange`事件什么时候会触发？
* 用`history.pushState()`或`history.replaceState()`均不会触发`popstate`和`hashchange`事件。
* 用`history.back()`或`history.go(-n)`或`history.forward()`或`location.hash = 'val'`均会触发`popstate`事件和`hashchange`事件。
