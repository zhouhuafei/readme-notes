/* eslint-disable no-unused-expressions */

// Proxy
// 可以监听对象的变化
// 监听不到数组的变化
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
// 监听不到对象的变化
// 监听不到数组的变化
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
