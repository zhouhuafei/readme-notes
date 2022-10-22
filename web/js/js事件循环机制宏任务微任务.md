> 摘自：https://juejin.cn/post/6844903638238756878

# 摘要
* JavaScript是单线程的语言。
* Event Loop是javascript的执行机制。
* 任务分为两类。
    - 同步任务
    - 异步任务
* 微任务和宏任务皆为异步任务。
* 第一轮宏任务执行结束，开始执行微任务。
  - 微任务队列清理干净后，会执行下一轮宏任务。
  - 执行宏任务途中，如果遇到了微任务则继续放入微任务队列。
  - 当前宏任务执行完毕，会查看微任务队列有无微任务，如果有，则把微任务队列里的微任务清理干净。以为类推。

# 宏任务
| 宏任务                    |  浏览器  |   Node   |
| :----------------------: | :------: | :-----:  |
| script                   |   ✅	  |    ✅    |
| setTimeout	           |   ✅	  |    ✅    |
| setInterval	           |   ✅	  |    ✅    |
| setImmediate	           |   ❌	  |    ✅    |
| requestAnimationFrame    |   ✅     |    ❌    |

# 微任务
| 微任务                         |  浏览器 |   Node   |
| :----------------------:      | :-----: | :------: |
| process.nextTick              |   ❌	  |    ✅    |
| MutationObserver              |   ✅	  |    ❌    |
| Promise.then catch finally    |   ✅	  |    ✅    |
