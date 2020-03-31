* js常用转义字符
```
\b 单词边界
\f 换页符
\r 回车符
\n 换行符
\r\n 回车并换行
\t 制表符 水平制表符(HT)
\v 制表符 垂直制表符(VT)
\" 转义"
\' 转义'
\` 转义`
\\ 转义\
```

# `CR` 和 `LF` 和 `CRLF` 的区别
* `CR`：`Carriage Return`，对应`ASCII`中转义字符`\r`，表示回车。
* `LF`：`Linefeed`，对应`ASCII`中转义字符`\n`，表示换行。
* `CRLF`：`Carriage Return & Linefeed`，`\r\n`，表示回车并换行。
```
Windows 操作系统采用两个字符来进行换行，即 CRLF。
Unix/Linux/Mac OS X 操作系统采用单个字符 LF 来进行换行。
MacIntosh 操作系统(早期的 Mac 操作系统)采用单个字符 CR 来进行换行。
```
