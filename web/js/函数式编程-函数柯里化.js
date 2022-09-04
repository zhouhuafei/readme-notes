// http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html

// 函数式编程
// 函数式编程是种编程方式。

// 函数柯里化
// 函数柯里化就是把接收多个参数的函数转变为接收一个单一参数的函数，并且返回接收余下参数的函数。

// 函数柯里化案例 - 简单案例
{
  // 柯里化之前
  function add (x, y) {
    return x + y
  }

  console.log(add(1, 2))

  // 柯里化之后
  function addUseCurry (x) {
    return function (y) {
      return x + y
    }
  }

  console.log(addUseCurry(1)(2))
}

// 函数柯里化案例 - 复杂案例
{
  function fnAdd (...args) {
    return args.reduce(function (a, b) {
      return a + b
    })
  }

  function fnSort (...args) {
    return args.sort((a, b) => a - b)
  }

  function curry (fnHandler) {
    const args = []
    return function fn (...rest) {
      if (rest.length === 0) {
        const r = fnHandler(...args)
        args.length = 0
        return r
      } else {
        args.push(...rest)
        return fn
      }
    }
  }

  const add = curry(fnAdd)
  console.log(add(1)(2)(3)(4)())
  console.log(add(4, 3)(2, 1)())

  const sort = curry(fnSort)
  console.log(sort(1)(2)(3)(4)())
  console.log(sort(4, 3)(2, 1)())
}
