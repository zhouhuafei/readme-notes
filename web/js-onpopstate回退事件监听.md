```
// 绑定事件处理函数
window.onpopstate = function (event) {
    console.log(event);
    // window.location.replace(url);
    // 此时可以指定一个别的页面进行跳转。例如跳转到个人中心页面。
    // 建议使用window.location.replace(url)，否则回退两次就又回到这个页面了。
    // 然后第三次回退再触发事件跳转，第四次回退又回到这个页面，一直无限循环。
    // 使用replace，会丢失历史记录的前进，但是总比回退两次又回到之前的页面然后无限循环体验要好。
};
// 添加并激活一个历史记录条目。如果不加这些，触发不了上面的事件。
history.pushState({state1: 'state data 1'}, 'title1', '#url1');
history.pushState({state2: 'state data 2'}, 'title2', '#url2');
history.pushState({state3: 'state data 3'}, 'title3', '#url3');
```
* 用途1、h5微信支付完，跳转到支付结果页。此时如果点击回退，不能让浏览器再次跳到微信支付页，此时，可以监听回退事件，当触发了回退，指定一个别的页面进行跳转。
* 用途2、单页路由
