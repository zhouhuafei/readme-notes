# Unexpected token: name (Sub)
```
ERROR in js/pages/app.84d0f892e6e0ae17320a.js from UglifyJs
Unexpected token: name (Sub) [./node_modules/zhf.g-ui/src/js/components_dom/g-message/index.js:6,0][js/pages/app.84d0f892e6e0ae17320a.js:2344,6]
```
* 原因：使用的node_modules包中的文件包含es6的语法。而webpack的loader配置里我使用exclude过滤掉了node_mosules文件。
* 解决：只需要把exclude注释掉即可。
