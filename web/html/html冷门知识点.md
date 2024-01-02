#### 内嵌iframe
* 浏览器机制：iframe路由发生变化后，点击浏览器的回退按钮，会触发iframe页面的回退，而不是父页面的回退。
* 单页面网站，如果路由使用的是history模式，给iframe多次设置同一个src，iframe每次都会重新加载。
* 单页面网站，如果路由使用的是hash模式，给iframe多次设置同一个src，iframe每次都不会重新加载。
  - 小知识1：url上#号之后的数据，不会被发送到服务端。
  - 小知识2：如果去掉#号之后的数据，给iframe多次设置同一个src，iframe每次都会重新加载。因为此时走的是history模式。

#### 给html标签设置hidden属性
* 可以给html标签设置hidden属性`<div hidden>hello</div>`，设置后，相当于设置了`display: none;`。
