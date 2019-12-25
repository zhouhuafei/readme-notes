> 配置案例：https://github.com/zhouhuafei/wx-key-replace

# 使之引入nodejs原生模块不报错
* 安装`@types/node`依赖即可：
```
npm install --save-dev @types/node
```
* 使用：
```
import * fs path from 'fs'
import * as path from 'path'
// 或(写nodejs我推荐以require的形式写)
const fs = require('fs')
const path = require('path')
```
