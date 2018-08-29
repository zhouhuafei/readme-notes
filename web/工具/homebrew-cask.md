* 主要用来下载一些带界面的应用软件，下载好后会自动安装，并能在mac中直接运行使用，安装完brew时，brew-cask已经安装好了，无需额外安装

* redis-desktop-manager
```
brew cask install rdm 
```

* 谷歌浏览器
```
brew cask install google-chrome 
```

* qq
```
brew cask install qq
```

* 路径
```
/usr/local/Caskroom/ 
```
* 应用程序会自动被放到您的applications文件夹,这里只展示通过brew-cask安装过哪些软件,当然可以直接使用命令brew cask list查看你安装过哪些软件
```
brew cask list
```

# 下载软件包在哪?
* 使用下面这个命令可以看到
```
brew --cache 
```
* 但是貌似并没有什么卵用,应该是程序自动删除了安装包,或者本身就没有安装包 