#### 内嵌iframe
* 浏览器机制：iframe路由发生变化后，点击浏览器的回退按钮，会触发iframe页面的回退，而不是父页面的回退。
* 单页面网站，如果路由使用的是hash模式，给iframe设置同一个src，iframe不会重新加载。

#### 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。
