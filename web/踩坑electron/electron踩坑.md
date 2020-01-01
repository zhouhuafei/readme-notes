# Electron
Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。

## 主进程读取一些实例
> 直接从`electron`上读取即可。
```
const { ipcMain } = require('electron')
```

## 渲染进程读取一些实例
> 需要从`remote`上读取。
```
const { ipcRenderer } = require('electron').remote
```

## 主进程和渲染进程通信
* ipcMain
* ipcRenderer
