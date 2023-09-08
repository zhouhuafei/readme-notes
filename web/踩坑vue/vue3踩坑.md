## 文档
* Vue3的官方文档：https://v3.cn.vuejs.org/guide/introduction.html
* Vue2迁移到Vue3的迁移指南：https://v3.cn.vuejs.org/guide/migration/introduction.html

## 用vue-cli4.5.15创建的vue3+ts项目可以使用TSX么？
* 可以！

## 使用TSX引入scss时怎么使用scoped？
* 参考文章：https://www.jianshu.com/p/be1778a76763
* 文章纠错：`vue-cli`的`css module`默认是开启的，不需要额外配置。
  - `requireModuleExtension`说明：https://cli.vuejs.org/zh/config/#css-requiremoduleextension
* 我的实战：https://github.com/zhouhuafei/hello-world_qiankun-app-child2-vue3/tree/master/src/components/HelloWorldTsx
#### 步骤1：`.scss`结尾的文件改为`.module.scss`结尾的文件。
* 注1：引入非`.module.scss`结尾的文件会生成全局的css。
* 注2：`:global`的写法可以跳出`css module`，不会被编译成哈希字符串。
#### 步骤2：在`shims-vue.d.ts`增加下述代码，防止引入`.module.scss`结尾的文件时，TS报错。
```
// scss
declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```
#### 步骤3：在TSX中使用
* 1、通过`import css from './index.module.scss'`引入scss。
* 2、父级通过`class={css.HelloWorldTsx}`的形式绑定class。
* 3、子级也是通过`class={css.HelloWorldTsxCssModuleText}`的形式绑定class（即使scss嵌套了，也是这么用）。
* 注意：scss里的中划线，不会被转成驼峰。如果是中划线写法，绑定class时，需要这么用：`class={css['hello-world-tsx']}`。
* 建议：建议写css也写驼峰吧。

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

## 从`Element UI`升级到`Element Plus`？
* 官方文档：https://github.com/element-plus/element-plus/discussions/5657
#### svg怎么做到颜色跟着css的color走的？
* 给svg的path标签加上`fill="currentColor"`即可。

## vite和create-vue和vue-cli5
* vite创建的模板太过单调，很多东西都需要自己配置。
* create-vue可选项很多，很多东西都不需要自己配置，是基于vite进行打包。
* vue-cli5可选项很多，很多东西都不需要自己配置，是基于webpack进行打包。

## vite打包后的vue3项目，如果进行本地直接访问，会报错。
* 在`vite.config.ts`中，不对base进行任何配置时（默认为`/`），js会报这个错。css报`net::ERR_FILE_NOT_FOUND`。
* 在`vite.config.ts`中，base设置为`./`后，js还是会报这个错。css不报错。
* Access to script at 'file:///E:/www/github-zhouhuafei/hello-world_vue3/dist/assets/index.b209f783.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
* 解答：在index.html中，使用type为module的script标签引入js时。
  - 需要使用http的方式访问页面，也就是要启动一个静态服务器。
  - 若在本地直接使用file协议进行访问，会报错。

## vue3 + TS项目配置代码规范
* vue-eslint-parser：https://www.npmjs.com/package/vue-eslint-parser
* typescript-eslint：https://typescript-eslint.io/getting-started
* 参考教程：https://zhuanlan.zhihu.com/p/492182151
* 实战参考：https://github.com/zhouhuafei-team/super-task_client
