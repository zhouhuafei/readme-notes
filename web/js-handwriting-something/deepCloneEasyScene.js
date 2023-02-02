/* eslint-disable no-prototype-builtins */
function deepCloneEasyScene (obj, wm = new WeakMap()) {
  const isObject = Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
  const isArray = Object.prototype.toString.call(obj).slice(8, -1) === 'Array'

  let newObj = {}
  if (isArray) newObj = []

  if (!isObject && !isArray) return obj
  if (wm.get(obj)) return wm.get(obj)

  wm.set(obj, newObj) // 因存在对象引用，固被提前设置的newObj对象，其键值对是完整的。

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      const isObject = Object.prototype.toString.call(val).slice(8, -1) === 'Object'
      const isArray = Object.prototype.toString.call(val).slice(8, -1) === 'Array'
      if (isObject || isArray) {
        newObj[key] = deepCloneEasyScene(val, wm)
      } else {
        newObj[key] = val
      }
    }
  }

  return newObj
}

// 深拷贝 - 普通对象
const obj = [{ a: 'a' }, { b: 'b' }]
const newObjFirst = deepCloneEasyScene(obj)
console.log('深拷贝 - 普通对象------obj', obj)
console.log('深拷贝 - 普通对象------newObjFirst', newObjFirst)
console.log('深拷贝 - 普通对象------obj === newObjFirst', obj === newObjFirst)
console.log('')

// 深拷贝 - 循环引用对象
const obj2 = { a: 1, b: 2, c: 3 }
obj2.obj2 = obj2
const newObj2 = deepCloneEasyScene(obj2)
console.log('深拷贝 - 循环引用对象------obj2', obj2)
console.log('深拷贝 - 循环引用对象------newObj2', newObj2)
console.log('深拷贝 - 循环引用对象------obj2 === newObj2', obj2 === newObj2)
console.log('深拷贝 - 循环引用对象------obj2 === newObj2.obj2', obj2 === newObj2.obj2)
console.log('深拷贝 - 循环引用对象------obj2 === newObj2.obj2.obj2', obj2 === newObj2.obj2.obj2)
console.log('深拷贝 - 循环引用对象------obj2.obj2 === newObj2.obj2', obj2.obj2 === newObj2.obj2)
console.log('深拷贝 - 循环引用对象------obj2.obj2 === newObj2.obj2.obj2', obj2.obj2 === newObj2.obj2.obj2)
console.log('')

// 深拷贝 - 暴力实现方式
const newObjLast = JSON.parse(JSON.stringify(obj))
console.log('深拷贝 - 暴力实现方式------newObjLast', newObjLast)
console.log('深拷贝 - 暴力实现方式------obj === newObjLast', obj === newObjLast)
console.log('')

// 注意：JSON序列化时会把：undefined/函数（包含构造函数）/symbol类型的值 忽略掉。
console.log('JSON序列化时会把：undefined 忽略', JSON.stringify({ a: undefined }))
console.log('JSON序列化时会把：函数（包含构造函数） 忽略', JSON.stringify({ a: Symbol }))
console.log('JSON序列化时会把：symbol类型的值 忽略', JSON.stringify({ a: Symbol('1') }))
console.log('')

// 注意：JSON序列化时会把：Map实例/WeakMap实例/Set实例/WeakSet实例/正则/Error实例 转为空json对象。
console.log('JSON序列化时会把：Map实例 转换为空对象', JSON.stringify({ a: new Map([['k1', 'v1'], ['k2', 'v2']]) }))
console.log('JSON序列化时会把：Set实例 转换为空对象', JSON.stringify({ a: new Set([1, 2, 3]) }))
console.log('JSON序列化时会把：正则 转换为空对象', JSON.stringify({ a: /\w+/ }))
console.log('JSON序列化时会把：Error实例 转换为空对象', JSON.stringify({ a: new Error('error') }))

// 注意：JSON序列化时会把：Date对象的实例转为字符串
console.log('JSON序列化时会把：Date对象的实例转为字符串', JSON.stringify({ a: new Date() }))

// 注意：JSON序列化时会把：NaN转为null
console.log('JSON序列化时会把：NaN转为null', JSON.stringify({ a: NaN }))

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
