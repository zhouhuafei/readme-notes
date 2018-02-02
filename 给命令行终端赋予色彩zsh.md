# 给终端赋予色彩
* brew install zsh 

# 安装 oh-my-zsh（这个开源项目主要简化我们对 zsh 的配置）  
```
curl -L [https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh](https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh)| sh
```

# 更改默认使用的shell
* 查看可以使用的 shell,使用命令
```
cat /etc/shells
```
* 查看当前默认使用的shell
```
echo $SHELL 
```
* 修改默认shell为zsh
```
chsh -s /bin/zsh
```
* 退出 iterm,重新打开就可以了

# curl
curl是利用URL语法在命令行方式下工作的开源文件传输工具。它被广泛应用在Unix、多种Linux发行版中，并且有DOS和Win32、Win64下的移植版本。