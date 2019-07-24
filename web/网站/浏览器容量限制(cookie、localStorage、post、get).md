# cookie
* 容量：不同浏览器容量的限制不一样。一般在4KB左右。
* 个数：不同浏览器个数的限制不一样。一般在50个左右。
* 跨域
    - domain设置成```.sbxx.top```可以跨子域。
    - 借助iframe的postMessage可以实现跨(主/子)域。

# localStorage
* 容量：不同浏览器容量的限制不一样。一般在5MB左右。
* 跨域：借助iframe的postMessage可以实现跨(主/子)域。
* 事件：WindowEventHandlers.onstorage 属性包含一个在storage事件触发时的事件句柄。 当存储域发生改变时会触发事件。(例如： 有新的项被存储)

# GET
* 容量：不同浏览器容量的限制不一样。一般在4KB左右。

# POST
* 容量：无限制。
