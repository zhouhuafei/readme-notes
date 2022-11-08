/* eslint-disable no-prototype-builtins */
function deepCloneEasyScene (obj, wm = new WeakMap()) {
  const isObject = Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
  const isArray = Object.prototype.toString.call(obj).slice(8, -1) === 'Array'

  let newObj = {}
  if (isArray) newObj = []

  if (isObject || isArray) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key]
        const isObject = Object.prototype.toString.call(val).slice(8, -1) === 'Object'
        const isArray = Object.prototype.toString.call(val).slice(8, -1) === 'Array'
        if (isObject || isArray) {
          wm.set(val, val)
          console.log(wm.get(val))
          newObj[key] = deepCloneEasyScene(val, wm)
        } else {
          newObj[key] = val
        }
      }
    }
  } else {
    newObj = obj
  }

  // ...TODO 深拷贝 - 递归 - 循环引用时会无限递归 - 抽空解决一下 - 先忙别的去了

  return newObj
}

// 深拷贝 - 普通对象
const obj = [{ a: 'a' }, { b: 'b' }]
const newObjFirst = deepCloneEasyScene(obj)
console.log('深拷贝 - 普通对象------obj', obj)
console.log('深拷贝 - 普通对象------newObjFirst', newObjFirst)
console.log('深拷贝 - 普通对象------obj === newObjFirst', obj === newObjFirst)

// 深拷贝 - 循环引用对象
// ...TODO

// 深拷贝 - 暴力实现方式
const newObjLast = JSON.parse(JSON.stringify(obj))
console.log('深拷贝 - 暴力实现方式------newObjLast', newObjLast)
console.log('深拷贝 - 暴力实现方式------obj === newObjLast', obj === newObjLast)

// 弊端：JSON序列化时会把：undefined/函数（包含构造函数）/Symbol对象 忽略掉。
console.log('JSON序列化时会把：undefined 忽略', JSON.stringify({ a: undefined }))
console.log('JSON序列化时会把：函数（包含构造函数） 忽略', JSON.stringify({ a: Symbol }))
console.log('JSON序列化时会把：Symbol对象 忽略', JSON.stringify({ a: Symbol('1') }))
// 弊端：JSON序列化时会把：Map对象/WeakMap对象/Set对象/WeakSet对象/正则/Error对象 转为空json对象。
console.log('JSON序列化时会把：Map对象 转换为空对象', JSON.stringify({ a: new Map([['k1', 'v1'], ['k2', 'v2']]) }))
console.log('JSON序列化时会把：Set对象 转换为空对象', JSON.stringify({ a: new Set([1, 2, 3]) }))
console.log('JSON序列化时会把：正则 转换为空对象', JSON.stringify({ a: /\w+/ }))
console.log('JSON序列化时会把：Error对象 转换为空对象', JSON.stringify({ a: new Error('error') }))
