## 在uni-app中使用pinia的store.$reset()时，要么js异常，要么页面被不断重定向。
```javascript
// store.$reset()受语法糖影响故加此代码
const pinia = createPinia()
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$patch(initialState)
  }
})
```

## budlet-client小程序，自定义页面中，被v-if限制的WidgetIndex组件及其内部组件，他们对应的onLoad钩子都不会被触发。首页不存在类似问题。
* 虽然onLoad钩子不会被触发，但是下述钩子均会被触发。
  - onBeforeMount钩子会被触发。
  - onMounted钩子会被触发。
  - onReady钩子会被触发。
* 建议在组件中使用onMounted钩子或onReady钩子。
