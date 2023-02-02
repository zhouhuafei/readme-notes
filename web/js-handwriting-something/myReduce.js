/* eslint-disable no-extend-native */

const arr = [7, 8, 9]
arr.reduce((r, v, i, a) => {
  // 7, 8, 1
  // 15, 9, 2
  console.log('arr.reduce initVal is undefined', r, v, i, a)
  return r + v
})
arr.reduce((r, v, i, a) => {
  // 1, 7, 0
  // 8, 8, 1
  // 16, 9, 2
  console.log('arr.reduce initVal is 1', r, v, i, a)
  return r + v
}, 1)

Array.prototype.myReduce = function (fn, initVal) {
  let index = 0
  let r = this[index]
  if (!initVal) {
    index = 1
  } else {
    r = initVal
  }
  for (index; index <= this.length - 1; index++) {
    r = fn(r, this[index], index, this)
  }
  return r
}
const myArr = [7, 8, 9]
myArr.myReduce((r, v, i, a) => {
  // 7, 8, 1
  // 15, 9, 2
  console.log('myArr.myReduce initVal is undefined', r, v, i, a)
  return r + v
})
myArr.myReduce((r, v, i, a) => {
  // 1, 7, 0
  // 8, 8, 1
  // 16, 9, 2
  console.log('myArr.myReduce initVal is 1', r, v, i, a)
  return r + v
}, 1)
