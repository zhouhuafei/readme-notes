// setTimeout的第3个参数

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 0)
// }

// for (var i = 0; i < 5; i++) {
//   ((i) => {
//     setTimeout(() => {
//       console.log(i)
//     }, 0)
//   })(i)
// }

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 0)
// }

// for (var i = 0; i < 5; i++) {
//   setTimeout((i) => {
//     console.log(i)
//   }, 0, i)
// }

// setTimeout((...args) => {
//   console.log(args)
// }, 0, 'a', 'b', 'c', 'd')

// setInterval同理，也可以额外传入很多参数。

setInterval((...args) => {
  console.log(args)
}, 1000, 'a', 'b', 'c', 'd')
