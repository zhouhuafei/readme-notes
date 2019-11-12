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

# `koa-body`接收文件流
* 客户端以`file`字段进行传输。
* 服务端接收：`ctx.request.files.file`。
  - 本质还是把文件上传到了服务器。目录可在`koa-body`中进行配置。
  - `ctx.request.files.file`接收的，其实是已经被上传到服务器上的文件数据，其中`path`属性就是存储路径。
* `koa-body`配置案例：
```
const Koa = require('koa')
const app = new Koa()

// 跨域
const cors = require('@koa/cors')
app.use(cors())

// koa-body
const path = require('path')
const koaBody = require('koa-body')
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true, // 保持文件的后缀。
    uploadDir: path.join(__dirname, 'upload'), // 设置文件上传目录。
    maxFieldsSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M。
    onFileBegin: (name, file) => { // 文件上传前的设置。
      // console.log('name', name)
      // console.log('file', file)
      file.path = file.path.replace('upload_', 'upload-new_')
    }
  }
}))

// 路由
require('./router/index')(app)

// 端口
app.listen(3000)
console.log('http://127.0.0.1:3000')
```
