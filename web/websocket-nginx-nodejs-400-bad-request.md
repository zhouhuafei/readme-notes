* websocket.io使用的时候在本地是正常的
* 到了线上之后，会出现400 bad request报错
* 虽然能正常使用，但是感觉怪怪的
* 问题的原因是nginx没有进行正确的配置
* 只需要进行如下配置即可
* 以下nginx配置
```
server {
	listen 80;
	server_name www.xxx.top;
	location / {
        proxy_pass http://127.0.0.1:5553;
        proxy_http_version 1.1;
        proxy_set_header upgrade $http_upgrade;
        proxy_set_header connection "upgrade";
	}
}
```
