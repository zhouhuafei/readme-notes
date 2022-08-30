{
  const str = `constructor (
    a,
    b,
    c,
    d
  )`
  const res = str.match(/constructor\s*\(([^)]*)\)/)
  console.log(res)
}
