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