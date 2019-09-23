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
