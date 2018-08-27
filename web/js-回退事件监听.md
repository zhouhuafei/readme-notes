```
// 绑定事件处理函数
window.onpopstate = function (event) {
    console.log(event); // 此时可以指定一个别的页面进行跳转。例如跳转到个人中心页面。
};
// 添加并激活一个历史记录条目。如果不加这些，触发不了上面的事件。
history.pushState({stateData: 'state data 1'}, 'title1', '#url1');
history.pushState({stateData: 'state data 2'}, 'title2', '#url2');
history.pushState({stateData: 'state data 3'}, 'title3', '#url3');
```
* 用途1、h5微信支付完，跳转到支付结果页。此时如果点击回退，不能让浏览器再次跳到微信支付页，此时，可以监听回退事件，当触发了回退，指定一个别的页面进行跳转。
* 用途2、单页路由
