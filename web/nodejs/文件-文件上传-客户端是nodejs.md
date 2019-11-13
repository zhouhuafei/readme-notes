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
  formData.append('file', e.target.files[0]) // 多张图片要多个键值对，后端也是多个键值对接收，建议多次打接口。
  // formData.append('file2', e.target.files[1]) // 多张图片要多个键值对，后端也是多个键值对接收，建议多次打接口。
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
  const file = req.files.file //  multipart/form-data 类型的文件数据(文件被上传到服务器之后的数据，其中包含文件在服务端的存储路径和文件大小等)
  // 从本服务器把图片上传到另外一台服务器。
  return new Promise(async (resolve) => {
    const fileData = fs.createReadStream(file.path)
    const formData = new FormData()
    formData.append('a', '1')
    formData.append('b', '2')
    formData.append('c', '3')
    formData.append('file', fileData) // 多张图片要多个键值对，后端也是多个键值对接收，建议多次打接口。
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
