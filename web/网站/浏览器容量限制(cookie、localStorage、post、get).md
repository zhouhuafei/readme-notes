# cookie
* 容量：不同浏览器容量的限制不一样。一般在4KB左右。
* 个数：不同浏览器个数的限制不一样。一个域名通常可以存储20-50个key。一个浏览器最多可以保存300个cookie。超出的部分后者会覆盖前者。
* 跨域
    - domain设置成```.sbxx.top```可以跨子域。
    - 借助iframe的postMessage可以实现跨(主/子)域。

# localStorage
* 容量：不同浏览器容量的限制不一样。一般不超过5MB的数据。sessionStorage亦如此。
  - 亲测Chrome浏览器可以存储4MB图片。超过之后存储会失败。但是存的是base64。图片转base64后会增加33%-36%的大小。所以是可以存储不超过5MB的数据。
* 跨域：借助iframe的postMessage可以实现跨(主/子)域。
* 事件：WindowEventHandlers.onstorage 属性包含一个在storage事件触发时的事件句柄。 当存储域发生改变时会触发事件。(例如：有新的项被存储)
  - 注意事项：onstorage事件，不会在当前窗口触发，只会在其他窗口触发。例如A窗口修改了localStorage，则A窗口并不会触发storage事件，B窗口才会触发storage事件。
  - 代码案例：
  ```javascript
  window.onstorage = function(e) {
    console.log( e.key + ' 键已经从 ' + e.oldValue + ' 改变为 ' + e.newValue + '.');
  };
  ```

# GET
* 容量：不同浏览器容量的限制不一样。一般在2KB-8KB，建议不要超过2KB。

# POST
* 容量：无限制。

# IndexedDB
> 增加搜索关键字：indexedDB、indexeddb
* IndexedDB存储数据大小一般在250M以上。

# StorageManager
> Storage API的 StorageManager 接口提供了用于管理数据本地存储权限和估算可用存储空间的接口。
* https://developer.mozilla.org/zh-CN/docs/Web/API/StorageManager
* 没看出有啥用，不能提升存储上限，感觉没啥用。且只能https使用。

# 测试localStorage可以存储的数据量 - 发现可以存储不超过5MB的数据
```javascript
(function () {
  if (!window.localStorage) {
    console.log('当前浏览器不支持localStorage!')
  }
  let test = '0123456789'
  const add = function (num) {
    num += num
    if (num.length === 10240) { // 此处是10KB 1KB等于1024B 1个数字或英文字母是1B
      test = num
      return
    }
    add(num)
  }
  add(test)
  let sum = test
  const show = setInterval(function () {
    sum += test
    try {
      window.localStorage.removeItem('test')
      window.localStorage.setItem('test', sum)
      console.log(sum.length / 1024 + 'KB')
    } catch (e) {
      console.log(sum.length / 1024 + 'KB超出最大限制')
      clearInterval(show)
      window.localStorage.removeItem('test')
    }
  }, 20)
})()
```
