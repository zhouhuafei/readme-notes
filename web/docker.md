# 下载
* Docker for Windows 在Windows上运行Docker。系统要求，Windows10x64位，支持Hyper-V。
* Docker for Mac 在Mac上运行Docker。系统要求，OS X 10.10.3 或者更高版本，至少4G内存，4.3.30版本以前的VirtualBox会与Docker for Mac产生冲突，所以请卸载旧版本的VitrualBox。
* 如果您的电脑版本过旧，可以使用 Docker Toolbox 在Windows或者Mac上运行Docker。适用于Mac OS X 10.8+ 或者 Windows 7/8.1。
* https://get.daocloud.io/#install-docker-for-mac-windows

# 官网
* 注册账号 https://hub.docker.com/

# Windows7 安装
* 下载Docker Toolbox。
* 一路next即可完成安装。
* 我是win7，所以是按照这种方式安装的，下面的Windows10x64 安装，我并没有进行亲自尝试。
* 本人参考了这篇博客 https://blog.csdn.net/qq2712193/article/details/54576313

# Windows10x64 安装
* 安装
```
choco install docker-for-windows --pre
```
* 安装目录
    - chocolatey的安装路径在哪，通过choco安装的东西就会在对应的地方。
    - 我本地把chocolatey的安装路径定制到了D盘。
    - 详情请参阅同级目录里的chocolatey.md文件。
    - https://chocolatey.org/packages/docker-for-windows
    ```
    D:\chocolatey\lib\docker-for-windows\tools\
    tools\chocolateyinstall.ps1
    tools\chocolateyuninstall.ps1
    ```
* 更新
```
choco upgrade docker-for-windows --pre
```

# docker应用
* docker默认ip 192.168.99.100 查看命令如下
```
docker-machine ip default
```

