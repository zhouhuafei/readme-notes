/*
* 二分法插入排序，简称二分排序，是在插入第i个元素时，对前面的0～i-1元素进行折半，先跟他们中间的那个元素比，如果小，则对前半再进行折半，否则对后半进行折半，直到left<right，然后再把第i个元素前1位与目标位置之间的所有元素后移，再把第i个元素放在目标位置上。
* */

/*
* 注意：本题与其说是写出来的，不如说是调试出来的。
* 重点：重点在于prevMinIdx。
* */

const arr = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 9, 10, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98]

function sort (newVal) {
  let index = 0
  let len = arr.length
  let first = arr[0]
  let last = arr[len - 1]
  if (newVal <= first) {
    index = 0
  } else if (newVal >= last) {
    index = arr.length
  } else {
    let middleIdx = Math.floor(len / 2)
    let middleVal = arr[middleIdx]
    let nextI = middleIdx + 1
    let next = arr[nextI]
    let prevMinIdx = 0
    while (index === 0) {
      if (newVal >= middleVal && newVal <= next) {
        index = nextI
      } else {
        if (newVal > middleVal) {
          middleIdx = middleIdx + Math.floor(((len - 1 - middleIdx)) / 2)
        } else if (newVal < middleVal) {
          middleIdx = prevMinIdx + Math.floor((middleIdx - prevMinIdx - 1) / 2)
          prevMinIdx = middleIdx
        } else {
          middleIdx = nextI
        }
        middleVal = arr[middleIdx]
        nextI = middleIdx + 1
        next = arr[nextI]
      }
    }
  }
  arr.splice(index, 0, newVal)
  return arr
}

console.log('二分法插入排序的结果：', sort(0))
console.log('二分法插入排序的结果：', sort(2))
console.log('二分法插入排序的结果：', sort(3))
console.log('二分法插入排序的结果：', sort(8))
console.log('二分法插入排序的结果：', sort(9))
console.log('二分法插入排序的结果：', sort(11))
console.log('二分法插入排序的结果：', sort(12))
console.log('二分法插入排序的结果：', sort(13))
console.log('二分法插入排序的结果：', sort(14))
console.log('二分法插入排序的结果：', sort(99))
