# 表单submit提交
* checkbox相同的name值，选中多个，带过去的是一组值，服务端接收的是个数组。
* checkbox相同的name值，选中单个，带过去的是一个值，服务端接收的是字符串。

# 总结
* 表单submit时，如果name出现了重复，则带到服务端的就是个数组，否则就是字符串。
    - 例如两个input类型为text的name值重复了，表单submit带过去的就是个数组。
    - 例如两个input类型为hidden的name值重复了，表单submit带过去的就是个数组。
    - 例如同name名的checkbox，被选中多个，表单submit带过去的就是个数组。

# 服务端接收的数据
* post时，传的数据是
    - 下面这种格式的数据，使用jq可以通过serialize方法得到。
    ```
    'hobby=1&hobby=2&hobby=2&hobby=3&hobby=4'
    ```
* 服务端接收时，hobby的值就是
```
[1, 2, 2, 3, 4]
```
