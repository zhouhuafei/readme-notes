> 注：PWA只能在https环境中应用(生产环境必须是https环境)，也能在http://localhost中应用(以便于在开发环境开发和调试)。

# 主要知识点

### Manifest
> manifest.json
* 可添加应用至桌面。
* 有启动界面。
* 可隐藏浏览器相关UI，比如地址栏。

### Promise async/await
* PWA相关的API都是基于Promise的。

### Fetch API
> fetch(url)
* 可在Service Worker中使用的请求API。

### Service Worker
> navigator.serviceWorker.register('sw.js')
* 可用于拦截请求和响应以及操作Cache Storage，配合Cache Storage使应用可以离线访问。
* sw.js
```javascript
/**
* event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
* 下述使用 self 或 this 都可以。
* */
self.addEventListener('install', (event) => {
  // ...
  event.waitUntil(self.skipWaiting()) // 固定写法。用以跳过等待，使之能进入到activate钩子。
})
self.addEventListener('activate', (event) => {
  // ...
  event.waitUntil(self.skipWaiting()) // 固定写法。表示Service Worker激活后，立即获取控制权。
})
self.addEventListener('fetch', (event) => {
  // ...
  console.log('fetch event', event)
})
```

### Cache Storage
> caches.open(cacheName)
* CacheStorage 接口表示 Cache 对象的存储。

### Notification
> let notification = new Notification(title, options)
* Notifications API 的通知接口用于向用户配置和显示桌面通知。
