# 客户端上传多张图片时是怎么上传的？服务端又是怎么接收的？
* 客户端 - `FormData`
```
<input type="file" multiple>
<script>
async function onChange (e) {
  const formData = new FormData()
  formData.append('a', '1')
  formData.append('b', '2')
  formData.append('c', '3')
  const files = e.target.files
  if (!files.length) return
  Object.keys(files).forEach(key => {
    formData.append('file', files[key]) // 单张或多张图片上传。
  })
  for (let item of formData) console.log(item) // 读取formData中的数据，不能通过formData.a的形式获取。
  formData.forEach((v, i, a) => console.log(v, i, a)) // 读取formData中的数据，不能通过formData.a的形式获取。
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:3000/upload',
    data: formData
  })
  console.log(res)
}

document.querySelector('input').addEventListener('change', onChange)
</script>
```
* 服务端 - `koa-body`
```
const fs = require('fs')

module.exports = (ctx, next) => {
  const req = ctx.request
  const body = req.body // multipart/form-data 类型的普通数据
  const file = req.files.file //  multipart/form-data 类型的文件数据(文件被上传到服务器之后的数据，其中包含文件在服务端的存储路径和文件大小等)
  // const file2 = req.files.file2 //  multipart/form-data 类型的文件数据(文件被上传到服务器之后的数据，其中包含文件在服务端的存储路径和文件大小等)
  ctx.body = { hello: 'upload' }
}
```

# nodejs 服务A把图片传递给服务B
* 注：nodejs无`FormData`对象。可使用：https://github.com/form-data/form-data 包模拟。
```
const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')

module.exports = (ctx, next) => {
  const req = ctx.request
  const body = req.body // multipart/form-data 类型的普通数据
  let file = req.files.file //  multipart/form-data 类型的文件数据(文件被上传到服务器之后的数据，其中包含文件在服务端的存储路径和文件大小等)
  if (!file.length) file = [file]  // 单张图片上传兼容多张图片上传
  // 从本服务器把图片上传到另外一台服务器。
  return new Promise(async (resolve) => {
    const formData = new FormData()
    formData.append('a', '1')
    formData.append('b', '2')
    formData.append('c', '3')
    file.forEach(v => {
      const fileData = fs.createReadStream(v.path)
      formData.append('file', fileData)
    })
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/upload',
      headers: formData.getHeaders(), // 必不可少
      data: formData
    })
    ctx.body = { hello: 'upload' }
    resolve(next())
  })
}
```
