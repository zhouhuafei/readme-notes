# nodejs测试环境使用，代码变动，服务重启
```
npm i -g nodemon
```
* nodemon.json
```
{
    "ignore": ["dist"],
    "verbose": true,
    "env": {
        "NODE_ENV": "development"
    }
}
```
* 启动服务 - 自动读取nodemon.json
```
nodemon app.js
```