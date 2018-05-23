# focus和blur事件不支冒泡，怎么做事件委托呢？
* 不支持事件冒泡，但是支持事件捕获啊。
* 当事件类型为focus和blur时，addEventListener的第二参数为true即可进行事件捕获。
