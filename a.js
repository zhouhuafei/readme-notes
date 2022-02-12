function moneyFormat (money = '100000000') {
  const r = []
  const a = money.split('')
  a.reverse().forEach((v, i) => {
    r.push(v)
    if (i !== a.length - 1 && i % 3 === 2) r.push(',')
  })
  return r.reverse().join('')
}

moneyFormat()
