# css重写滚动条样式
```
div{
    -webkit-overflow-scrolling: touch;
}
div::-webkit-scrollbar{
    height: 2px; /* 水平 */
    width:2px; /* 垂直 */
    background:#f00;
}
div::-webkit-scrollbar-thumb{
    background:#ddd;
    border-radius:2px;
}
```