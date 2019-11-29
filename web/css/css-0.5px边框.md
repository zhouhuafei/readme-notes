```scss
.hairline {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    transform: scale(0.5);
    border: 1px solid #f00;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: inherit;
  }
}
```

* 顺便说下```:```和```::```的区别吧
    - css2伪类用```:```，伪元素也是用```:```。
    - css3为了区分两者。规范上定义的是：伪类用```:```，伪元素用```::```。但是伪元素依然可以用```:```。
    
* 伪类选择器
    > a:link | a:visited | a:hover | a:active
    - div:first-of-type
    - div:first-child
    
* 伪元素选择器
    > 伪元素是内联元素
    - 为某个元素的第一行文字使用样式。```div::first-line```
    - 为某个元素中的文字的首字母或第一个字使用样式。```div::first-letter```
    - 在某个元素之前插入一些内容。```div::before```
    - 在某个元素之后插入一些内容。```div::after```
