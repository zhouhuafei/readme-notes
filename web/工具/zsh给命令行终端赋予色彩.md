## 给终端赋予色彩
* 给终端赋予色彩：`brew install zsh`。

## 安装 oh-my-zsh
> 这个开源项目主要简化我们对 zsh 的配置
```
curl -L [https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh](https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh)| sh
```

## 管道符`|`
* 竖线`|`，是linux中的管道符之一。它可以将`|`前面命令的输出作为`|`后面的输入。
  - 案例：`ls | wc -l`。
  - 使用`ls`命令列出文件夹中的所有文件，通过管道符连接`wc`命令，可以统计文件夹中文件的数量。
* 管道符`>`和`>>`可以把`jd_get_share_code.js`运行时打印出的日志写入到一个文件里。前者覆盖文件内容，后者追加文件内容。
  - 案例：`node /scripts/jd_get_share_code.js > /scripts/logs/jd_get_share_code.init.log`。

## 更改默认使用的shell
* 查看可以使用的shell：`cat /etc/shells`。
* 查看当前默认使用的shell：`echo $SHELL`。
* 修改默认shell为zsh：`chsh -s /bin/zsh`。然后退出iterm，重新打开就可以了。

## curl
* curl是利用URL语法在命令行方式下工作的开源文件传输工具。
* 它被广泛应用在Unix、多种Linux发行版中，并且有DOS和Win32、Win64下的移植版本。
