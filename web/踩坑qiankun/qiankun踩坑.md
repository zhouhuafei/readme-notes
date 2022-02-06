## 文档
* 官方文档：https://qiankun.umijs.org/zh/guide
* 官方API文档：https://qiankun.umijs.org/zh/api
* 源码地址：https://github.com/umijs/qiankun
* 案例地址：https://github.com/umijs/qiankun/tree/master/examples

## 场景
* 主应用技术栈：Vue2全家桶
* 子应用技术栈：Vue3全家桶

## 全局变量会互串么？
> 不会互串，js有沙箱机制，所以各个应用之间的js是互相隔离的。
* 经测试发现，主应用中定义的全局变量，子应用可以直接使用。
* 子应用中定义的全局变量，其他子应用以及主应用不能直接使用。

## store会串么？
> 不会互串，js有沙箱机制，所以各个应用之间的js是互相隔离的。
* vue调试工具中，只能看到主应用的store。
* 但是在代码中，子应用自身可以读取到自身的store。
#### 子应用如何读取主应用的store？
* 1、在主应用中注册子应用时，可以通过props属性，把主应用的store传递给子应用。
* 2、在子应用中，通过mount钩子的第一参数，可以拿到主应用的store。
#### 在子应用中使用主应用的store，数据发生变更时，模板渲染的内容不会发生变化？
...TODO
* 子应用不应该和主应用强耦合！

## 主应用和子应用怎么通讯？
* 方案1：使用官方提供的通信机制。本质也是订阅发布。
  - 官方文档：https://qiankun.umijs.org/zh/api#initglobalstatestate
* 方案2：在主应用中，使用订阅发布模式，建立一套全局的通信规则。

## 主应用中的全局组件子应用可以用么？
* 肯定不行呀！Vue的实例都不是同一个！

## 子应用怎么使用主应用中的组件？
* 如果各应用的技术栈不同，则无法使用。
* 如果各应用的技术栈相同，例如都是vue2或者都是vue3。
  - 如果是基础组件，可以制作成第三方组件。
  - 如果是业务组件，可以专门建一个git仓库进行管理。

## js沙箱机制的原理？css沙箱机制的原理？
https://zhuanlan.zhihu.com/p/414468874

## 全局css会互串么？
* 经测试发现，主应用中定义的全局css，可以影响到子应用。
* 子应用中定义的全局css，也可以影响到主应用以及其他子应用。
  - 注意：当对应的子应用被卸载后，则影响直接消失。
  - 本质：本质是style标签也被移除了。style标签被移除则对应的样式会消失。
  - 引申：link标签被移除样式会消失么？link标签被移除则对应的样式也会消失。
  - 但是：qiankun为了做css沙箱，通过fetch把link中的内容转成了style进行渲染。
* 案例：主应用使用了一份阿里字体图标，子应用也使用了一份阿里字体图标。
  - 问题：子应用的字体图标，会对主应用的字体图标产生影响，导致主应用的字体图标展示错乱。
  - 建议：子应用不单独使用字体图标，子应用使用主应用的字体图标。

## css沙箱机制的种类？
* 方案1：使用`shadow DOM`进行隔离：简单讲就是在当前微应用的根节点开启`shadow`，然后子节点的操作都是在`shadowRoot`上来进行隔离。
  - `shadow DOM`文档：https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM
* 方案2：使用`css域`进行隔离：为每个css规则添加特定的前缀来起到隔离的作用，例如微应用中的样式是`p{color:#000;}`，处理后为`.app1 p{color:#000;}`。
## css沙箱机制不是万能药
> css沙箱机制需要在主应用中手动开启！
```javascript
// strictStyleIsolation: true // 使用`shadow DOM`进行隔离
// experimentalStyleIsolation: true // 使用`css域`进行隔离
start({ sandbox: { experimentalStyleIsolation: true } })
```
* 上述两种css沙箱机制，无法完全隔离全局样式。主应用中的全局样式，多多少少都会影响到子应用。
* 所以在使用微前端框架写代码时，css相关的地方，还需要自行注意。建议通过约定，使命名规范化。
* 我的选择：上述两种沙箱机制，我使用的方案2。因方案1无法使用字体图标。
  - 不管是主应用的字体图标，还是子应用自身引入的字体图标（不管是以何种方式引入），方案1都无法使用。
  - 使用方案2时，如果子应用单独引入字体图标，依然会存在和主应用字体图标冲突的问题。
  - 官网上有下述这么一句话，可以用来解释这种现象存在的原因。
  > 注意: `@keyframes`、`@font-face`、`@import`、`@page`将不被支持(i.e. 不会被改写)

## 路由跳转
* 主应用跳子应用，使用`router.push`进行跳转时，只能用`path`，不能用`name`。
* 因为在主应用中，不存在子应用对应的路由配置。
  - 想想草动商城管理系统的左侧菜单栏。
  - 如果在主应用路由中，把子应用路由，配置成空模板组件，可以使用`name`进行跳转。

## 主应用设置404会影响子应用么？
* 会影响！
#### 子应用404了怎么处理？
* 不处理！子应用的404本身就应该交给子应用自己处理。
#### 访问子应用时，主应用报404怎么处理？
* 首先在主应用中进行子应用的全部路由拦截，然后component用空模板进行占位。
#### 怎么在主应用中通过name的形式跳转到子应用？
* 首先在主应用中配置子应用的路由，然后component用空模板进行占位。
#### 我的实战
* 地址：https://github.com/zhouhuafei/hello-world_qiankun-app-main-vue2/blob/master/src/router/index.js

## 子应用部署方案？
* 主应用中注册子应用的部分，`entry`需要根据环境的不同，配置成动态的。
#### 方案1：子应用使用二级域名？
* 因qiankun框架，是基于fetch拉取子应用。而二级域名存在跨域问题，所以需要配置跨域。
#### 方案2：子应用使用二级路由？
* 不需要配置跨域。
#### 方案1是最优解
* 但是方案1需要多个环境对应的多个域名支持。
* 域名的申请并不是那么容易，特别是做腾讯的项目（松下商城）。
* 所以还是通过技术的手段，采用方案2进行实现吧。
#### 我选择采用方案2
* 因不需要额外的域名，所以我采用了方案2。
* 在nginx配置处，额外增加一条代理规则，实现二级路由的拦截。
#### 采用方案2有些地方需要注意
```
registerMicroApps([
  {
    name: 'child1',
    entry: '//localhost:7071',
    container: '#container',
    activeRule: '/child1',
    props: {
      mainStore: store
    }
  }
])
```
* 若采用二级域名的形式部署，生产环境时，entry应该是：`https://child1.icaodong.com`。
* 若采用二级路由的形式部署，生产环境时，entry应该是：`https://www.icaodong.com/child1nginx`或`/child1nginx`。
* 若采用二级路由的形式部署，activeRule需要和entry的二级路由不同。
  - 场景1：如果二者相同，若在浏览器输入子应用路径（不是想独立访问子应用），nginx会拦截activeRule，主应用会消失（大BUG），页面只剩下子应用的内容（变成了独立访问子应用）。
  - 场景2：如果二者不同，nginx只拦截entry的二级路由，如此做法也将导致子应用在生产环境时无法独立访问（那就不独立访问），因子应用入口entry对应的二级路由和子应用的前端路由base不一致，前端路由会报404（独立访问子应用时）。
    - 补充1：生产时，子应用的publicPath需要和entry的二级路由相同。否则子应用的静态资源会404。
    - 补充2：生产时，如果子应用的静态资源是OSS存储（推荐），publicPath配成OSS对应的域名即可。
* 不管使用哪种形式进行部署，主应用中的activeRule和子应用中路由的base是始终保持一致的。
#### 二级路由部署案例
* 主应用：https://github.com/zhouhuafei/hello-world_qiankun-app-main-vue2
* 子应用1：https://github.com/zhouhuafei/hello-world_qiankun-app-child1-vue2
* 子应用2：https://github.com/zhouhuafei/hello-world_qiankun-app-child2-vue3
* nginx：https://github.com/zhouhuafei/docker-compose-config/blob/master/config/nginx/conf.d/z.top.qiankun.http.conf

## h5的微前端？
* h5的微前端直接用nginx进行二级路由的反向代理即可。
* 独立的流程（流程自身闭环）做成独立的项目即可。
* 例如来伊份的员工佣金提现流程和员工端基础功能就是分开的两个项目，分别部署在了两台不同的服务器上。
