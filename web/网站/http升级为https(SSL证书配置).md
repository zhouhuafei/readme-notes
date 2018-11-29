# 为域名申请SSL证书
* 为自己的域名申请SSL证书(购买SSL证书)，也有免费SSL证书。自行获取。
* 我个人买的是阿里云的域名，我管理域名的时候，看到了一个SSL证书的入口，就去申请了一个免费的一年SSL证书。
* 域名解析的时候会多加一条```_dnsauth```记录，记录类型是```TXT```，这条记录是系统自动加上的(我购买的阿里的域名，申请SSL证书的流程中，勾选对应选项系统可以自动添加)。

# 默认端口
* http: 80
* https: 443

# nginx为网站配置SSL证书
* 待续...

# nodejs为网站配置SSL证书
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
