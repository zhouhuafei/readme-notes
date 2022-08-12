// ------ 实现1 ------ //
{
  interface D {
    da: 'da1'
    db: 'db1'
  }

  interface Ec {
    eca: 'eca1'
    ecb: 'ecb1'
  }

  interface E<T = Ec> {
    ea: 'ea1'
    eb: 'eb1'
    ec: T[keyof T] // 可以不用泛型 - 把 - T[keyof T] - 改为 - Ec[keyof Ec] - 拿掉（不拿亦可） - <T = Ec>
  }

  interface Json<T = D, U = E> {
    a: 'a1'
    b: 'b1'
    c: 'c1'
    d: T[keyof T] // 可以不用泛型 - 把 - T[keyof T] - 改为 - D[keyof D] - 拿掉（不拿亦可） - <T = D, U = E>
    e: U[keyof U] // 可以不用泛型 - 把 - U[keyof U] - 改为 - E[keyof E] - 拿掉（不拿亦可） - <T = D, U = E>
  }

  type typeVal = Json[keyof Json]

  const fn = (val: typeVal) => {
    console.log(val)
  }

  fn('a1')
}

// ------ 实现2 ------ //
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
  } as const

  type typeJson = typeof json

  type deep<T = typeJson> = {
    [K in keyof T]: T[K] extends object ? deep<T[K]>[keyof deep<T[K]>] : T[K]
  }

  type typeVal = deep[keyof typeJson]

  const fn = (val: typeVal) => {
    console.log(val)
  }

  fn('a1')
}

// ------ 实现3 ------ //
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
  } as const

  type typeVal<T> = {
    [K in keyof T]: T[K] extends object ? typeVal<T[K]> : T[K]
  }[keyof T]

  const fn = (val: typeVal<typeof json>) => {
    console.log(val)
  }

  fn('a1')
}
