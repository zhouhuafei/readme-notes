# 商品信息表
* 通过关联goodsId去生成 - 商品规格项spec-item表。
* 通过关联specItemId去生成 - 商品规格项对应的规格值(spec-value)表。
* 通过关联goodsId去生成 - 货品(product)表。

# 订单(order)表。
* 通过关联orderId去生成 - 支付订单(payment-order)表。
* 通过关联orderId去生成 - 售后订单(after-sale-order)表。

# 记着记着迷糊了，等我后续了解了数据库知识再继续吧。

# 分表
> 表可以动态创建
* 分表方式一：定好表的数量，然后取模存储。
* 分表方式二：定好数据数量，超出存另一张表(建议)。
