# 去掉浏览器记住密码时，输入框里异常的背景色
* 解决方案1
```
:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
}
```
* 解决方案2，input背景颜色为transparent时无效
```
:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
}
```
