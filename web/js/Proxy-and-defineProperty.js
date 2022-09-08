/* eslint-disable no-unused-expressions */

// Proxy
// 可以直接监听对象而非属性。
// 可以直接监听数组的变化 - 监听不到属性中数组的变化。
const formFieldsProxy = new Proxy({ name: '1' }, {
  get: (obj, prop) => {
    console.log('Proxy get')
    return obj[prop]
  },
  set: (obj, prop, value) => {
    console.log('Proxy set')
    obj[prop] = value
    return true
  }
})
formFieldsProxy.name
formFieldsProxy.name = '2'

// defineProperty
// 可以监听对象某个属性的变化。
// 无法监听数组变化。
const obj = { name: '1' }
defineProperty(obj, 'name')
obj.name
obj.name = '2'

function defineProperty (obj, attr) {
  let tempVal = obj[attr]
  Object.defineProperty(obj, attr, {
    set: (newValue) => {
      console.log('defineProperty set')
      tempVal = newValue
    },
    get: () => {
      console.log('defineProperty get')
      return tempVal
    }
  })
}
