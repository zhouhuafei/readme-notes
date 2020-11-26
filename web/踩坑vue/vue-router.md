# 路由懒加载
```
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
        },
        {
            path: '*',
            name: 'not-found',
            component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
        },
    ],
});
```

# 表单页面点了回退怎么给予当前页面提示？
> 使用组件内的守卫：`beforeRouteLeave(此守卫内可使用this)`。给出表单还未保存是否确定退出的提示。
* 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。
```
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

# vue-router的二级路由-从页面的url中读取-未经测试-理论上行的通
* webpack不改配置，publicPath还是`/`即可。
* vue-router的基路径`base`配置从网址里读取即可。
* 不同的base，打不同的接口，在`index.html`里进行设置api路径即可。
