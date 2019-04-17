# h5中form触发submit时自带的验证规则
* type属性值为
    - type="email" value不为''就具有验证规则。
    - type="url" value不为''就具有验证规则。
    - type="number" value不为''就具有验证规则。(type设置为number之后，就不可以输入英文字母了，不过却可以输入小数点和e以及+-号，不过最后提交的格式如果非法的话，依然会验证不通过)
    - 总结
        - 以上：不会验证value为''，除非配合required属性。
        - 以上：会验证value为'  '。
        - 以上：number类型的```min```、```max```属性都默认具有验证规则。
        - 以上：maxlength和minlength属性默认有效果，效果就是超出长度就输入不了。
        - 其他：```type="tel"```默认不具有验证规则，可配合```pattern="^1\d{10}$"```和```required```进行规则验证。
* 拥有required属性值时
* 拥有pattern属性值时
    - pattern="^1\d{10}$"
    - 使用oninvalid可以监听规则不匹配时进行对应的操作
    ```javascript
    input.oninvalid = function () {
      input.setCustomValidity("请不要输入火星的手机号好吗？");
    };
    ```
    - invalid事件会在表单submit事件之前触发，如果验证不通过的话就不会触发表单的submit。而提交时会先验证所有表单元素的值是否有效。除了提交外还可以手动调用```input.checkValidity```方法来执行验证。

# 总结
* 工作中一般不使用表单自带的验证，也不会使用表单默认的submit方式进行表单提交。
* 一般都是使用ajax进行表单提交。验证规则也是根据业务定制的。
