```
/1/.exec('1231'); // ['1', index: 0, input: '1231']
'1231'.match(/1/); // ['1', index: 0, input: '1231']
/(1)/.exec('1231'); // ['1', '1', index: 0, input: '1231']
'1231'.match(/(1)/); // ['1', '1', index: 0, input: '1231']
'1231'.match(/1/g); // ['1', '1']
'1231'.match(/(1)/g); // ['1', '1']
```

# 结论
* 非全局匹配的情况下
* 字符串的match方法和正则的exec方法返回的数据是一致的