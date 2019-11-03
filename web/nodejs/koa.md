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
