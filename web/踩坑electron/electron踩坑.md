# Electron
Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。

## 进程
* 主进程
* 渲染进程

## 主进程和渲染进程通信
* ipcMain：`const { ipcMain } = require('electron')`
  - 主动向渲染进程发消息：mainWindow.webContents.send
    - mainWindow是个变量名。是`new BrowserWindow`的实例。
  - 回复渲染进程的消息：event.reply
* ipcRenderer：`const { ipcRenderer } = require('electron')`
  - 主动向主进程发消息：ipcRenderer.send

## remote
> 在渲染进程中使用主进程模块。
```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```
