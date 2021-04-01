* 异步回调里的错误如果不捕获，会导致进程退出。请不要忽略任何可能出现的错误。

* nodeJS中的this，模块中指向```module.exports```，函数中指向```global```。方法中指向方法所属对象。
```
console.log(this === module.exports); // true

function fn() {
    console.log(this === global); // true
}

fn();
```

# 怎么调试？
* http://www.ruanyifeng.com/blog/2018/03/node-debugger.html
* https://github.com/node-inspector/node-inspector

# child_process
* Native模块`child_process`
```javascript
const util = require('util')
const exec = util.promisify(require('child_process').exec)

exec('node ./build/genConfig')
```
* NPM模块`shelljs`
```javascript
const shelljs = require('shelljs')

shelljs.exec('node ./build/genConfig')
```
* 推荐使用`shelljs`，因为可以通过`console.log(shelljs.exec('node ./build/genConfig'))`打印出输入日志。
* 或者使用`linux`的`>`命令导出文件。
```
exec('node ./build/genConfig > log1.log')
shelljs.exec('node ./build/genConfig > log2.log')
```
* `linux`的`>`命令讲解
```
// 重点1：只能是`-i` 不能是`-it` 因为包含`-t`会报错`the input device is not a TTY`。
// 重点2：linux的`>`和`>>`可以把`jd_get_share_code.js`运行时打印出的日志写入到一个文件里。前者覆盖文件内容，后者追加文件内容。
// 重点3：linux的`2>&1`中1表示正确信息输出通道，2表示错误信息输出通道。`2>&1`表示正确信息和错误信息都从1通道输出。`&>`与`2>&1`的效果一样，写法更简练而已。
shell.exec(`docker exec -i jd_scripts /bin/sh -c "node /scripts/jd_get_share_code.js > /scripts/logs/jd_get_share_code.init.log 2>&1"`)
```
