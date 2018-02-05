* nodejs生产环境使用
# pm2.json
```
{
    "apps": [
        {
            "name": "xxx",
            "script": "app.js",
            "exec_mode": "cluster",
            "instances": 2,
            "ignore_watch": ["dist"],
            "watch": true,
            "env": {
                "NODE_ENV": "production"
            }
        }
    ]
}
```
# pm2 command
* pm2 start pm2.json
* pm2 stop all
* pm2 restart all
* pm2 reload all
* pm2 delete id // 杀死某个进程
* pm2 kill // 杀死全部进程

# 开机自启动
1. pm2 start pm2.json
2. pm2 save
3. pm2 startup