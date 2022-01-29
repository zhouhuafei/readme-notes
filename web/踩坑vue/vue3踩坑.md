> 官方文档：https://v3.cn.vuejs.org/guide/introduction.html

## 2022/01/29
### element-ui现在支持vue3吗？
* 答：不支持。
### uni-app支持vue3吗？
* 答：支持。但是有些东西要改。如下所示：
1、创建应用的方式要改。main.js内容如下所示：
```
import store from '@/store'
import { createSSRApp } from 'vue'

export function createApp () {
  const app = createSSRApp(App).use(store)
  return { app }
}
```
2、全局组件的注册，需要修改。需要注册到app上。以前是直接注册到Vue上。示例如下所示：
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
