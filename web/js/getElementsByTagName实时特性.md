* 具备实时特性的方法
    - 如果往文档里新增了或者删除了div元素，则下面集合的成员里就会自动新增或者删除这个元素
    ```
    document.getElementsByTagName('div');
    document.getElementsByClassName('div-wrap');
    ```

* 不具备实时特性的方法
    - 如果往文档里新增了或者删除了div元素，则下面集合的成员里不会自动新增或者删除这个元素
    ```
    document.querySelectorAll('.div-wrap');
    ```