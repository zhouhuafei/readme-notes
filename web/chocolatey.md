* chocolate是windows下的一个命令行的包管理工具，类似ubuntu的apt，或centos下的yum，或macos下的homebrew。 
* 在安装之前，你先要将你的powershell设置为允许执行远程脚本：
  - 管理员身份来打开PowerShell
  - 命令行里输入
```
Set-ExecutionPolicy RemoteSigned
```  
* PowerShell v3+ 的安装方式 
```
iwr[https://chocolatey.org/install.ps1](https://chocolatey.org/install.ps1) -UseBasicParsing | iex 
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
* more https://chocolatey.org/packages
* 默认安装路径 C:\ProgramData\Chocolatey
* 定制安装路径 在系统环境变量中新建或者编辑ChocolateyInstall的值为D:\chocolatey
