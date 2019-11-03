# windows10安装docker时，报如下错误。
* 报错信息：`Docker Desktop requires Windows 10 Pro or Enterprise version 15063 to run.`。
* 解决方案1：windows10家庭版无法安装docker，需要下载`docker toolbox`安装。
* 解决方案2：windows10家庭版升级为专业版(我使用的这个方案)。
    - 操作：`此电脑-属性-更改产品密钥`。
    - 百度找一个秘钥：`4N7JM-CV98F-WY9XX-9D8CF-369TT`。
* 升级为专业版之后，一路next进行docker的安装即可。
    - 安装成功之后，安装的界面上有个退出并关闭的按钮，我点了一下，然后电脑就重启了。
    - 重启之后，docker会自动启动。
    - docker启动之后会检测`Hyper-V`有没有开启，没有开启的话，会弹窗提示你，让你开启。
    - 点击开启即可，开启之后，又会重启一次电脑。
* 手动开启`Hyper-V`。
    - 1、鼠标右键单击电脑左下角的 Windows 图标并选择`应用和功能`。
    - 2、选择`程序和功能`。
    - 3、选择`启用或关闭 Windows 功能`。
    - 4、找到`Hyper-V`并勾选。
    - 5、点击确定即可。

# `docker pull ubuntu`和`docker search ubuntu`时，报如下错误。
* `docker pull ubuntu`的报错信息如下。
```
Error response from daemon: Get https://registry-1.docker.io/v2/library/ubuntu/manifests/latest: Get https://auth.docker.io/token?scope=repository%3Alibrary%2Fubuntu%3Apull&service=registry.docker.io: net/http: TLS handshake timeout
```
* `docker search ubuntu`的报错信息如下。
```
Error response from daemon: Get https://index.docker.io/v1/search?q=ubuntu&n=25: net/http: TLS handshake timeout
```
> 解决方案1：上述两个问题都能修复。
* 原因：移动宽带网络问题
* 解决方案：使用手机热点(我使用的是联通手机热点)
> 解决方案2：只能修复`docker pull ubuntu`报错的问题。
* 使用中国镜像
  - 右键点击桌面顶栏的`docker`图标，选择`Preferences`。
  - 在`Daemon`标签(`Docker 17.03`之前版本为`Advanced`标签)下的`Registry mirrors`列表中。
  - 加入镜像地址：http://141e5461.m.daocloud.io
  - 点击`Apply & Restart`。
  > 或者
  - 先找到守护进程文件：`sudo find / -name daemon.json`。
  - 再修改守护进程文件：在`registry-mirrors`对应的数组中加入：http://141e5461.m.daocloud.io
  - 重启`docker`。
