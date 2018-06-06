# 去掉浏览器记住密码时，输入框里异常的背景色
* 解决方案1，延迟7天变背景色，
    - 7天后背景色还是会变的异常
    - 切换input的type类型时背景色依然会变的异常
```
:-webkit-autofill {
    transition: background-color 604800s ease-in-out 0s;
}
```
* 解决方案2，背景色会一直是白色的
    - 其他背景色将统统失效
```
:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
}
```

# 总结
1. 方案一写入清零样式，遇到切换类型时，针对页面，再写一次方案二进行覆盖
* 或者
2. 方案二写入清零样式，需要其他背景色时，再写一次方案二，改变颜色进行覆盖
