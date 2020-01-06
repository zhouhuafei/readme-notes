> chocolate是windows下的一个命令行的包管理工具，类似ubuntu的apt，或centos下的yum，或macos下的homebrew。

# 官方安装文档
https://chocolatey.org/docs/installation

# win7 - 安装
* 在安装之前，你先要将你的powershell设置为允许执行远程脚本：
  - 管理员身份来打开PowerShell
  - 命令行里输入
  ```
  Set-ExecutionPolicy RemoteSigned
  ```  
* PowerShell v3+ 的安装方式
```
iwr[https://chocolatey.org/install.ps1](https://chocolatey.org/install.ps1) -UseBasicParsing | iex
```

# win10 - 安装
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
```

# 检查是否安装成功
* 在命令输入`choco`，然后回车即可。
```
choco
```
* 能打印出版本号，即为安装成功。
```
Chocolatey v0.10.15
```

# 应用
* 装个chrome
```
choco install googlechrome
```
* 装个winrar
```
choco install winrar
```
* 装个nodejs
```
choco install nodejs.install
```
* 装个redis
```
choco install redis-64
```
* 装个redis-desktop-manager
> redis的可视化数据库管理工具
```
choco install redis-desktop-manager
```
* 装个mongodb
```
choco install mongodb.core
```
* 装个Studio 3T
> mongodb的可视化数据库管理工具
```
choco install studio3t --version=2019.2.1
```
* 装个mysql
> navicat：可视化数据库管理工具
```
choco install mysql
```

# 其他
* 安装包：https://chocolatey.org/packages
* 默认安装路径 C:\ProgramData\Chocolatey
* 定制安装路径 在系统环境变量中新建或者编辑ChocolateyInstall的值为D:\chocolatey
