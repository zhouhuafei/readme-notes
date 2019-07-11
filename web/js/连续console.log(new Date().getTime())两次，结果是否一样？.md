* 连续console.log(new Date().getTime())两次，结果是否一样？
    - 有很大的几率一样，已在控制台验证。如果加上随机数那重复的几率就微乎其微了。
    - console.log(new Date().getTime() + ('' + Math.random()).substring(2));

* 如果运算是毫秒级别的，则打印出来的值就是一样的，因为日期精确到毫秒级。
