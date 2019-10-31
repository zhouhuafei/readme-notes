# 异步响应-居然无效
* 错误写法
```
router.get('/crawler', (ctx, next) => {
  setTimeout(function () {
    ctx.body = JSON.stringify({
      html: 'hehe'
    })
  }, 2000)
})
```
* 正确写法
```
router.get('/crawler', (ctx, next) => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      ctx.body = JSON.stringify({
        html: 'hehe'
      })
      resolve(next())
    }, 3000)
  })
})
```
