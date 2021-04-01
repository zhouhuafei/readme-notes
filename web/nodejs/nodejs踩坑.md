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
* Native模块`child_process`和NPM模块`shelljs`。
```javascript
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const shelljs = require('shelljs')

async function fn () {
  let o = await exec('node ./build/index')

  // `./build/index`里的`console.log`不会在控制台里打印出来，需要手动打印↓。
  console.log('---child_process开始---')
  console.log(o.stdout)
  console.log('---child_process结束---')

  // `./build/index`里的`console.log`会在控制台里打印出来，也可以增加手动打印↓。会打印两份。
  console.log('---shelljs开始---')
  console.log(shelljs.exec('node ./build/index').stdout)
  console.log('---shelljs结束---')
}

fn()
```
* 使用`linux`的`>`命令导出文件。
```javascript
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const shelljs = require('shelljs')

// 如此做法，两者↓导出的内容是一致的。推荐这种做法。
exec('node ./build/index > log1.log')
shelljs.exec('node ./build/index > log2.log')
```
* `linux`的`>`命令讲解。
```
// 重点1：只能是`-i` 不能是`-it` 因为包含`-t`会报错`the input device is not a TTY`。
// 重点2：linux的`>`和`>>`可以把`jd_get_share_code.js`运行时打印出的日志写入到一个文件里。前者覆盖文件内容，后者追加文件内容。
// 重点3：linux的`2>&1`中1表示正确信息输出通道，2表示错误信息输出通道。`2>&1`表示正确信息和错误信息都从1通道输出。`&>`与`2>&1`的效果一样，写法更简练而已。
shell.exec(`docker exec -i jd_scripts /bin/sh -c "node /scripts/jd_get_share_code.js > /scripts/logs/jd_get_share_code.init.log 2>&1"`)
```
