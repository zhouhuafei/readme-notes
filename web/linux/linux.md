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
    - -r或-R表示递归处理,将指定目录下的所有文件与子目录一并处理
    - chmod 这是Linux系统管理员最常用到的命令之一,它用于改变文件或目录的访问权限
    - 第1个7表示owner的权限 rwx 4+2+1 7
    - 第2个5表示group的权限 r-x 4+0+1 5
    - 第3个5表示other的权限 r-x 4+0+1 5
* drwxr-xr-x 和 -rwxr-xr-x
    - d表示目录
    - -表示普通文件
    - r读 w写 x执行
    - rwx 表示owner的权限 4+2+1 7
    - r-x 表示group的权限 4+0+1 5
    - r-x 表示other的权限 4+0+1 5

* linux 重命名文件和文件夹
> linux下重命名文件或文件夹的命令mv既可以重命名，又可以移动文件或文件夹。
 - 例子：将目录A重命名为B```mv A B```。
 - 例子：将/a目录移动到/b下，并重命名为c```mv /a /b/c```。

* 查看目录下有多少个文件及文件夹```ls | wc -w```。
