* req.params
    - 接收路由匹配数据：/list/:id
    - 语法：app.get('/list/:id', function (req, res) {});
    - 案例路由：/list/1/
    - 获取数据：req.params.id
    - 数据结果：1
* req.query
    - 接收GET数据：/list/?key=value
    - 语法：app.get('/list/', function (req, res) {});
    - 案例路由：/list/?id=1
    - 获取数据：req.query.id
    - 数据结果：1
* req.body
    - 接收非GET数据，需使用body-parse模块进行解析。
    - 语法：app.post('/list/', function (req, res) {});
    - 案例路由：/list/
    - 案例数据：id=1
    - 获取数据：req.body.id
    - 数据结果：1
