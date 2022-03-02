/*
* 快速排序（Quick Sort）是对冒泡排序的一种改进。
* 快速排序由C. A. R. Hoare在1962年提出。
* 它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。
* */

const arr = [7, 8, 7, 9, 10, 2, 4, 3, 6, 7, 1, 5]

function sort (arr) {
  if (arr.length <= 1) {
    return arr
  }
  const arrL = []
  const arrR = []
  const middleVal = arr[0]
  const middleArr = []
  arr.forEach(v => {
    if (v < middleVal) {
      arrL.push(v)
    } else if (v > middleVal) {
      arrR.push(v)
    } else {
      middleArr.push(middleVal)
    }
  })
  return sort(arrL).concat(middleArr, sort(arrR))
}

console.log('快速排序的结果：', sort(arr))
