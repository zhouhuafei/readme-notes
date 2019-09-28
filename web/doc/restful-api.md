> 摘自：http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html

# URL 设计
* 请求方式：动词 + 宾语
```
GET：读取（Read）
POST：新建（Create）
PUT：更新（Update）
PATCH：更新（Update），通常是部分更新
DELETE：删除（Delete）
```
* 避免多级 URL
    - 错误案例：`GET /articles/published`
        - 这种 URL 不利于扩展，语义也不明确，往往要想一会，才能明白含义。
    - 正确案例：`GET /articles?published=true`
        - 查询字符串的写法明显更好。
