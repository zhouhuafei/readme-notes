> BEM 是块(block)、元素(element)、修饰符(modifier)的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

* .block 代表了更高级别的抽象或组件。
* .block__element 代表 .block 的后代，用于形成一个完整的 .block 的整体。
* .block--modifier 代表 .block 的不同状态或不同版本。
```
.block {}
.block__element {}
.block--modifier {}
```

* 使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如：
```
.sub-block__element {}
.sub-block--modifier {}
```

* 错误示范
```
.block__son__grandson {}
```

* 正确示范
```
.block__son {}
.block__grandson {}
```
