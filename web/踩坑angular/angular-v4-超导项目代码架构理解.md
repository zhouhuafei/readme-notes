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
      - 注：使用npm软连接
  - 子模块开发完功能后如何发布到测试环境？
    - 1、保持上述对主模块中npm依赖的改动。
    - 2、打包测试环境的代码。
    - 3、怎么发布代码到测试服务器？是用Jenkins么？...TODO
    - 4、测试没问题的话，则把代码合并到`develop`分支。
  - 子模块开发完功能后如何发布到正式环境？
    - 1、把子模块`develop`分支上的代码合并到`master`分支。
    - 2、还原上述对主模块中npm依赖的改动。
    - 3、运行`npm i`更新npm依赖。
    - 4、打包正式环境的代码。
    - 5、怎么发布代码到正式服务器？是用Jenkins么？...TODO

## 文件解读
* 子模块中的`app.module.ts`是用来干什么的？
  - 主模块通过`app.module.ts`载入子模块。
* 子模块中的`local.module.ts`是用来干什么的？
  - 子模块通过`local.module.ts`单独运行。

## 疑惑
* ...TODO 热更新居然是刷新页面并回首页？
  - 业务需要
