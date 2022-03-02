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
