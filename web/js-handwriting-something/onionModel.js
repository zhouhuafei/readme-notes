// https://segmentfault.com/a/1190000022930165
// https://juejin.cn/post/7046713578547576863

class App {
  #middlewares = []

  use (fn) {
    this.#middlewares.push(fn)
    return this
  }

  #dispatch (i) {
    const fn = this.#middlewares[i]
    if (!fn) return Promise.resolve()
    try {
      const ctx = {}
      const next = () => {
        return this.#dispatch(i + 1)
      }
      return Promise.resolve(fn(ctx, next))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  run () {
    this.#dispatch(0)
  }
}

const app = new App()
app.use(async (ctx, next) => {
  console.log('A1')
  await next()
  console.log('A2')
})
app.use(async (ctx, next) => {
  console.log('B1')
  await next()
  console.log('B2')
})
app.use(async (ctx, next) => {
  console.log('C1')
  await next()
  console.log('C2')
})
// 打印顺序：A1、B1、C1、C2、B2、A2
app.run()
