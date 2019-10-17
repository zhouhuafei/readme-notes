# path模块 - join
> `path.join()`方法使用平台特定的分隔符把全部给定的`path`片段连接到一起，并规范化生成的路径。

# path模块 - resolve
> `path.resolve()`把一个路径或路径片段的序列解析为一个绝对路径。

# 案例
```
// 文件路径 /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/index.js
// 命令路径 /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test
// 执行命令 node ../index.js

console.log(path.join(__dirname, 'a')) // Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/a
console.log(path.join('./', 'a')) // a
console.log(path.join('./', '/a')) // a
console.log(path.join('../', 'a')) // ../a
console.log(path.join('../', '/a')) // ../a

console.log(path.resolve('a')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/a
console.log(path.resolve(__dirname, 'a')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/a
console.log(path.resolve('./', 'a')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test/a
console.log(path.resolve('./', '/a')) // /a
console.log(path.resolve('../', 'a')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/a
console.log(path.resolve('../', '/a')) // /a
console.log(path.resolve('a', '/b', 'c')) // /b/c
console.log(path.resolve('a', 'b', 'c')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test/a/b/c
console.log(path.resolve('/')) // /
console.log(path.resolve()) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test
console.log(path.resolve('./')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json/test
console.log(path.resolve('../')) // /Users/zhouhuafei/Desktop/www/github-zhouhuafei/wx-get-pages-json
```

# 总结
* 在`path.resolve`中，参数如果不存在以`/`开头的路径，则是以node运行时的目录进行拼接的。
  - 此时`./`和`../`则是相对于node运行时的目录。
  - 此时`./`等同于`process.cwd()`。
