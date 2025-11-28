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
* 思路：publicPath设置为固定值并配合nginx进行反代，vue-router的base配成动态值。
* webpack不改配置，publicPath还是`/`即可。
* vue-router的基路径`base`配置从网址里读取即可。
* 不同的base，打不同的接口，在`index.html`里进行设置api路径即可。
* 弊端：
  - 因静态资源是二级路由，publicPath是`/`，配置`nginx`的时候会比较麻烦。直接配`/`+`root`会导致主域名下的资源都指向了静态资源。
  - 如果域名只为当前这一个项目服务，那自然是没问题的。如果域名还为别的项目服务，那就会导致其他项目服务异常。
  - 解决方案1：静态资源打包到cdn服务器上。publicPath更改为 https://cdn.24678.top/ 即可。
  - 解决方案2：publicPath换成项目名加其他关键字并配合`nginx`反代。案例：publicPath更改为`/req-res-log-sys/ui/static/`。
* 参考：
  - https://github.com/zhouhuafei/req-res-log-sys

# `this.$router.go(-1)`无效
* 问题描述：token无效会重定向，重定向之后再使用`this.$router.go(-1)`浏览器的url会变但是渲染的内容不会发生变化，需要浏览器刷新一次页面后才可以正常使用。
* 有问题的`vue-router`版本号是：`^3.2.0`。
* 修复方式就是降低版本号至：`^2.7.0`。
