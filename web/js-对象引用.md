```
var obj = { a: 1, b: 2, json: { key: 'value'} }
function A() {
    this.obj = obj;
}
var obj2 = new A();
console.log(obj === obj2.obj); // true; obj和obj2之间存在引用关系。
```

```
// jq和我自己封装的extend都存在这个问题
var obj = { a: 1, b: 2, json: { key: 'value'} }
var obj2 = $.extend({}, obj);
console.log(obj.json === obj2.json); // true; obj.json和obj2.json之间存在引用关系。
```

* 一般不会把obj作为变量提出来写，这样就没有可操作的空间，也就不用担心存在引用关系了。
    - 一般都是直接传参的方式写入$.extend({}, { a: 1, b: 2, json: { key: 'value'} });

* 如果想移除对象引用，可以使用对象的深拷贝方法，拷贝出一份新的对象。
    - https://github.com/zhouhuafei/zhf.obj-remove-quote
