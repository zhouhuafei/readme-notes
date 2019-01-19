rest 是标准

restful 是基于rest标准的服务

以前写接口多是GET和POST请求
```
增 http://127.0.0.1/user/save/
删 http://127.0.0.1/user/delete/
改 http://127.0.0.1/user/update/
查 http://127.0.0.1/user/query/
```

基于rest标准的接口
```
增 http://127.0.0.1/user/ POST请求
删 http://127.0.0.1/user/ DELETE请求
改 http://127.0.0.1/user/ PUT请求
查 http://127.0.0.1/user/ GET请求
```
