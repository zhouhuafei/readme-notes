> 官方文档：https://v3.cn.vuejs.org/guide/introduction.html

## v-if和v-for的优先级
* vue3中v-if优先级更高。vue2中v-for优先级更高。

## .sync不能用了
* `:visible.sync`需要更换为`v-model:visible`。
  - v-model在input上使用时和vue2一致。是`:value`和`@input`的语法糖。
  - v-model在组件上使用时和vue2不一致。默认是`:modelValue`和`@update:modelValue`的语法糖。
  - v-model官方文档：https://v3.cn.vuejs.org/guide/component-basics.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model

## element-ui现在支持vue3吗？
* 答：不支持（2022/01/29）。但是可以使用`element-plus`。
