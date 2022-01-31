### uni-app用什么打包的？
* 选择vue版本为2时，用的webpack。
* 选择vue版本为3时，用的vite。

### uni-app支持vue3吗？
* 答：支持。在uni-app中，把vue2迁移到vue3有些东西要改。如下所示：
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
* 4、scss问题 - 和`dart-sass`版本多少有点关系。
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
* 5、js问题 - 和打包工具换成`vite`多少有点关系。
  - 不能使用`module.exports = {}`进行导出。需要使用`export default {}`进行导出。
    - 第三方组件中亦如此，`mp-html`组件中的`module.exports`需要更换为`export default`。
    - 放在`uni_modules`目录中的官方`uni-xxx`组件，使用时不需要额外引入。但是第三方组件却需要额外引入，例如`mp-html`组件。
      - 否则会报没有发现模块的错误。...TODO
      - 然后手动引入模块后，页面上又报构造函数没发现的问题。...TODO
  - api响应的数据发生了变更，以前第一形参是出错信息，第二形参是结果。现在第一形参是结果，而错误信息被移到了catch里。
    - 这个有点坑，需要改的地方有点多。
  - 选择vue版本为2时，在uni-app中，可以直接使用`Vue.prototype.$sleep`进行方法绑定。
    - 我尝试使用`app.__proto__.$sleep`进行方法的绑定，发现会报错。vue3不允许使用这种方式进行方法的绑定。
    - vue3需要使用`app.config.globalProperties.$sleep`进行方法的绑定。
* 6、...TODO 鄙人尚未解决的问题
  - mp-html组件需要额外引入，且引入了依然不能用。
  - uni-popup弹窗的关闭关不掉了。应是vue2有些特性vue3不支持，先从自己代码中找问题。

