const json = {
  a: 'a1',
  b: 'b1',
  c: 'c1',
  d: {
    da: 'da1',
    db: 'db1'
  },
  e: {
    ea: 'ea1',
    eb: 'eb1',
    ec: {
      eca: 'eca1',
      ecb: 'ecb1'
    }
  }
}

// 得到对象的嵌套层级
function getKey () {
  const a = {}

  function deep (json, k, kayBak) {
    Object.keys(json[k]).forEach(k2 => {
      a[`${kayBak}_${k2}`] = json[k][k2]
      if (typeof json[k][k2] === 'object') {
        deep(json[k], k2, `${k}_${k2}`)
      }
    })
  }

  Object.keys(json).forEach(k => {
    if (typeof json[k] === 'object') {
      a[k] = json[k]
      deep(json, k, k)
    } else {
      a[k] = json[k]
    }
  })

  return a
}

console.log(getKey())
