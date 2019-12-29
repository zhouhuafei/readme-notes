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
* fetch响应的是个流(ReadableStream)。需要res.json()转成json对象。或者res.text()转成字符串。
* 可在Service Worker中使用的请求API。

### Service Worker
> 可用于拦截请求和响应以及操作Cache Storage，配合Cache Storage使应用可以离线访问。
* index.js
```
window.addEventListener('load', async () => {
  if (!navigator.serviceWorker) return
  try {
    const registration = await navigator.serviceWorker.register('sw.js')
    console.log('注册成功', registration)
  } catch (e) {
    console.log('注册失败')
  }
})
```
* sw.js
```javascript
/**
* event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
* 下述使用 self 或 this 都可以。
* */
const cacheName = 'cache_v1'
self.addEventListener('install', async (event) => { // 主要用以缓存内容
  // 缓存内容
  const cache = await caches.open(cacheName)
  await cache.addAll([
    '/',
    '/index.css',
    '/manifest.json',
    '/images/logo.png',
    '/api/goods/list'
  ])

  // event.waitUntil(self.skipWaiting()) // 固定写法。用以跳过等待，使之能进入到activate钩子。
  // 上述可配合 async 改写为
  await self.skipWaiting()
})
self.addEventListener('activate', async (event) => { // 主要用以清除旧的缓存
  // cacheName改变进而清除旧的缓存
  const keys = await caches.keys()
  keys.forEach(key => {
    if (key !== cacheName) {
      caches.delete(key)
    }
  })

  // event.waitUntil(self.clients.claim()) // 固定写法。表示Service Worker激活后，立即获取控制权。
  // 上述可配合 async 改写为
  await self.clients.claim()
})
self.addEventListener('fetch', async (event) => {
  const req = event.request
  const url = new URL(req.url)
  if (url.origin !== self.origin) { // 只缓存同源的
    return
  }
  if (req.url.includes('/api')) {
    event.respondWith(networkFirst(req)) // 给浏览器响应 - 网络优先
  } else {
    event.respondWith(cacheFirst(req)) // 给浏览器响应 - 缓存优先
  }

  console.log('fetch event', event)
  console.log('fetch event.request.url', event.request.url)
})

// 网络优先(经常变化的，例如api) - 资源如果请求失败，则读取缓存。
async function networkFirst (req) {
  const cache = await caches.open(cacheName)
  try {
    const fresh = await fetch(req)
    cache.put(req, fresh.clone()) // 缓存更新
    return fresh
  } catch (e) {
    const cached = await cache.match(req)
    return cached
  }
}


// 缓存优先(不经常变化的，例如静态资源) - 缓存里有，则读取缓存里的。
async function cacheFirst (req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    if (cached) {
      return cached
    } else {
      const fresh = await fetch(req)
      cache.put(req, fresh.clone()) // 缓存更新
      return fresh
    }
}
```

### Cache Storage
> caches.open(cacheName)
* CacheStorage 接口表示 Cache 对象的存储。

### Notification
> let notification = new Notification(title, options)
* Notifications API 的通知接口用于向用户配置和显示桌面通知。
* index.js
```
async function fn () {
  if (Notification.permission === 'default') { // 允许没必要再次询问，拒绝再次询问无效。固默认才询问。
    await Notification.requestPermission()
  }
  if (!navigator.onLine) {
    new Notification('提示', { body: '离线访问中' })
  }
  window.addEventListener('offline', () => {
    new Notification('提示', { body: '网络断开了' })
  })
  window.addEventListener('online', () => {
    new Notification('提示', { body: '网络连接了' })
  })
}
fn()
```
