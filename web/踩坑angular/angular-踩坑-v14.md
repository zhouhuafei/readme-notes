## 文档
* https://www.angular.cn/

## 创建hello-world_angular项目
* hello-world_angular项目是使用`@angular/cli`的`14.2.1`版本，运行`ng new hello-world_angular`命令创建而来。
* 运行命令后会出现交互框。
  - Would you like to add Angular routing? `Yes`
  - Which stylesheet format would you like to use? `SCSS`

## `@NgModule`元数据
* 官方文档：https://angular.cn/guide/ngmodule-api

## `@NgModule`有个`declarations`选项，其作用是？
* 用以声明组件类、指令类和管道类。

## `@NgModule`有个`providers`选项，其作用是？
* 用以注入服务类。

## `@NgModule`有个`bootstrap`选项，其作用是？
* 用以自动引导的组件列表。通常此列表中只有一个组件，即应用程序的根组件。
* Angular可以用多个引导组件启动，每个组件在主机网页中都有自己的位置。

## `@NgModule`有个`imports`选项，可以导入模块，例如导入`HttpModule`，此处的模块指的是什么？
* 上述的模块指的是NgModule。NgModule是由NgModule装饰器函数装饰的类。
* NgModule可以从其他NgModule中导入功能，前提是目标NgModule导出了该功能。
  - 假设主模块导入了一个子模块，子模块中存在一个HelloChild组件，主模块如果想使用这个组件，只需要在子模块中对组件进行导出即可。
  - 其他功能同理，只要子模块进行了对外导出，主模块导入子模块时，相当于同时导入了这些被导出的功能。

## `@NgModule`有个`exports`选项，其作用是？
* 案例：https://github.com/zhouhuafei/hello-world_angular/blob/master/src/app/app-routing.module.ts
* 上述案例中，`app-routing.module.ts`是一个路由模块（NgModule），如果RouterModule不进行对外导出，则不能正常运行。

## 服务的用途？
* 服务用于放置和特定组件无关并希望跨组件共享的数据或逻辑。
  - 共享数据：如果服务是由根模块提供的，则组件导入该服务时，这些组件共享一个服务实例，即服务中的属性数据共享。
  - 共享逻辑：如果服务是由组件本身提供的，则服务中的属性数据由该组件独享。

## 跨组件通信？
* 使用服务可以进行跨组件通信。

## 如何监听数据的变化？
* 监听组件props值的变化用ngOnChanges钩子：当`@Input`装饰的值发生变化时触发，默认会先触发一次。可以监听到对象重新赋值，监听不到对象属性的变化。
* 监听组件自身的数据发生变化用ngDoCheck钩子。或者使用rxJS进行监听。

## constructor注入原理？为什么能自动实例化？为什么constructor中形参的顺序可以随意摆放？
* 关于我个人的思考与实现：`./constructor-inject.js`。

## 如何配置路由？
* 案例：https://github.com/zhouhuafei/hello-world_angular/blob/master/src/app/app-routing.module.ts
* 总结：路由还是要使用layout配合children进行渲染，否则404页面不干净。

## 如何监听路由的变化？
* 案例：https://github.com/zhouhuafei/hello-world_angular/blob/master/src/app/pages/about/about.component.ts
* 监听搜关键字：`this.routerSubscription = this.router.events.subscribe(`。
  - 在`ngOnInit`中绑定：使用相同页面组件的路由之间进行互相切换时才会触发。效果和在vue2中用watch监听$route一样。
  - 在`constructor`中绑定：进入页面会立马触发一次。效果和在vue2中用watch监听$route并加上`immediate: true`一样。
* 取消搜关键字：`this.routerSubscription.unsubscribe()`。

## 怎么进行路由拦截？例如未登录则跳登录页？可以使用路由守卫！
* 案例：https://github.com/zhouhuafei/hello-world_angular/commit/11fc34d7154af8a1c1366ed20f8089e035fadf65

## 双向数据绑定是语法糖么?能应用于自定义组件么？
* 是语法糖。能应用于自定义组件。
* 注意：`[(ngModel)]`默认只能应用于表单相关的元素。
  - 要将`[(ngModel)]`应用于非表单型内置元素或第三方自定义组件，必须编写一个值访问器。
  - 重写ngModel教程：https://blog.csdn.net/qq_30101131/article/details/88318724
  - 重写ngModel案例：https://github.com/primefaces/primeng/blob/master/src/app/components/radiobutton/radiobutton.ts
* 双向数据绑定应用于自定义组件时，只要按照固定的命名模式进行开发即可。
  - 在父组件中使用`[(myAttr)]="myAttrVarValue"`给子组件传递属性。
  - 在子组件中使用`myAttrChange.emit(myAttrVarNewValue)`方法通知父组件。

## 父组件传递给子组件的属性可以被子组件修改么？
* 基础数据类型可以直接修改，不会报错。因为不存在引用关系，所以不会导致父组件数据发生变更。固不会导致父组件视图发生变更。
* 引用数据类型可以直接修改，不会报错。因为存在引用关系，所以会导致父组件数据发生变更。固会导致父组件视图发生变更。
* 建议：单向数据流不建议直接改变父组件传递给子组件的属性，建议通过事件订阅的方式更新父组件的数据。

## 有`<slot></slot>`么?
* 有`<ng-content></ng-content>`。

## css模块化？
* 组件的css模块化默认是开启的，类似vue中style标签的scoped属性。

## Angular的热更新默认行为是刷新页面，如何改为局部刷新？
* 启动服务的命令改为`ng serve --live-reload=false --hmr=true`。
* `--live-reload`默认为`true`：是否要利用实时重载在更改时刷新页面。
* `--hmr`默认为`false`：启用模块热替换。

## 常用命令
* 新建Module：`npx ng g m modules/order --routing`。
* 新建Component：`npx ng g c components/hello`。新建页面也是用这个：`npx ng g c pages/home`。
* 新建路由守卫：`npx ng g g guards/auth`。
* 新建指令：`npx ng g d directives/setBg`。
* 新建管道：`npx ng g p pipes/arrJoin`。
* 新建服务：`npx ng g s services/userInfo`。

## 一文了解`ng-template`，`ng-content`、`ng-container`和`*ngTemplateOutlet`的区别。
* https://developer.aliyun.com/article/817427

## 把组件内`ng-container`的变量传递给组件外的`ng-template`。
* https://blog.csdn.net/SeriousLose/article/details/121473988
* 在上下文对象中使用`$implicit`这个`key`会把对应的值设置为默认值。

## 强制更新视图
https://blog.csdn.net/qq_41373731/article/details/122323461

## primeng
* 以`属性pButton`的方式配合button标签使用。
  - `click时`是怎么区别开原生事件和组件回调事件的？`绑定事件时，直接使用的原生click事件，组件内没进行click事件回调`。
  - `disabled时`是怎么实现无法点击的？`利用了html原生button标签被disabled后无法点击的特性`。
* 以`标签p-button`的方式使用。
  - `click时`是怎么区别开原生事件和组件回调事件的？`原生事件是click，组件内用onClick进行的事件回调`。
  - `disabled时`是怎么实现无法点击的？`原生事件依然有效，无效的是onClick回调事件`。

## 自定义组件 - 如何区分组件的原生事件和组件的回调事件？
* vue2区分原生事件和回调事件是通过.native修饰符。不加则走回调事件。加了则走原生事件。
* vue3区分原生事件和回调事件是通过emit配置，如果配置了则走回调事件，如果不配置则建议用命名区分，否则都会触发。
* angular区分原生事件和回调事件需要通过命名区分，否则都会触发。
* react不需要区分原生事件和回调事件，因为组件上绑的都是属性，不是事件，不会主动触发。若想触发，需要在组件内自行手动触发。
#### 前端三大框架 - 自定义组件的回调事件 - 我个人的一些建议？
* 1、建议命名时，不要和原生事件同名。
* 2、建议命名要简洁。
#### 命名案例
* 若原生事件是click，则回调事件就命名为onClick。对应的处理函数则命名为fnClick。
* 若原生事件是change，则回调事件就命名为onChange。对应的处理函数则命名为fnChange。
