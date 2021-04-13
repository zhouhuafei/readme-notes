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

# jd_docker-app项目中，在cookie列表页打接口启动脚本或停止脚本时会导致其他接口阻塞。
* 问题的原因：Node.js是单线程，脚本中执行的逻辑比较耗时，长时间占用着主线程，其他接口被阻塞实属正常现象。
  - 就算脚本中同步执行的代码更改为异步执行。也是解决不了问题的。
  - 因为只要还是处于当前线程，只要脚本中的逻辑处于执行状态，其他接口必然是处于阻塞状态。
  - 本人加定时器亲测后得到的结果和我上述的推论是一致的。
* 解决的方案：如果脚本中执行的逻辑比较耗时，建议新启一个脚本服务或脚本线程，如此才不会阻塞接口服务。
  - 等待另一个服务响应的过程中，当前服务线程属于空闲状态，并不会造成阻塞。如此其他接口是可以继续运算的。
* Q：Node.js的特点是`单线程非阻塞异步I/O`，为什么我用异步的I/O还是造成了线程的阻塞？
  - A：异步不会阻塞同步，但是异步会阻塞其他异步。
  - A：主线程空闲时，才会执行异步队列里的逻辑。
  - A：当某个逻辑很复杂时，自然是会长时间占用主线程。
  - A：那异步队列里的其他逻辑自然是处于被阻塞状态。
* Q：cron定时任务会阻塞接口服务么？
  - A：cron定时任务本身就是一个服务。不会阻塞接口服务。
* Q：如果某个接口中包含大量的运算，会造成后续接口的阻塞么？如果造成了阻塞应该怎么解决？
  - A：因单线程的特性，固会造成后续接口的阻塞。我本人亲测后发现，确实是会造成阻塞。
  - A：但是Node.js也是支持多线程的，如果接口包含大量的运算，可以再开一个线程进行运算，如此便不会阻塞当前线程。
* 本项目在`centos`上部署时`service-api`的`npm i`报错了。
  - 报错信息为：`g++: command not found`。
  - 解决方案参考：https://blog.csdn.net/h378588270/article/details/7729268
  - 解决方案具体如下：
  ```
  centos：
  yum -y update gcc
  yum -y install gcc+ gcc-c++

  ubuntu：
  apt-get update gcc
  apt-get install g++
  ```
