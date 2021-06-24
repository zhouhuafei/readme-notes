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

# 开机自启动解释
* 运行`pm2 startup`，即在`/etc/init.d/`目录下生成`pm2-root`的启动脚本，且自动将`pm2-root`设为服务。
* 运行`pm2 save`，会将当前pm2所运行的应用保存在`/root/.pm2/dump.pm2`下，当开机重启时，运行`pm2-root`服务脚本，并且到`/root/.pm2/dump.pm2`下读取应用并启动。
```
sudo pm2 start xxxx  // 启动服务
sudo pm2 save // 保存服务
sudo pm2 startup // 把已启动服务加到systemd中
sudo systemctl reboot // 重启，发现之前的服务都已经启动
sudo pm2 unstartup systemd // 删除自动启动服务
```
