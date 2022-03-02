// 真正的二分法

// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。
// https://leetcode-cn.com/problems/search-insert-position/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  let l = 0
  let r = nums.length - 1
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2)
    if (target < nums[m]) {
      r = r - 1
    } else if (target > nums[m]) {
      l = l + 1
    } else {
      return m
    }
  }
  return r + 1
}

console.log(searchInsert([1, 3, 5, 6], 5)) // 2
console.log(searchInsert([1, 3, 5, 6], 2)) // 1
console.log(searchInsert([1, 3, 5, 6], 7)) // 4
console.log(searchInsert([1, 3, 5, 6], 0)) // 0
console.log(searchInsert([1], 0)) // 0
console.log(searchInsert([], 0)) // 0
