{
  // 根据对象的多个键获取对象的多个的值
  const getObjValues = <T, K extends keyof T> (obj: T, keys: K[]): Array<T[K]> => keys.map((key) => obj[key])
  getObjValues({ a: 'hello', b: 1, c: true }, ['a', 'b', 'c'])
}
