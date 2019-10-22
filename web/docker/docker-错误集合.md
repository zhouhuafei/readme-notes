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
