## 文档
* Vue3的官方文档：https://v3.cn.vuejs.org/guide/introduction.html
* Vue2迁移到Vue3的迁移指南：https://v3.cn.vuejs.org/guide/migration/introduction.html

## 使用TSX写组件是不是就不能用模板的语法糖了？
* 是的！不能用！

## v-if和v-for的优先级
* vue3中v-if优先级更高。vue2中v-for优先级更高。

## vue3封装的组件vue2可以用么？
* 如果组件是使用两者都支持的api写的，则两者都可以用。

## .sync不能用了
* `:visible.sync`需要更换为`v-model:visible`。
  - v-model在input上使用时和vue2一致。是`:value`和`@input`的语法糖。
  - v-model在组件上使用时和vue2不一致。默认是`:modelValue`和`@update:modelValue`的语法糖。
  - v-model官方文档：https://v3.cn.vuejs.org/guide/component-basics.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model

## element-ui现在支持vue3吗？
* 答：不支持（2022/01/29）。但是可以使用`element-plus`。

## vue-router的404配置？
```
{
  // 匹配所有路径
  // vue2使用*
  // vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
  path: '/:pathMatch(.*)*',
  name: '404',
  meta: { title: '404', hidden: true },
  component: () => import(/* webpackChunkName: "404" */ '@/views/404/index.vue')
}
```
