* 查看和过滤进程
```
ps aux | grep nginx
```
* cd 切换目录
* ls 查看目录
* mkdir 创建目录 -p 表示递归创建目录
* touch 创建文件
* cat 查看文件内容
* vim 编辑器
* vim 编辑器的超级配置 https://github.com/ma6174/vim
* rm -r 删除目录或者文件
* kill 杀死进程
* find ./ -name xxx.txt 查找xxx.txt文件
* grep 我是要被搜索的字符串 ./test.html 搜索test.html文件里是否包含某个字符串
    - 递归查找目录下含有该字符串的所有文件
    ```
    grep -rn 我是要被搜索的字符串 ./
    ```
    - grep选项：
    ```
    *  表示当前目录所有文件，也可以是某个文件名
    -r 是递归查找
    -n 是显示行号
    -R 查找所有文件包含子目录
    -i 忽略大小写
    -w 只匹配整个单词，而不是字符串的一部分（如匹配‘magic’，而不是‘magical’）
    ```
* sudo chown -R zhouhuafei:admin node_modules
    - chown命令改变某个文件或目录的所有者和所属的组
* 权限的权重
    - read的权重是4
    - write的权重是2
    - exec的权重是1
* sudo chmod -R 755 node_modules
    - -f表示强制删除文件或目录
    - -r或-R表示递归处理，将指定目录下的所有文件与子目录一并处理
    - chmod 这是Linux系统管理员最常用到的命令之一，它用于改变文件或目录的访问权限
    - 第1个7表示owner的权限 rwx 4+2+1 7
    - 第2个5表示group的权限 r-x 4+0+1 5
    - 第3个5表示other的权限 r-x 4+0+1 5
* `sudo chmod +x /usr/local/bin/gitlab-runner`的意思就是给`gitlab-runner`增加可执行权限
  - `u`表示该档案的拥有者，`g`表示与该档案的拥有者属于同一个群体(group)者，`o`表示其他以外的人，`a`表示这三者皆是。
  - `+`表示增加权限、`-`表示取消权限，`=`表示唯一设定权限。
  - `chmod a=rwx file`和`chmod 777 file`效果相同。
* drwxr-xr-x 和 -rwxr-xr-x
    - d表示目录
    - -表示普通文件
    - r读 w写 x执行
    - rwx 表示owner的权限 4+2+1 7
    - r-x 表示group的权限 4+0+1 5
    - r-x 表示other的权限 4+0+1 5
* 常用权限：777(不常用) 775(不常用) 755(常用)
    - 以755(常用)为例
    - 第1个数字7表示：所属用户
    - 第2个数字5表示：所属组
    - 第3个数字5表示：其他
* linux中`lrwxrwxrwx`是什么意思？
  - 第一个符号代表文件类型：`d`是文件夹、`l`是连接文件，`-`是普通文件。
  - 后面的是权限：`r`是读取、`w`是写入、`x`是执行，3个为1段。
    - 第1段代表的是建立这个文件的用户权限。
    - 第2段为建立这个文件的用户所属组的权限。
    - 第3段为其他用户的权限。

* linux 重命名文件和文件夹
> linux下重命名文件或文件夹的命令mv既可以重命名，又可以移动文件或文件夹。
 - 例子：将目录A重命名为B```mv A B```。
 - 例子：将/a目录移动到/b下，并重命名为c```mv /a /b/c```。

* 使用指令"cp"将当前目录"test/"下的所有文件复制到新目录"newtest"下，输入如下命令：```cp –r test/ newtest```。

* 查看目录下有多少个文件及文件夹```ls | wc -w```。

* 怎么区分一命令是不是系统命令：使用`type`命令进行区分。
  - `type ls`：`ls is an alias for ls -G`
  - `type cd`：`cd is a shell builtin`
  - `type node`：`node is /usr/local/bin/node`
  - `type npm`：`npm is /usr/local/bin/npm`
  - `type type`: `type is a shell builtin`

* `sh -c`：它可以让`bash`将一个字串作为完整的命令来执行。
  - 案例1：`docker exec -i jd_scripts /bin/sh -c "node /scripts/jd_bean_change.js"`。
  - 案例2：`sudo sh -c 'echo "又一行信息" >> test.asc'`。

* `grep 文案 -A/-B/-C 后面都跟阿拉伯数字`。
  - `-A`是显示匹配行和它后面的n行。
  - `-B`是显示匹配行和它前面的n行。
  - `-C`是匹配行和它前后各n行。
  - 案例：`cat jd_fruit.log | grep 之后 -B 4`。

* linux的rz命令和sz命令 - 在服务器上对客户端进行文件的接收和发送
  > `yum install lrzsz -y`
  - rz命令（Receive ZMODEM），使用ZMODEM协议，将本地文件批量上传到远程服务器。注意不能上传文件夹。
    - 案例：`rz`
  - sz命令（Send ZMODEM），使用ZMODEM协议，将多个文件从远程服务器下载到本地。注意不能下载文件夹，如果下载文件夹，请先打包再下载。
    - 案例：`sz filename1 filename2`
  - `linux`系统中打`rz`命令后出现`waiting to receive.**B0100000023be50`而没有出现选择文件弹出框？
    - 客户端系统：`Windows10`。
    - 我本来用的是`Git Bash`不行，后来用`XShell`就可以了。
    - `rz`与`sz`需要端支持。终端就是连接远程服务器的客户端，例如`XShell`、`SecureCRT`等。

* linux的zip命令 - 文件的压缩和解压
  > `yum install -y unzip zip`
  - 压缩成zip格式：`zip -q -r renwolesshel.zip renwolesshel/`
  - 解压zip格式的压缩包：`unzip renwolesshel.zip`

* linux查看占用端口进程的PID：`lsof -i:7001`。
* 然后根据PID可以kill掉相关进程：`kill -9 5291`。
