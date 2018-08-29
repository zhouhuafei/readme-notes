* 如果你用原生js的form.submit()去提交数据，那么表单html结构里，就不可以出现name=submit和id=submit的input，否则会提示submit方法不存在。
    - form.submit is not a function
    - 因为如果一个input的name或者id是submit
    - document.querySelector('form').submit的意思就是获取到name=submit或者id=submit的元素或者集合，导致submit这个方法不存在了

# 其他
* form的submit提交，在Chrome浏览器network的All和Doc选项里可以看到。
* 如果submit提交被进行了拦截，然后使用ajax进行提交的话，则在Chrome浏览器network的All和XHR选项里可以看到。
