## MongoDB索引介绍
> https://developer.aliyun.com/article/33726

## _id的类型
* mongodb自动生成的`_id`是`ObjectId`类型的数据：`ObjectId("5bdd9083764ad117a550c712")`。

## 删除一个字段
使用update命令
* update命令格式：`db.collection.update(criteria,objNew,upsert,multi)`。
* 参数说明：
    - criteria：查询条件。
    - objNew：update对象和一些更新操作符。
    - upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入。
    - multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新。
* 例如要把User表中address字段删除：`db.User.update({},{$unset:{'address':''}},false,true)`。
* 注：`{'address':''}`值写成空是对的。即使`address`值不为空也可以删掉，如果需要过滤，在第一个`{}`中添加条件过滤即可。

## 联表查询
* mysql有联表查询，mongodb也有联表查询。
* aggregate
  - $lookup

## 分片
* mysql有分表，mongodb有分片。

## 事物
* mysql有事物，mongodb也有事物。
