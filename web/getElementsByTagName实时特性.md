* 具备实时特性的方法
    - 如果往文档里新增了或者删除了<div class="div-wrap"></div>元素，则下面集合里的成员就会自动新增或者删除这个元素
    ```
    document.getElementsByTagName('div');
    document.getElementsByClassName('div-wrap');
    ```

* 不具备实时特性的方法
    - 如果往文档里新增了或者删除了<div class="div-wrap"></div>元素，则下面集合里的成员不会自动新增或者删除这个元素
    ```
    document.querySelectorAll('.div-wrap')
    ```