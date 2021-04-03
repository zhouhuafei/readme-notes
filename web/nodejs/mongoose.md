> 文档：http://www.mongoosejs.net/docs/

### `$where`函数用法读取不到外部变量，需要使用字符串的用法。
```javascript
this.ctx.model.Log.find({
  // 效率低下 - 慎用 - 此案例可以通过存成字符串配合正则$regex实现
  /*
  $where: function () { // 注意：函数方式拿不到外部变量
    return String(this.req.value).match(new RegExp('55'))
  }
  */
  $where: `
    String(this.req.value).match(new RegExp(${query.req}))&&
    String(this.res.value).match(new RegExp(${query.res}))&&
    String(this.ext.value).match(new RegExp(${query.ext}))
  `
})
```
