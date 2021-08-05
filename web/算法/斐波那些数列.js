// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...]

function fib (num) {
  if (num < 1) return num
  let r = 0
  let one = 0
  let two = 1
  for (let i = 2; i <= num; i++) {
    r = one + two
    one = two
    two = r
  }
  return r
}

console.log(fib(0))
console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(4))
console.log(fib(5))
console.log(fib(6))
console.log(fib(7))
console.log(fib(8))
console.log(fib(9))
