# 自动获取焦点
* 方案1 - autofocus属性
```
<input type="text" class="input" autofocus="autofocus" />
```
* 方案2 - focus方法
```
document.querySelector('.input').focus();
```
# 自动弹出软键盘
* 不好意思，不存在的，这个做不到，必须手点才可以弹起软键盘，脚本什么的，别想了，这种需求直接砍掉即可

* 单页面网站，点击搜索，跳到别的页面能调用起来的原因是有用户交互。
    - 点击跳转，其实不是页面刷新的那种跳转，而是js渲染的跳转，这种跳转会保留上次的用户交互，此时让渲染完的input获取焦点是可以调起键盘的。
