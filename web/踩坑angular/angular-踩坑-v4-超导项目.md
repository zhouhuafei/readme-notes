## 文档
* https://segmentfault.com/a/1190000008754631/

## angular版本
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
      - 排查问题：经过下述的测试场景进行排查后，怀疑是路由的loadChildren方法存在限制。具体原因未找到。...TODO
        - 测试场景1：单独运行nodejs，直接调用npm软链接中的文件。一切正常。
        - 测试场景2：单独运行webpack，直接打包npm软链接中的文件。一切正常。
        - 测试场景3：手动把子模块复制到主模块的依赖项中，主模块能正常运行和打包。
        - 测试场景4：在主模块中使用npm软链接的方案安装我本地的`npm-publish-ts`包，在`main.ts`中能正常运行。
  - 子模块开发完功能后如何发布到测试环境？
    - 1、子模块开发的功能合线到`develop`分支。
    - 1、用Jenkins打包并发布主模块对应`develop`分支的代码。
  - 子模块开发完功能后如何发布到正式环境？
    - 1、子模块开发的功能合线到`master`分支。
    - 1、用Jenkins打包并发布主模块对应`master`分支的代码。

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
  - 把第1、3、5个跳转的逻辑注释即可。（...TODO建议开发环境下不执行对应的跳转逻辑）。
* 模块热替换无效？
  - 超导的angular4项目关闭实时重载开启模块热替换无效（`ng serve --live-reload=false --hmr=true`）。
  - 是的！经测试确实无效！老老实实使用默认开启的实时重载（自动刷新页面）吧！
  - ...TODO有空新建一个项目angular4的全新项目再试试

## 问题
* less - 虽然在`om-bms-framework`项目的less文件中定义了通用变量，但是在开发过程中却没被使用，可能是历史遗留问题，后续开发时使用即可。
