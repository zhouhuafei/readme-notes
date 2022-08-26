## 文档
* https://www.angular.cn/
* https://segmentfault.com/a/1190000008754631/

## ng new报错
* ng new hello-world_angular 会报错。
    - 解决方案：```ng new appName --directory hello-world_angular```

## `@NgModule`有个`imports`选项，可以导入模块，例如`HttpModule`，此处的模块指的是什么？
...TODO

## 如何监听数据的变化？
...TODO

## 跨组件通信？
...TODO

## services
...TODO

## 有`<slot></slot>`么?
* 有`<ng-content></ng-content>`。

## 双向数据绑定是语法糖么?能应用于自定义组件么？
* 是语法糖。能应用于自定义组件。
* 注意：`[(ngModel)]`默认只能应用于表单相关的元素。
  - 要将`[(ngModel)]`应用于非表单型内置元素或第三方自定义组件，必须编写一个值访问器。
  - https://angular.cn/guide/built-in-directives#ngmodel-and-value-accessors
  - https://github.com/primefaces/primeng/blob/master/src/app/components/radiobutton/radiobutton.ts
* 双向数据绑定应用于自定义组件时，只要按照固定的命名模式进行开发即可。
  - 在父组件中使用`[(myAttr)]="myAttrVarValue"`给子组件传递属性。
  - 在子组件中使用`myAttrChange.emit(myAttrVarNewValue)`方法通知父组件。

## 父组件传递给子组件的属性可以被子组件修改么？
* 基础数据类型可以直接修改，不会报错。因为不存在引用关系，所以不会导致父组件数据发生变更。固不会导致父组件视图发生变更。
* 引用数据类型可以直接修改，不会报错。因为存在引用关系，所以会导致父组件数据发生变更。固会导致父组件视图发生变更。
* 建议：单向数据流不建议直接改变父组件传递给子组件的属性，建议通过事件订阅的方式更新父组件的数据。

## 路由等接口响应后再渲染页面?
...TODO

## css模块化？
* 组件的css模块化默认是开启的，类似vue中style标签的scoped属性。
