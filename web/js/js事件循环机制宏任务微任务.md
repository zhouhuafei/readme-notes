> 摘自：https://juejin.im/post/5b498d245188251b193d4059?utm_source=gold_browser_extension

# 摘要
* JavaScript是单线程的语言。
* Event Loop是javascript的执行机制。
* 任务分为两类。
    - 同步任务
    - 异步任务
* 微任务和宏任务皆为异步任务。
* 第一轮宏任务执行结束，开始执行微任务。

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
