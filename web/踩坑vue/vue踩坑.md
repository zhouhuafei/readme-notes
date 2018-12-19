* 生命周期
    - ![图片加载中...](./images/1.png)

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
* 踩坑之 - nprogress插件卡顿。进度条超级缓慢增长且一直转圈圈。
    - 触发条件：```beforeEach```中检测续费是否到期了，如果到期了则使用```next({path: 'no-auth'})```方法跳到续费页。当自动跳到续费页之后，如果在续费到期页不续费然后点击别的页面想要跳转则会造成卡顿。
    - 造成卡顿的原因：虽然```afterEach```函数中有```NProgress.done()```，但是在使用```next```函数时，因传递了参数进行重定向路由，造成当前的导航被中断。以至于不会走到```afterEach```函数中。
    - 解决方案：```next```跳到续费页之后要使用```NProgress.done()```方法手动触发一下结束。
    ```
    next({path: 'no-auth'});
    NProgress.done();
    ```
    - 参考文档：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%AE%88%E5%8D%AB
    - 文档摘录：
        - ```next()```：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
        - ```next('/')``` 或者 ```next({ path: '/' })```：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

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
