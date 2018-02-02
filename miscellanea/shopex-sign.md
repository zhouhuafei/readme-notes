# 登录
* 登录的接口
```
post
http://oa.shopex.cn:89/client.do
method=login&loginid=s2896&password=e56&isneedmoulds=1&client=1&clientver=6.5.13&udid=865736039509164&token=&clientos=NMF26X&clientosver=7.1.1&clienttype=android&language=zh&country=CN&authcode=&dynapass=&tokenpass=&relogin=0&clientuserid=
```

* 签到的接口
```
post
http://oa.shopex.cn:89/client.do?method=checkin&type=checkin&latlng=31.168043,121.417915&addr=%E4%B8%8A%E6%B5%B7%E5%B8%82%E5%BE%90%E6%B1%87%E5%8C%BA%E6%A1%82%E6%9E%97%E8%B7%AF%E9%9D%A0%E8%BF%91%E4%B8%AD%E6%A0%B8%E6%B5%A6%E5%8E%9F%E7%A7%91%E6%8A%80%E5%9B%AD&sessionkey=abcbcTQlUiwES4dx6Unbw
```

* 签退的接口
```
post
http://oa.shopex.cn:89/client.do?method=checkin&type=checkout&latlng=31.168059,121.417951&addr=%E4%B8%8A%E6%B5%B7%E5%B8%82%E5%BE%90%E6%B1%87%E5%8C%BA%E6%A1%82%E6%9E%97%E8%B7%AF%E9%9D%A0%E8%BF%91%E4%B8%AD%E6%A0%B8%E6%B5%A6%E5%8E%9F%E7%A7%91%E6%8A%80%E5%9B%AD&sessionkey=abcbcTQlUiwES4dx6Unbw
```

* 退出的接口
```
post
http://oa.shopex.cn:89/client.do?method=logout&sessionkey=abcbcTQlUiwES4dx6Unbw
```
