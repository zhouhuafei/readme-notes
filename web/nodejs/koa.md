# 异步响应-居然无效
* 错误写法。接口会返回`Not Found`。状态码为`404`。
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
        html: 'hello world'
      })
      resolve(next())
    }, 3000)
  })
})
```
* 如果路由的第二参数和第三参数都存在，则都需要返回`Promise`。否则接口会返回`Not Found`。状态码为`404`。
```
router.get(
  '/crawler',
  (ctx, next) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(next())
      }, 3000)
    })
  },
  (ctx, next) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        ctx.body = JSON.stringify({
          html: 'hello world'
        })
        resolve(next())
      }, 3000)
    })
  }
)
```
* 去掉定时器可改为
```

router.get(
  '/crawler',
  async (ctx, next) => {
    return next()
  },
  async (ctx, next) => {
    ctx.body = JSON.stringify({
      html: 'hello world'
    })
    return next()
  }
)
```
* 同步直接`next()`即可。不需要返回值，只要涉及到异步，则全都需要返回`Promise`。

# 文件上传`koa-multer`
```
const Koa = require('koa')
const path = require('path')
const multer = require('koa-multer')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

// 文件上传 - 配置
const storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, 'static/upload/'))
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split('.') // 以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
// 文件上传 - 加载
const upload = multer({ storage: storage })

// 路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename // 返回文件名
  }
})

app.use(router.routes(), router.allowedMethods())

app.listen(8080, () => {
  console.log('127.0.0.1:8080')
})
```
