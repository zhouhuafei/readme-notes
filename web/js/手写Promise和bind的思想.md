# 手写Promise
* 1、```then```和```catch```是用来存储函数的
    - 如果状态是pending 则存储。
    - 如果状态是resolved 则触发then。
    - 如果状态是rejected 则触发catch和catch之后的then。
* 2、状态为resolved或rejected的时候，触发对应被存储的函数
    - ```resolve()```
    - ```reject()```
* 3、以上，我猜的。

# 手写bind
* 1、使用```apply```修改```this```指向
* 2、使用```...arg```或者```arguments```传递其他形参
