## Proxy与Object.defineProperty优劣对比
* https://es6.ruanyifeng.com/#docs/proxy
* https://www.jianshu.com/p/d16565c6b6ee

## Proxy
* Proxy 可以直接监听对象而非属性。
* Proxy 可以直接监听数组的变化。
* Proxy 有多达13种拦截方法，不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。
* Proxy 直接可以劫持整个对象，并返回一个新对象，不管是操作便利程度还是底层功能上都远强于Object.defineProperty。
* Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。

## Object.defineProperty
* 兼容性好，支持IE9。
* 而Proxy存在浏览器兼容性问题，而且无法用polyfill磨平，因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。
* 无法监听数组变化。
