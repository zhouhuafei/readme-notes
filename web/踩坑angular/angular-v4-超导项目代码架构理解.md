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
    - 如何在主模块中运行`refactor-extract-routing`分支的代码？
      - 1、在主模块的npm依赖上加上`#refactor-extract-routing`。
      - 2、运行`npm i`更新npm依赖。
      - 3、再次启动服务即可。
  - 在主模块中使用npm软链接子模块时，主模块打包会报错？
    - ...TODO 怀疑是webpack不能打包软链接！nodejs可以执行软链接！如果软链接可以用的话，在主模块中就可以实时调试子模块了。
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
* 热更新时，为什么会刷新页面？
  - ...TODO
* 刷新页面为什么会跳回首页？
  - 业务强制要求
* 开发环境时，刷新页面能否不跳回首页？
  - ...TODO
  - 在`om-bms-framework`项目的`app.homepage.ts`文件中搜索关键字`['/welcome']`，第一个就是强制跳转的逻辑。注释即可。
  - 注释掉后会报没有对应模块的权限，是因为接口请求需要时间。需要等权限接口请求完毕后，再进行页面的渲染。
