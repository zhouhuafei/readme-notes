# 工具
* https://github.com/SheetJS/js-xlsx
* https://github.com/mgcrea/node-xlsx

* nodejs导入文件
    - 通过浏览器(客户端)导入文件，走的其实就是文件上传。
    - nodejs服务拿到FormData类型(```Content-Type: multipart/form-data```)的数据之后，把文件存储起来。或直接解析。或先存储后解析。
    - 解析完再把数据存到数据库。

* nodejs导出，让浏览器自行下载
```
res.set({
  'Content-Type': 'application/octet-stream',  // 告诉浏览器这是一个二进制文件
  'Content-Disposition': 'attachment; filename=upload.png'  // 告诉浏览器这是一个附件要下载是png图片
})
res.end(data)
```
