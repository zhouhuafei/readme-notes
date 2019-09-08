# 为域名申请SSL证书
* 为自己的域名申请SSL证书(购买SSL证书)，也有免费SSL证书。自行获取。
* 我个人买的是阿里云的域名，我管理域名的时候，看到了一个SSL证书的入口，就去申请了一个免费的一年SSL证书。
* 域名解析的时候会多加一条```_dnsauth```记录，记录类型是```TXT```，这条记录是系统自动加上的(我购买的阿里的域名，申请SSL证书的流程中，勾选对应选项系统可以自动添加)。

# 默认端口
* http: 80(云服务器上要开启这个端口)
* https: 443(云服务器上要开启这个端口)

# nodejs(express)为网站配置SSL证书
```javascript
const fs = require('fs');
const http = require('http');
const https = require('https');
const httpServer = http.createServer(app);
const privateKey = fs.readFileSync('./https/index.key', 'utf8');
const certificate = fs.readFileSync('./https/index.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);
// http
const serverHttp = httpServer.listen('5551', function () {
    console.log('server connection open to:\n', `http://localhost:${serverHttp.address().port}`);
});
// https
const serverHttps = httpsServer.listen('55551', function () {
    console.log('server connection open to:\n', `https://localhost:${serverHttps.address().port}`);
});
```

# nginx为网站配置SSL证书
* 建议参考这个：https://aotu.io/notes/2016/08/16/nginx-https/index.html
```
server {
    listen 443;
    server_name www.sbxx.top sbxx.top;

    ssl on;
    ssl_certificate /root/suibianxiexie/https/index.pem;
    ssl_certificate_key /root/suibianxiexie/https/index.key;
    ssl_session_timeout 5m;

    location / {
        proxy_pass https://127.0.0.1:55551;
        proxy_set_header x-real-ip $remote_addr;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header host $http_host;
    }
}
```

# nginx检测到http就跳转到https
```
server {
    listen 80;
    server_name www.sbxx.top sbxx.top;
    # 这是ngixn早前的写法，现在还可以使用。
    rewrite ^(.*)$  https://$host$1 permanent;
    # 这是nginx最新支持的写法。
    return 301 https://$server_name$request_uri;
    location / {
        proxy_pass http://127.0.0.1:5551;
        proxy_set_header x-real-ip $remote_addr;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header host $http_host;
    }
}
```

# ssl证书的key和pem放到github上安全么？
* 不安全，https通过key和pem进行加密解密可以防止数据被篡改，如果别人知道了你的加密和解密方式，那么你的数据就不安全了。
* 以上言论纯属个人猜测。

# https无法引用http资源
