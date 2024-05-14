## 右键设计反人类
#### 以管理员身份运行cmd
#### 若恢复win10右键则需运行下述命令：
`reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve`
#### 若恢复win11右键则需运行下述命令：
`reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f`
#### 重启explorer.exe
* 在任务管理器中找到`Windows 资源管理器`，右键重启即可。

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
