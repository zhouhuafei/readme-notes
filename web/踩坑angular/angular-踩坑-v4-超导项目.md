## 文档
* https://segmentfault.com/a/1190000008754631/

## Angular版本
* 项目被创建时，脚手架的版本是`"@angular/cli": "1.0.4"`。
* 项目的核心文件，其版本是`"@angular/core": "4.1.3"`。

## 项目理解
* so-cool：基础组件
* om-bms-framework：AppHomepage组件（Layout） + 业务组件
  - 业务组件components目录和业务组件module目录的区别？
    - module目录：历史遗留目录
    - components目录：新的业务组件放这个目录
* om-bms-root：主模块
  - 主模块如何使用子模块？
    - 1、通过npm的方式引入子模块
    - 2、通过loadChildren载入子模块路由
* om-bms-learn-path：子模块之一
  - 子模块开发完功能后如何在本地进行自测？
    - 假设子模块在`refactor-extract-routing`分支进行开发。
    - 代码修改完毕后，先看子模块单独运行时是否正常，如果一切正常则`push`代码到`refactor-extract-routing`分支。
    - 再看子模块在主模块中运行时是否正常，如果一切正常则可以进行测试环境的发布。
    - 问题来了：请问如何在主模块中调试子模块`refactor-extract-routing`分支的代码？
      - 1、在主模块的npm依赖上加上`#refactor-extract-routing`。
      - 2、运行`npm i`更新npm依赖。
      - 3、再次启动服务即可。
    - 问题延伸：在主模块中调试子模块，为什么不使用npm软链接的方式安装子模块？
      - 发现问题：虽然npm软链接可以实时调试npm包，但是在主模块中使用时，打包会报错。
      - 排查问题：经过下述的测试场景进行排查后，发现是路由的loadChildren方法存在限制（无法载入npm软链接中的子模块）。
        - 测试场景1：单独运行nodejs，直接调用npm软链接中的文件。一切正常。
        - 测试场景2：单独运行webpack，直接打包npm软链接中的文件。一切正常。
        - 测试场景3：手动把子模块复制到主模块的依赖项中，主模块能正常运行和打包。
      - 补充说明：子模块只要是真实目录，不管子模块放到哪里，即使放到根目录之外，都可以被路由的loadChildren方法正常载入。
  - 子模块开发完功能后如何发布到测试环境？
    - 1、子模块开发的功能合线到`develop`分支。
    - 2、用Jenkins打包并发布主模块对应`develop`分支的代码。
  - 子模块开发完功能后如何发布到正式环境？
    - 1、子模块开发的功能合线到`master`分支。
    - 2、用Jenkins打包并发布主模块对应`master`分支的代码。

## 文件解读
* 子模块中的`app.module.ts`是用来干什么的？
  - 主模块通过`app.module.ts`载入子模块。
* 子模块中的`local.module.ts`是用来干什么的？
  - 子模块通过`local.module.ts`单独运行。

## 疑惑
* 刷新页面为什么会跳回首页？
  - 业务强制要求
* 开发环境时，刷新页面能否不跳回首页？
  - 在`om-bms-framework`项目的`app.homepage.ts`文件中搜索关键字`['/welcome']`。
  - 方案1：把第1、3、5个跳转的逻辑注释即可。（已改为开发环境下不执行对应的跳转逻辑）。
  - 方案2：把`/welcome`全部替换成`/goods/collection-category-list`。后者是你开发时的具体路由。
* 模块热替换无效？`亲测后发现，版本过低，默认不具备模块热替换功能。只具备实时重载（刷新页面）功能`。
  - `--hmr`开启后会报警告！意思是虽然开启了模块热替换，但是依然使用实时重载。如果想要使用模块热替换，需要在应用程序中进行额外的配置。
  - 额外的配置怎么配？`亲测后发现，案例真实有效。模块热替换功能可以被正常触发`。
    - 案例：https://github.com/zhouhuafei/hello-world_angular4/commit/af73292199b22d6513442f51f67f76ef0b6e9fbf
    - 注意：上述案例是我创建的全新项目，使用模块热替换时，用时1秒就可以完成一次自动替换。但是在超导的子模块中使用模块热替换时，将近8秒才能完成一次自动替换。
* 下次自动登录是什么功能？
  - 选中`下次自动登录`，进行登录后，再次把登录页的地址贴入浏览器地址栏并回车，js会自动执行登录逻辑。
  - 实现思路，选中`下次自动登录`时cookie里进行标记并存储账号和密码。再次进入登录页，等页面渲染完，检测存储的信息是否完整，若完整则自动执行登录逻辑。
* accessToken的有效期是多久？
  - 后端给的有效期是7天。
  - 前端放入cookie中使之590分钟失效。
* 我在`om-bms-framework`的生产依赖中，增加了一个npm包`async-validator`。按照npm的特性，我安装`om-bms-framework`包时，理应帮我安装`async-validator`包。但并未按照我的预期进行安装，请问怎么解决？
  - 先删除`om-bms-framework`包和`package-lock.json`文件再运行`npm i`。
  - 根据上述案例引申出`npm i`的机制，下述均为亲测：
    - 普通场景：运行`npm i`时，若依赖中有A包，则安装到node_modules目录中，若没有，则从node_modules目录中删除。安装和删除后，会更新`package-lock.json`。
    - 复杂场景：om-bms-root依赖的om-bms-framework包中新增了async-validator包。
      - 场景1：老的`package-lock.json`存在时，在om-bms-root中删除node_modules目录后运行`npm i`，安装不到async-validator包。
        - 根据场景2可以推理出场景1受限于老的`package-lock.json`。
      - 场景2：老的`package-lock.json`存在时，在om-bms-root中删除node_modules目录和老的`package-lock.json`后运行`npm i`，可以安装到async-validator包。
      - 场景3：老的`package-lock.json`存在时，在om-bms-root中删除node_modules目录后运行`npm i`，安装不到async-validator包。
        - 但若紧接着再运行一次`npm i`，则可以安装到async-validator包。
        - 可以推理出，在不删除node_modules的前提下，进行二次`npm i`时，会进行依赖检查。查漏补缺。并更新`package-lock.json`。
      - 场景4：老的`package-lock.json`存在时，在om-bms-root中删除node_modules目录并在package.json中增加async-validator依赖后运行`npm i`，可以安装到async-validator包。
        - 但若紧接着在om-bms-root中删除node_modules目录并在package.json中移除async-validator依赖后运行`npm i`，async-validator包居然没被删除。
        - 那么可以推理出，`npm i`时一个包是否会被删除，还需要检查其他依赖包中是否对此包存在依赖。
* 如何更新子模块？先删除`@xxy`目录再运行`npm i`。
* 我写了个组件，并向父组件传递一个事件`@Output() change = new EventEmitter()`。组件中有个未绑定任何事件的input框，当我修改input中的文案并失去焦点后，竟然会向父组件传递change事件？我并未执行`this.change.emit()`。为何会如此？
  - 经测试发现：组件中的input，当内容发生改变时，会默认向父组件传递一个change事件，即使在组件中不绑定`@Output() change = new EventEmitter()`，亦会如此。
  - 我把`@Output() change = new EventEmitter()`改为`@Output() onChange = new EventEmitter()`后解决了这个问题。
  - 建议：当组件中存在input等表单元素，向父组件传递事件时，事件命名不要使用`change`关键字。
  - 我又测试了textarea和select。都存在上述问题。其他表单元素未进行测试。理应都存在类似问题。
  - 我又发现，在未配置事件通信的场景下，不仅change事件，表单元素的其他事件，亦会向父组件进行传递，例如keyup事件，input事件。表单元素的其他事件理应都存在类似问题（focus和blur不存在类似问题）。
  - 我又发现，在未配置事件通信的场景下，组件嵌套组件时，被嵌套的组件中如果包含表单元素，则表单元素的事件会一层层往父组件传递。
  - 关于事件，使用组件时可以直接给组件加原生事件，所以在组件中进行事件回调时，尽量避免和原生事件同名，如果原生事件是click，我就使用onClick进行事件回调。
    - 如果我回调时也用click命名，那么我点击一次，则会触发两次。
    - 一次是原生事件触发，一次是事件回调触发。
  - 经测试发现angular14依然存在上述特性。
* 输入中文拼音的时候不会触发input事件（可以理解），选定汉字瞬间亦不会触发input事件（这不就离了谱了）。
  - angular4内部的input事件存在bug。使用keyup事件取代input事件。
  - angular14移除了输入中文拼音的时候不会触发input事件的特性。
* 使用app-image-upload组件上传文件后，数据的变更无法驱动视图。
  - 现象1：使用鼠标点一下页面上的任何地方，就可以进行视图的驱动。
  - 现象2：鼠标移入到上传图片的上传区域后，就可以进行视图的驱动。
  - 问题排查：七牛的图片上传插件导致事件回调无法实时驱动视图。
    - 在组件内部逐行排查，发现在获取token之后进行回调可以驱动视图，在上传图片之后回调无法驱动视图。
  - 解决方案：在使用组件的地方，当数据变更后，调用下述方法，强制更新视图。
    - `import { ChangeDetectorRef } from '@angular/core'`
    - `constructor (private changeDetectorRef: ChangeDetectorRef) {}`
    - `this.changeDetectorRef.detectChanges()`
* 给c-input组件（重写了ngModel）附加trim功能时，数据的改变无法驱动视图的改变。
  - 自定义input组件并重写ngModel后。如果想要附加trim功能，需要手动更新视图（使用dom改变input的value值）。
  - 我使用`this.changeDetectorRef.detectChanges()`去强制更新视图，发现并没有什么卵用（内部input的value值没变化，当然没用啦）。
  - 本质原因是组件内部的input其ngModel绑定的变量value，在`set value()`时未进行重新赋值。若在其中使用`this.value=newValue`赋值会无限递归。所以需要使用dom改变input的value值。
* 路由权限怎么校验的？`根据路径进行的校验`。
* 接口非200时是否进行了捕获？`未进行捕获`。
* 引入企微机器人接口报警？
  - 因存在`跨域`问题，所以需要服务端进行一下`反代`。
  - 使用`fetch`，以`POST`方式。调企微机器人的`Webhook地址`即可。
* 选择商品组和选择用户组同时使用时 - 两个按钮组件 - 使用同一个弹窗组件 - 弹窗点击确认时 - 两个按钮组件的订阅都被触发了 - 如何保证两个按钮组件的唯一性？
  - 按钮组件初始化时生成uuid带给弹窗组件。弹窗组件点确认时再把uuid返回。在按钮组件的订阅中进行检测。如果uuid相同才继续执行对应的业务逻辑。

## 问题
#### less - 虽然在`om-bms-framework`项目的less文件中定义了通用变量，但是在开发过程中却没被使用？
* 可能是历史遗留问题，后续开发时使用即可。
#### 因ts版本过低，主模块和子模块默认均不支持Promise的finally方法！
* 不做任何配置，使用时会出现什么问题？
  - 1、编辑器会报错
  - 2、打包会报错
* 如何做可以使之支持？方案1：使用类型断言！
  - `await (this.apiCollectionService.categoryAddOrEdit({ collocationId: this.id }) as any).finally(() => (this.loading = false))`
* 如何做可以使之支持？方案2：使用类型声明！
  - 在`tsconfig.app.json`中配置`"include": ["@types/promise.prototype.finally"]`即可。不能不配。否则打包会报错。不需要安装`@types/promise.prototype.finally`依赖包。
  - `om-bms-goodsmanagement`模块如果不安装`@types/promise.prototype.finally`依赖包。编辑器不会报错。打包正常。`ts版本是v2.2.2`。
  - `om-bms-root`模块如果不安装`@types/promise.prototype.finally`依赖包。编辑器会报错。打包正常。`ts版本是v2.3.4`。
* 其他案例：https://github.com/zhouhuafei/hello-world_angular4
  - 如果不安装`@types/promise.prototype.finally`依赖包，编辑器会报错，打包正常。`ts版本是v2.2.2`。
  - 在`tsconfig.app.json`中配置`"include": ["@types/promise.prototype.finally"]`即可。不能不配。否则打包会报错。
