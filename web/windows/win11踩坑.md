## win11激活
* 用win10激活工具去激活win11，激活成功。我百度网盘里存储的有相关激活工具。
* 激活的时候，win11的安全防护机制会出提示并把激活工具删除掉。
* 需要先关闭掉win11的安全防护，如果还是出提示，要根据提示，把激活工具手动设置为允许执行。
* 如果还是出提示，就把提示关闭，继续安装。总之就是要多试几次，只要绕过win11的安全防护机制，就能成功安装激活工具。
* 安装完成后，运行激活工具，就可以激活成功。激活成功后，再把安全防护打开。

## 锁屏的Windows聚焦没生效
* 把锁屏的Windows聚焦改为图片
* 清空`C:\Users\11234\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\Settings`目录里的所有文件
  - 需要把`11234`改为你自己的用户名
* 把锁屏改回Windows聚焦
* 把上述步骤多次几次或重启电脑后再多试几次
* 实测有效

## 右键设计反人类
#### 1、以管理员身份运行cmd
#### 2、运行下述命令
`reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve`
#### 3、重启explorer.exe
* 在任务管理器中找到`Windows 资源管理器`，右键重启即可。
* 或使用`taskkill /f /im explorer.exe & start explorer.exe`命令进行重启。

## `Windows.old`目录删除不掉？
* 对`Windows.old`目录进行右键，磁盘清理。

## dll文件缺失？
* `nvdlistx.dll`文件和`nvdlist.dll`文件缺失？
  - 手动去网上下载对应文件，放入到缺失的目录中即可（报错信息里有缺失文件的路径）。

## 联想动态锁屏壁纸？
* 联想电脑管家 - 工具箱 - 联想锁屏 - 开启推荐模式

## 安装docker时
* 搜索并打开`启用或关闭 Windows 功能`。随后找到`Hyper-V`并勾选即可。
* Docker Desktop一直启动中（Starting the Docker Engine...），可以试试`以管理员身份运行`。

## 关闭开机自启动
* 打开`任务管理器` -> 点击`启动应用` -> 选中某个应用并右键 -> 点击启用或禁用即可开启和关闭开机自启动。

## C盘爆满
* 去这个目录`C:\Users\dell`下，找大文件，删掉。`dell`是用户名。
* 这个目录`C:\Users\dell\AppData`下，有很多大文件，可酌情删减。
* 我删掉了`C:\Users\dell\AppData\Local`下的`微信开发者工具`目录，省出了`20G`的空间。
