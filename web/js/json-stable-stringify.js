// const stringify = require('json-stable-stringify')

const obj = {
  c: 8,
  b: [
    {
      z: 6,
      y: [
        1,
        {
          b: 2,
          a: 1
        },
        3
      ],
      x: 4
    },
    7
  ],
  a: 3
}
const json = '{"a":3,"b":[{"x":4,"y":[1,{"a":1,"b":2},3],"z":6},7],"c":8}'

function myStringify (obj) {
  function deep (obj) {
    const json = {}
    Object.keys(obj).sort().forEach(key => {
      const val = obj[key]
      if (Object.prototype.toString.call(val).slice(8, -1) === 'Array') {
        val.forEach((v, i, a) => {
          if (Object.prototype.toString.call(v).slice(8, -1) === 'Object') {
            a[i] = deep(v)
          }
        })
        json[key] = val
      } else if (Object.prototype.toString.call(val).slice(8, -1) === 'Object') {
        json[key] = deep(val)
      } else {
        json[key] = val
      }
    })
    return json
  }

  const json = deep(obj)
  return JSON.stringify(json)
}

console.log(myStringify(obj))
console.log(myStringify(obj) === json)
