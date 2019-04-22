# 文档
* https://github.com/spmjs/node-scp2
# 案例
```javascript
const client = require('scp2')
console.log('文件上传中...')
// 第一参数为本地路径
client.scp('./dist/', {
  host: '', // 服务器ip
  username: '', // 服务器账号
  password: '', // 服务器密码
  path: '/opt/web/dist/' // 把本地文件存到服务器对应的某个路径
}, (err) => {
  console.log(err ? '文件上传错误！' : '文件上传完成。')
})
```
