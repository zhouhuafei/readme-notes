## 压力测试

#### 品牌信息 - uat环境
```
autocannon -c 100 -d 10 https://api-uat-weapp.panasonic.cn/miniapp/brand/brief \
-H token=替换我 \
-H Referer=https://servicewechat.com/wxdfb16d0a9b3d1bd1/devtools/page-frame.html
```

#### 进入直播室 - uat环境
```
autocannon -c 100 -d 10 https://api-uat-weapp.panasonic.cn/miniapp/live_room/info?roomId=35 \
-H token=替换我 \
-H Referer=https://servicewechat.com/wxdfb16d0a9b3d1bd1/devtools/page-frame.html
```
