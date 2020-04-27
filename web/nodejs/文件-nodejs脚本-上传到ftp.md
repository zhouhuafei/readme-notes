## 文档
* https://github.com/spmjs/node-scp2

## 案例1
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

## 案例2
```javascript
const fs = require('fs')
const scp2 = require('scp2')
const Ftp = require('ssh2-sftp-client')
const compressing = require('compressing')
const ftpClient = new Ftp()
const port = 22
const host = '134.175.220.145'
const user = 'cddev'
const password = 'cddev@123'

function upload () {
  return new Promise((resolve, reject) => {
    console.log('dev环境文件上传中...')
    scp2.scp('./dist-zip/', {
      host,
      username: user,
      password,
      path: '/opt/web/miniapp/'
    }, (err) => {
      if (err) {
        reject('dev环境文件上传错误!!!')
      } else {
        const txt = 'dev环境文件上传完成!!!'
        console.log(txt)
        resolve(txt)
      }
      ftpClient.end()
    })
  })
}

async function zip () {
  try {
    fs.mkdirSync('./dist-zip')
  } catch (e) {
  }
  console.log('zip打包中...')
  const res = compressing.zip.compressDir('./dist', './dist-zip/dist.zip')
  console.log('zip已打包...')
  return res
}

async function connectFtp () {
  await zip()
  console.log('ftp连接中...')
  await ftpClient.connect({ host, port, user, password })
  console.log('ftp已连接!!!')
  const res1 = await ftpClient.mkdir('/opt/web/miniapp')
  let res3 = ''
  if (~res1.indexOf('directory created')) {
    console.log('miniapp目录不存在!!!')
    console.log('miniapp目录已创建!!!')
    res3 = await upload()
  } else if (~res1.indexOf('already exists')) {
    console.log('miniapp目录已存在!!!')
    console.log('miniapp目录删除中...')
    const res2 = await ftpClient.rmdir('/opt/web/miniapp', true)
    if (~res2.indexOf('removed directory')) {
      console.log('miniapp目录已删除!!!')
      console.log('miniapp目录创建中...')
      await ftpClient.mkdir('/opt/web/miniapp')
      console.log('miniapp目录已创建!!!')
      res3 = await upload()
    }
  }
  return res3
}

connectFtp().finally() // 不加then/catch/finally编辑器报警告有点难受
```
