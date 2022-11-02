/* eslint-disable no-prototype-builtins */
function deepCloneEasyScene (obj) {
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
          newObj[key] = deepCloneEasyScene(val)
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

const obj = [{ a: 'a' }, { b: 'b' }]
const newObj = deepCloneEasyScene(obj)
console.log('------obj', obj)
console.log('------newObj', newObj)
console.log('------obj === newObj', obj === newObj)

const newObj2 = JSON.parse(JSON.stringify(obj)) // 另外一种实现方式
console.log('------newObj2', newObj2)
console.log('------obj === newObj2', obj === newObj2)
