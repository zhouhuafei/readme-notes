### uni-app用什么打包的？
* 选择vue版本为2时，用的webpack。
* 选择vue版本为3时，用的vite。

### uni-app支持vue3吗？
* 答：支持（2022/01/29）。

### 使用uni-app开发微信小程序，若从vue2迁移到vue3，有几个地方需要修改。
* 以下仅代表我个人观点，所有问题均来自本人亲身经历，不存在复制粘贴行为。
> 开发工具：HBuilder X 3.3.10.20220124
* 1、创建应用的方式要改。main.js内容如下所示：
```
import store from '@/store'
import { createSSRApp } from 'vue'

export function createApp () {
  // 创建应用
  const app = createSSRApp(App)

  // 使用app.component方法绑定全局组件
  // 使用app.config.globalProperties属性绑定全局方法

  // 使用store
  app.use(store)

  // 导出应用
  return { app }
}
```
* 2、全局组件的注册，需要修改。需要注册到app上。以前是直接注册到Vue上。示例如下所示：
```
import BaseCopyright from '@/components/BaseCopyright'

app.component('BaseCopyright', BaseCopyright)
```
* 上面的BaseCopyright组件会生效。
* 注：亲测发现，在uni-app中，组件需要写成单文件组件，如果写成template的形式则组件不生效。
* 下面的GlobalComponentName组件不会生效。
```
app.component('GlobalComponentName', { template: `<view>GlobalComponentName</view>` })
```
* 3、创建store的方式要改且vuex需要使用`"vuex": "^4.0.0-0"`版本。store.js内容如下所示：
```
import { createStore } from 'vuex'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```
* 注：选择vue版本为2时，在uni-app中，不能在模板里直接使用store，需要使用computed中转一下。此时开发者工具appData中展示的数据是给人看的（展示完整的键名）。
* 注：选择vue版本为3时，在uni-app中，能在模板里直接使用store。此时开发者工具appData中展示的数据不是给人看的（展示a、b、c、d、e等被简化后的键）。
* 4、scss问题 - 和`dart-sass`版本以及`vite`打包工具多少有点关系。
  - 路径需要拼全，index不能省，后缀也不能缺，否则会报错。
    - 选择vue版本为2时，可以这么用：`~@/scss/config`。
    - 选择vue版本为3时，必须这么用：`~@/scss/config/index.scss`。
  - 不能直接使用`/`进行除法，需要使用`math.div`。
  ```
  @use "sass:math";

  // px2upx
  @function px2upx($px, $psdW:375) {
    @return $px * math.div(750, $psdW) + upx // 375的设计图
  }
  ```
* 5、js问题 - 和打包工具换成`vite`以及`选择vue版本为3`多少有点关系。
  - 不能使用`module.exports = {}`进行导出。需要使用`export default {}`进行导出。
    - 第三方组件中亦如此，`mp-html`组件中的`module.exports`需要更换为`export default`。
  - api响应的数据发生了变更，以前第一形参是出错信息，第二形参是结果。现在第一形参是结果，而错误信息被移到了catch里。
    - 这个有点坑，需要改的地方有点多。
  - 选择vue版本为2时，在uni-app中，可以直接使用`Vue.prototype.$sleep`进行方法的绑定。
    - vue3需要使用`app.config.globalProperties.$sleep`进行方法的绑定。
  - 类似`:visible.sync`的用法，需要统一更换为，类似`v-model:visible`的用法。
* 6、第三方组件mp-html无法正常使用，需要做如下改动：
  > PR：https://github.com/jin-yufeng/mp-html/pull/398
  - 1、`parse.js`中`module.exports = Parser`更改为`export default Parser`。
  - 2、`mp-html.vue`中`const Parser = require('./parser')`更改为`import Parser from './parser'`。
  - 3、`node.vue`中`wxs`相关的代码转移到`js`中。
    - `node.vue`中`handler.use`别忘了更换为转移后的方法。

### 选择vue版本为2时和选择vue版本为3时的区别
* 关于我自己封装的全局代理方法uni.$proxyPage和uni.$proxyComponent的使用？
  - 选择vue版本为2时，在代理方法中使用components会报错。
  - 选择vue版本为3时，在代理方法中使用components不会报错。
* 关于全局组件的注册？
  - 选择vue版本为2时，只能在main.js中进行全局组件的注册，如果把全局组件放到单独的js文件中进行注册则无效。
  - 选择vue版本为3时，依然存在上述问题。
