## ajax控制并发数量
```javascript
function random (min, reqMax) {
  return Math.round(Math.random() * (reqMax - min) + min)
}

function fn (reqArr, reqMax = 5, reqMethod = 2) {
  fn.resNum = 0
  fn.maxNum = 0
  fn.emitNum = 0
  fn.resArr = []
  fn.fn(reqArr, reqMax, reqMethod)
}

fn.fn = (reqArr, reqMax, reqMethod) => {
  if (fn.maxNum < reqMax && fn.emitNum < reqArr.length) {
    fn.maxNum++
    reqArr[fn.emitNum](() => {
      fn.resNum++
      fn.maxNum--
      if (reqMethod === 1) {
        // 前reqMax个请求中其中一个响应则立即触发下一个请求
        fn.fn(reqArr, reqMax, reqMethod)
      } else if (reqMethod === 2) {
        // 前reqMax个请求全部响应就进行后续reqMax个请求的触发
        if (fn.maxNum === 0) {
          fn.fn(reqArr, reqMax, reqMethod)
        }
      }
      if (fn.resNum === reqArr.length) { // 全部响应完毕
        console.log('fn.resNum：', fn.resNum)
        console.log('fn.maxNum：', fn.maxNum)
        console.log('fn.emitNum：', fn.emitNum)
        console.log('fn.resArr：', fn.resArr)
      }
    })
    fn.emitNum++
    fn.fn(reqArr, reqMax, reqMethod)
  }
}

fn([...Array(21)].map((value, index) => {
  return function (cb) {
    console.log(`第${index}个请求已发出`)
    setTimeout(() => {
      fn.resArr.push(`第${index}个请求已完成`)
      cb && cb()
    }, [200, 500, 1000][random(1, 2)])
  }
}), 5, 2)
```
