/*
* 插入排序（Insertion Sort）是一种简单直观且稳定的排序算法。
* 如果有一个已经有序的数据序列，要求在这个已经排好的数据序列中插入一个数，但要求插入后此数据序列仍然有序，这个时候就要用到插入排序法。
* */

const arr = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 9, 10, 88]

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
    arr.forEach((v, i, a) => {
      let nextI = i + 1
      let next = a[nextI]
      if (newVal >= v && newVal <= next) {
        index = nextI
      }
    })
  }
  arr.splice(index, 0, newVal)
  return arr
}

console.log('插入排序的结果：', sort(0))
console.log('插入排序的结果：', sort(2))
console.log('插入排序的结果：', sort(3))
console.log('插入排序的结果：', sort(8))
console.log('插入排序的结果：', sort(9))
console.log('插入排序的结果：', sort(11))
console.log('插入排序的结果：', sort(12))
console.log('插入排序的结果：', sort(13))
console.log('插入排序的结果：', sort(14))
console.log('插入排序的结果：', sort(99))
