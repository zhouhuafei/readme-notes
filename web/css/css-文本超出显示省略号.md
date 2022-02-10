* 文本超出显示省略号。多行省略号如果不加```word-break: break-all;```，当遇到文本是一串很长的数字或者是一串很长的连续单词时则无效。
    - 单行省略号
    ```css
    .g-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    ```
    - 多行省略号
    ```css
    .g-ellipsis {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-height: 18px;
      max-height: 36px;
    }
    ```
