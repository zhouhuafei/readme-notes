## 压力测试 - autocannon

#### 品牌信息 - uat环境 - 100的并发循环压10秒
```
autocannon -c 100 -d 10 -p 1 https://api-uat-weapp.panasonic.cn/miniapp/brand/brief \
-H token=替换我 \
-H Referer=https://servicewechat.com/wxdfb16d0a9b3d1bd1/devtools/page-frame.html
```
