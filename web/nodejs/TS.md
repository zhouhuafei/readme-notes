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
```
