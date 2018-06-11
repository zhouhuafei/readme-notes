* js只支持前瞻匹配(零宽断言)
    - (?=exp) 正向前瞻 匹配后面满足表达式exp的位置
    - (?!exp) 负向前瞻 匹配后面不满足表达式exp的位置
    ```
    var isTure = /bc(?=d)/.test('bcd'); // true (?=d)只能放在后面，放在前面匹配不到 /(?=a)bc/.test('abc'); // false
    ```
    - (?<=exp) 正向后瞻 匹配前面满足表达式exp的位置（JS不支持）
    - (?<!exp) 负向后瞻 匹配前面不满足表达式exp的位置（JS不支持）
* location.replace(newURL) 方法可用一个新文档取代当前文档。
    - replace() 方法不会在 History 对象中生成一个新的记录。当使用该方法时，新的 URL 将覆盖 History 对象中的当前记录。
* 金钱格式化
    - /(?!\b)(?=(\d{3})+$)/g
* 字母加数字6到16位
