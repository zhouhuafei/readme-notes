const getThirdMax = (array) => {
  let first = -Infinity, second = -Infinity, third = -Infinity

  for (let i = 0; i < array.length; i++) {
    const num = array[i]
    if (num === first || num === second || num === third) continue
    if (num > first) {
      third = second
      second = first
      first = num
    } else if (num > second) {
      third = second
      second = num
    } else if (num > third) {
      third = num
    }
  }

  return third === -Infinity ? null : third
}

console.log(getThirdMax([2, 5, 3, 9, 1, 6]))
