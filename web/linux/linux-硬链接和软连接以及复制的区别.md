> ###### linux硬链接和软链接以及复制的区别
> ###### 摘自：https://www.jianshu.com/p/3fd02e1179c7

# 1. 硬连接(hard link)
* 命令：`ln file1 file2`。
* 限制：不能跨分区；文件夹无效。
* 作用：实现对file1的一个硬连接。不同于拷贝（复制）。
* 效果：修改file1，file2会变；修改file2，file1会变。删除file1后file2任然存在且可用（数据任然为file1的数据）。多个硬连接，也始终只有一个存储区块。
* 原理：每对file1增加一个硬连接，系统对file1的对应的硬盘数据节点的连接数加一。当删除file1或file2等其它硬连接时，对磁盘对应的数据节点连接数减一，只有当连接数为0时，才真正的删除数据。

# 1. 软链接又称符号链接(soft link 或 symbolic link)
* 命令：`ln -s file1 file2`。
* 作用：实现对file1的一个软链接。
* 限制：可以跨分区；文件夹有效。
* 效果：修改file1，file2会变；修改file2，file1会变。删除file1后file2变为不可用。若强行编辑file2并保存，系统会生成文件file1，内容为file2编辑的内容。若对file2再建立软链接file3，实际效果为file3为file1的软链接。
* 原理：类似于windows的快捷方式。

# 1. 复制(copy)
* 命令：`cp file1 file2`。
* 作用：实现对file1的一个拷贝。
* 限制：可以跨分区，文件夹有效。
* 效果：修改file1，对file2无影响；修改file2，对file1无影响。删除file1，对file2无影响；删除file2，对file1无影响。
* 原理：磁盘存储空间的一个拷贝。
