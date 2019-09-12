# 工具
* https://github.com/SheetJS/js-xlsx
* https://github.com/mgcrea/node-xlsx
* https://github.com/functionscope/Node-Excel-Export

# 参考文章
* https://www.cnblogs.com/cyfhykx/p/9121176.html

# nodejs导入文件
* 通过浏览器(客户端)导入文件，走的其实就是文件上传。
* nodejs服务拿到FormData类型(```Content-Type: multipart/form-data```)的数据之后，把文件存储起来。或直接解析。或先存储后解析。
* 解析完再把数据存到数据库。

# nodejs导出，让浏览器自行下载
* 导出excel
```
const nodeExcel = require('excel-export');
async function exportdata () {
  const v = [
    { name: '张三', age: '20', sex: '男', birthday: '1998-10-10' },
    { name: '李四', age: '21', sex: '男', birthday: '1997-08-08' },
    { name: '王五', age: '22', sex: '男', birthday: '1996-06-06' },
    { name: '赵六', age: '20', sex: '男', birthday: '1998-12-12' }
  ]
  let conf = {}
  conf.name = '表格名' // 表格名
  let allData = []
  for (let i = 0; i < v.length; i++) {
    let arr = []
    arr.push(v[i].name)
    arr.push(v[i].age)
    arr.push(v[i].sex)
    arr.push(v[i].birthday)
    allData.push(arr)
  }
  // 决定列名和类型
  conf.cols = [
    { caption: '姓名', type: 'string' },
    { caption: '年龄', type: 'number' },
    { caption: '性别', type: 'string' },
    { caption: '出生日期', type: 'string', width: 280 }
  ]
  conf.rows = allData // 填充数据
  let result = nodeExcel.execute(conf)
  // express框架是如下写法
  // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  // res.end(result, 'binary');
  // koa框架是如下写法
  let data = new Buffer(result, 'binary')
  ctx.set('Content-Type', 'application/vnd.openxmlformats')
  ctx.set('Content-Disposition', 'attachment; filename=' + 'Report.xlsx')
  ctx.body = data
}
```
* 导出图片
```
res.set({
  'Content-Type': 'application/octet-stream',  // 告诉浏览器这是一个二进制文件
  'Content-Disposition': 'attachment; filename=upload.png'  // 告诉浏览器这是一个附件要下载是png图片
})
res.end(data)
```
