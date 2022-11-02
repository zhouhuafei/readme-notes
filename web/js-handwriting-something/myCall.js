/* eslint-disable no-extend-native */

Function.prototype.myCall = function (thisIsMe, ...args) {
  if ([null, undefined].indexOf(thisIsMe) !== -1) {
    thisIsMe = globalThis
  } else {
    thisIsMe = Object(thisIsMe)
  }
  const fn = Symbol('fn')
  Object.defineProperty(thisIsMe, fn, { value: this })
  const result = thisIsMe[fn](...args)
  delete thisIsMe[fn]
  return result
}

function fn (arg) {
  console.log('------this', this)
  console.log('------arg', arg)
  console.log('------this.a', this.a)
}

fn.myCall({ a: 'a' }, 'arg')
