// 理解keyof
{
  const obj = {
    a: 'a1',
    b: 'b1'
  } as const

  type O = typeof obj
  type res1 = keyof O
  type res2 = O[keyof O]

  type alias = {
    [K in keyof O]: O[K]
  }
  type res3 = keyof alias
  type res4 = alias[keyof alias]
}

// 得到key
{
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

  type typeKey<T> = {
    [K in keyof T]: T[K] extends string ? K : K | typeKey<T[K]>
  }[keyof T]

  const fn = (val: typeKey<typeof json>) => {
    console.log(val)
  }

  fn('a')
}
