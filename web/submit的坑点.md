* 如果你用原生js的form.submit()去提交数据，那么表单html结构里，就不可以出现name=submit和id=submit的input，否则会提示submit方法不存在。
    - form.submit is not a function
    - 因为如果一个input的name或者id是submit
    - document.querySelector('form').submit的意思就是获取到name=submit或者id=submit的元素，导致submit这个方法不存在了
