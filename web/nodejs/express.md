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
    - 定一个```routeFormat```字段，存储路由格式。我的suibianxiexie项目中定义的字段名是```route```。
    - 然后路由的路径根绝路由格式进行动态拼接。
    - 动态路由部分建议放到末尾。如此，跳转路径时进行路由路径(route)拼接会方便一点。通过方法统一生成就不用在意是否放在末尾了，因为每次直接调方法即可。不用每次都手动拼接。
    - 或者像vue-router那样，封装一个可以根据name和params配合路由格式自动生成正确路径的方法。
    - 总结：动态路由不能直接拿路由格式当路由路径进行跳转。
* vue-router有些做法真的很赞
    - 例如有查询字符串时，vue-router跳转路由可以自动拼接。我用express时，还需要手动封装方法或者手动拼接进行跳转。
    - 例如是动态路由的情况，vue-router跳转路由可以自动拼接。我用express时，还需要手动封装方法或者手动拼接进行跳转。
    - vue-router提供跳转方法直接就可以进行拼接。这点是赞的。express中使用ejs模版渲染路由路径时还需要自己封装方法并调用。

# 内嵌web-view时ios和安卓或者小程序环境判断。
* 微信和百度小程序提供的都有SDK可以使用。
* 如果没有SDK的话。
    - 微好店中，使用的查询字符串，后端是php。如果用express，入口链接上加```?platform=platformValue```。然后超类里进行拦截设置即可。
    ```
    req.query.platform = 'wx'; // 在设置之前，还需检测来源有无```platform```字段，有则存，然后检测存储的有无，有则设置。(设置后，虽然url上无法呈现，但是内存里有值，可输出给js使用)
    ```
    - 如果用的vue，入口链接上加```?platform=platformValue```。然后则只需要在vue-router的beforeEach守卫中拦截设置接口。
    ```
    router.beforeEach((to, from, next) => {
        to.query.platform = 'wx'; // 在设置之前，还需检测来源有无```platform```字段，有则存，然后检测存储的有无，有则设置。(设置后，虽然url上无法呈现，但是内存里有值。可直接使用)
    });
    ```
    - 或者所有链接都使用动态路由```/:platform```。入口链接上加```/platformValue```。然后同上需要检测有无```platform```字段，有则存，然后检测有无存储，有则设置。
* 如果不是内嵌的web-view。只需要打接口的时候带着```platform```字段即可。上述的目的其实也是为了打接口的时候带着```platform```字段。
