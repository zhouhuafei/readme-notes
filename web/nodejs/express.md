# 基础
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

# 踩坑中间件
* connect-history-api-fallback
    - 重点：这句代码需要在express.static上面
    ```
    app.use(history({
      index: '/decoration/index.html'
    }));
    ```
* http-proxy-middleware
    - 后缀不一样，需要设置pathRewrite，进行后缀匹配。
    ```
    app.use('/api/', proxy({
     target: 'https://yapi.ishopex.cn', // 目标服务器 host
     pathRewrite: {
       '/api/': '/mock/103/',     // 重写请求，比如我们源访问的是/api，那么请求会被解析为/mock/103/
     },
     changeOrigin: true,
    }));
    ```

# express动态路由解析用的什么包？
* https://github.com/pillarjs/path-to-regexp

# 动态路由跳转
* vue-router可以使用路由的name配合params自动填充参数进行跳转(```如果提供了path，params会被忽略```)。
```
this.$router.push({name: 'user', params: {userId: 123}});
```
* express呢？个人建议：
    - 定一个```routeFormat```字段，存储路由格式。
    - 定一个```routerPath```字段，可用来直接跳转。
    - 动态路由部分建议放到末尾。如此，跳转路径时进行路由路径(route)拼接会方便一点。或者像vue-router那样，封装一个可以根据name和params配合路由格式自动生成正确路径的方法。
