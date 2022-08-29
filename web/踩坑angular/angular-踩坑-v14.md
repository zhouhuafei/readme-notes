## 文档
* https://www.angular.cn/

## ng new报错
* ng new hello-world_angular 会报错。
    - 解决方案：```ng new appName --directory hello-world_angular```

## `@NgModule`有个`imports`选项，可以导入模块，例如导入`HttpModule`，此处的模块指的是什么？
* 上述的模块指的是NgModule。NgModule是由NgModule装饰器函数装饰的类。
* NgModule可以从其他NgModule中导入功能，前提是目标NgModule导出了该功能。

## 如何监听数据的变化？
...TODO

## 如何配置路由？
* 案例：https://github.com/zhouhuafei/hello-world_angular/blob/master/src/app/app.routes.ts
* 总结：路由还是要使用layout配合children进行渲染，否则404页面不干净。

## 如何监听路由的变化？
* 案例：https://github.com/zhouhuafei/hello-world_angular/blob/master/src/app/pages/about/about.component.ts
* 监听搜关键字：`this.routerSubscription = this.router.events.subscribe(`。
  - 在`ngOnInit`中绑定：使用相同页面组件的路由之间进行互相切换时才会触发。效果和在vue2中用watch监听$route一样。
  - 在`constructor`中绑定：进入页面会立马触发一次。效果和在vue2中用watch监听$route并加上`immediate: true`一样。
* 取消搜关键字：`this.routerSubscription.unsubscribe()`。

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

## 怎么进行路由拦截？例如未登录则跳登录页？可以使用路由守卫！
* 案例：https://github.com/zhouhuafei/hello-world_angular/commit/11fc34d7154af8a1c1366ed20f8089e035fadf65

## constructor注入原理？为什么能自动实例化？
...TODO

## css模块化？
* 组件的css模块化默认是开启的，类似vue中style标签的scoped属性。

## angular的热更新默认行为是刷新页面，如何改为局部刷新？
* 启动服务的命令改为`ng serve --live-reload=false --hmr=true`。
* `--live-reload`默认为`true`：是否要利用实时重载在更改时刷新页面。
* `--hmr`默认为`false`：启用模块热替换。

## 常用命令
* 新建Module：`npx ng g m modules/order --routing`。
* 新建Component：`npx ng g c components/hello`。新建页面也是用这个：`npx ng g c pages/home`。
