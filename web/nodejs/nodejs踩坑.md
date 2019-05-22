* 异步回调里的错误如果不捕获，会导致进程退出。请不要忽略任何可能出现的错误。

* nodeJS中的this，模块中指向```module.exports```，函数中指向```global```。方法中指向方法所属对象。
```
console.log(this === module.exports); // true

function fn() {
    console.log(this === global); // true
}

fn();
```
