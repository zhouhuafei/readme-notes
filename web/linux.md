* 查看和过滤进程
```
ps aux | grep nginx
```
* cd 切换目录
* ls 查看目录
* mkdir 创建目录
* touch 创建文件
* cat 查看文件内容
* vim 编辑器
* vim 编辑器的超级配置
```
https://github.com/ma6174/vim
```
* rm -r 删除目录或者文件
* kill 杀死进程
* find ./ -name xxx.txt 查找xxx.txt文件
* sudo chown -R zhouhuafei:admin node_modules
    - chown命令改变某个文件或目录的所有者和所属的组
* 权限的权重
    - read的权重是1
    - write的权重是2
    - exec的权重是4
* sudo chmod -R 755 node_modules
    - chmod 这是Linux系统管理员最常用到的命令之一,它用于改变文件或目录的访问权限。
    - 第1个7表示owner的权限 rwx 1+2+4 7
    - 第2个5表示group的权限 r-x 1+0+4 5
    - 第3个5表示other的权限 r-x 1+0+4 5
* drwxr-xr-x 和 -rwxr-xr-x
    - d表示目录
    - -表示普通文件
    - rwx 表示owner的权限 1+2+4 7
    - r-x 表示group的权限 1+0+4 5
    - r-x 表示other的权限 1+0+4 5
