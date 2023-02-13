{
  // 根据对象的多个键获取对象的多个的值
  const getObjValues = <T, K extends keyof T> (obj: T, keys: K[]): Array<T[K]> => keys.map((key) => obj[key])
  getObjValues({ a: 'hello', b: 1, c: true }, ['a', 'b', 'c'])
}

{
  // 枚举值
  enum myEnum {A, B}

  // 使用typeof操作枚举值
  type myTypeofEnum = typeof myEnum

  // 使用keyof操作被typeof后的ts类型
  type myKeyofTypeofEnum = keyof myTypeofEnum

  // A和B键必须有且值需要是数字
  const myTypeofEnumVal: myTypeofEnum = { A: 6, B: 7 }

  // A和B键必须有且值需要是数字 - 数字键如是存在则其值必须是字符串
  const myTypeofEnumVal2: myTypeofEnum = { A: 6, B: 7, 11: 'xxx', 111: 'yyy', 1111: 'zzz' }

  // 只能是：'A'|'B'
  const myKeyofTypeofEnumVal: myKeyofTypeofEnum = 'A'

  // 只能是：'A'|'B'
  const myKeyofTypeofEnumVal2: myKeyofTypeofEnum = 'B'
}
