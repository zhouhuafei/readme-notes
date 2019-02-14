# 生命周期
![图片加载中...](./images/1.jpg)

# 常用生命周期比对
* beforecreated
    - ```el```和```data```并未初始化。
* created
    - 完成了```data```数据的初始化，```el```没有。
* beforeMount
    - 完成了```el```初始化。
    - 此时dom尚未被渲染到页面中。
* mounted
    - 完成挂载。
    - 此时dom已被渲染到页面中。

# 其他生命周期钩子
* beforeUpdate
    - 组件更新之前调用
* updated
    - 组件更新之后调用
* beforeDestroy
    - 组件销毁之前调用
* Destroyed
    - 组件销毁之后调用
* activated
    - keep-alive 组件激活时调用
* deactivated
    - keep-alive 组件停用时调用

# 其他
* 父组件内覆盖子组件样式
    - 方案1，style标签不使用scoped属性。弊端应该是会影响到全局所有的吧。
    - 方案2，使用两个style标签。一个不使用scoped属性，用来覆盖子组件样式。一个使用scoped属性，用来写父组件样式。弊端应该是会影响到全局所有的吧。
    - 方案3，/deep/ 选择器
    ```
    .parent /deep/ .child {}
    ```

* 如果是通过script标签直接使用vue，建议放到head标签里，这样可以防止出现{{}}导致页面抖动的问题。
    - 如果引入的vuejs文件放在底部，你可以在Vue实例参数的template属性中写模版，也不会出现抖动问题。

* vue-lazyload导致数据图片不更换
    - 先把数据清空，再赋值即可。

* 后续给对象添加属性，不会更新视图，需要使用Vue.set(obj, attr, value)才行。
    - 注意：属性如果本来就没有，直接绑定到模板template上会导致报错，所以应该在模板渲染之前处理数据，所以应该在created钩子中处理数据。

* 生产版本，不能被浏览器上的Vue Devtools工具调试。

# 父子通信
* 父传子 props
* 子传父 this.$emit(fnName, data);
* props是只读的，请遵守这个原则。

# vue-router
* afterEach和beforeEach中this不是Vue的实例。
* 如果需要使用$store。直接使用定义好的变量store即可。
* 如果需要使用$route。回调的参数中就有。

# 对象没有属性的时候会报错
* v-if判断，有值的时候才渲染即可。

# v-for
* 需要有key且key不能绑定到template标签上。

# vue-router
* 设置参数只能通过meta。
* params接收路由匹配的动态路由数据。例如：路由设置为：```/user/:id```，访问：```/user/10```，可以得到```{id: 10}```。
* query接收路由匹配的query数据。例如：路由设置为：```/user/```，访问：```/user/?id=10```，可以得到```{id: 10}```。

# vue-router踩坑之 - nprogress插件卡顿。进度条超级缓慢增长且一直转圈圈。
* 简洁化之后有问题的代码如下：
```
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== '/no-auth/') {
    next({path: '/no-auth/'});
  } else {
    next();
  }
});

router.afterEach(transition => {
  NProgress.done();
});
```
* 重现步骤和原因解析对应：
    1. 输入'/'进入首页，此时会重定向到```/no-auth/```。
    2. 然后点首页路由的按钮。此时会卡死。
* 原因解析和重现步骤对应：
    1. 输入```/```触发```beforeEach```，执行```next({path: '/no-auth/'});```，再次触发```beforeEach```，然后触发```next()```，进入到```/no-auth/```页面，然后触发```afterEach```。
    2. 点首页路由的按钮，触发```beforeEach```，因首页路由的```path```是```/```，则触发```next({path: '/no-auth/'});```。因重定向的路由```/no-auth/```和当前路由```/no-auth/```相同，则不会触发```afterEach```。
* 解决方案：```next({path: 'no-auth'});```的下一行加一句：```NProgress.done();```
* 总结：
    - next重定向的路由如果和当前路由相同，则不会触发```afterEach```。
    - 经测试。如果每次```next```的路由和当前的路由不一致。是会触发```afterEach```的。所以我得出的结论是正确的。

# 报错
* 用webpack3打包vue之后报错：```Cannot read property 'call' of undefined```
    - 报错原因：webpack插件使用错误。```new ExtractTextPlugin(`css/pages/[name].${configEnvironment.contenthash}css`)```。
    - 解决方案：
    ```
    new ExtractTextPlugin({
        filename: `css/pages/[name].${configEnvironment.contenthash}css`,
        allChunks: true,
    })
    ```
* jx-pc项目打包时element-ui报错
    - 报错信息如下：
    ```
    ERROR in static/js/vendor.73b56240afcbef7912d1.js from UglifyJs
    Unexpected token: name (idSeed) [./~/_element-ui@1.4.13@element-ui/src/utils/popup/index.js:7,0][static/js/vendor.73b56240afcbef7912d1.js:18381,4]
    ```
    - 报错原因：因后续使用了cnpm安装依赖包。目录树不一致。
    ```
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('node_modules/element-ui/packages'),
          resolve('node_modules/element-ui/src')
        ]
    }
    ```
    - 解决方案：使用正确的包名或者用npm安装依赖。
    ```
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('node_modules/_element-ui@1.4.13@element-ui/packages'),
          resolve('node_modules/_element-ui@1.4.13@element-ui/src')
        ]
    }
    ```

# 修饰符.sync
从 2.3.0 起我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 监听器。
* 示例：```<comp :foo.sync="bar"></comp>```
* 会被扩展为：```<comp :foo="bar" @update:foo="val => bar = val"></comp>```
* 当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：```this.$emit('update:foo', newValue)```
* 完整示例如下：
```
<template>
    <div class="details">
        <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
        <button @click="changeValue">toggle</button>
    </div>
</template>
<script>
import Vue from 'vue'
Vue.component('myComponent', {
      template: `<div v-if="show">
                    <p>默认初始值是{{show}}，所以是显示的</p>
                    <button @click.stop="closeDiv">关闭</button>
                 </div>`,
      props:['show'],
      methods: {
        closeDiv() {
          this.$emit('update:show', false); //触发 input 事件，并传入新值
        }
      }
})
export default{
    data(){
        return{
            valueChild:true,
        }
    },
    methods:{
        changeValue(){
            this.valueChild = !this.valueChild
        }
    }
}
</script>
```

# vue 自定义组件使用v-model
* v-model只是个语法糖。
    - type="text"和textarea标签对v-model的应用原理类似。如下：
    ```
    <input v-model="value"/>
    等同于
    <input :value="value" @input="value=$event.target.value"/>
    ```
* 自定义组件也能用v-model。只需在子组件内部需要修改value值的地方，触发一下```this.$emit('input', 'newValue')```。就可以实现双向数据绑定了。
    - 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件。
    - 但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。
    - model 选项可以用来避免这样的冲突：
    ```
    Vue.component('base-checkbox', {
      model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean
      },
      template: `
        <input
          type="checkbox"
          v-bind:checked="checked"
          v-on:change="$emit('change', $event.target.checked)"
        >
      `
    })
    ```
    - 官方v-model文档：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
* 我写的简单案例：https://github.com/zhouhuafei/hello-world/tree/master/vue

# radio和checkbox以及select的v-model理解
* 原生的input表单。不同类型。vue的v-model进行了不同的处理。
* v-model源码：https://github.com/vuejs/vue/blob/dev/src/platforms/web/compiler/directives/model.js#L96
* 当我们使用v-model自定义一个radio或者checkbox或者select时，我们需要根据v-model这个语法糖进行我们自己的处理。
    - 不用思考vue的v-model对原生的表单是怎么处理的。
    - 只需要知道v-model这个语法糖用在自定义组件上时表达的意思即可：```一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件```。
    - 然后根据v-model所表达的意思去做你想实现的东西。

# vue scope slot
> 作用域插槽
* 步骤一：子组件内部给slot标签上绑定一个属性```<slot v-bind:todo="todo"></slot>```。
* 步骤二：父组件中使用```slot-scope="slotProps"```接收。然后就可以是```{{slotProps.todo}}```获取到了。
* 文档：https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD

# 在动态组件上使用 keep-alive
* keep-alive 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
* 注意：注意这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
* 文档：https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive

# 监听路由变化
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
或使用组件内守卫```beforeRouteUpdate```
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

# nextTick
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```
this.$nextTick(() => {
    // 后续操作写在此处
});
```
