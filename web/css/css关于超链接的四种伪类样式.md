# 关于超链接的四种伪类样式？
```
a:link {color: black;} /* 未访问的链接 */
a:visited {color: grey;} /* 已访问的链接 */
a:hover {color: red;} /* 鼠标移动到链接上 */
a:active {color: yellow;} /* 选定的链接 （鼠标按下时的链接）*/
```

# 顺序和权重
* a:link，a:visited，a:hover，a:active这四个权重是相同的，css书写顺序越靠后则权重越高。注意事项：
    - 链接没被访问的时候a:link如果存在则a:link生效，a:visited无论在哪都不会生效，和顺序以及权重无关，因为不存在a:visited这个状态。
    - 链接被访问过的时候a:visited如果存在则a:visited生效，a:link无论在哪都不会生效，和顺序以及权重无关，因为不存在a:link这个状态。
    - 因此a:link和a:visited的顺序可以随意调换，但是要排在a:hover和a:active之前。
* 链接没被访问的时候(a:link生效，a:visited不生效)，如果不按照顺序写，会导致一些伪类失效，例如：
    - 把a:link放到a:hover之后，a:hover会失效。
    - 把a:link放到最后，a:hover和a:active都会失效。
    - 把a:hover放到a:active之后，a:active会失效。
* 链接被访问过的时候(a:visited生效，a:link不生效)，如果不按照顺序写，会导致一些伪类失效，例如：
    - 把a:visited放到a:hover之后，a:hover会失效。
    - 把a:visited放到最后，a:hover和a:active都会失效。
    - 把a:hover放到a:active之后，a:active会失效。

# 建议
* 按顺序书写