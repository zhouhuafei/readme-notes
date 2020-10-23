const list = [
  {
    name: '图书',
    children: [
      {
        name: '行为学',
        children: [
          { name: '怪诞行为学之可预测的非理性' },
          { name: '怪诞行为学之非理性的积极力量' }
        ]
      },
      {
        name: '心理学',
        children: [
          { name: '影响力' }
        ]
      },
      { name: '经济学' }
    ]
  },
  {
    name: '服饰',
    children: [
      { name: '上衣' },
      { name: '下衣' }
    ]
  },
  {
    name: '其他'
  }
]

// 设置等级
const setLevel = (list) => {
  const myList = JSON.parse(JSON.stringify(list))
  const fn = (list, level) => {
    list.forEach(item => {
      const myLevel = level + 1
      item.level = myLevel
      if (item.children) {
        fn(item.children, myLevel)
      }
    })
  }
  fn(myList, 0)
  console.log('设置完等级之后的数据：', myList)
  return myList
}
setLevel(list)

// 设置链路
const setTrace = (list) => {
  const myList = JSON.parse(JSON.stringify(list))
  const fn = (list, parent) => {
    list.forEach(item => {
      if (parent.traceArr) {
        item.traceArr = [...parent.traceArr, item.name]
      } else {
        item.traceArr = [item.name]
      }
      if (parent.traceObj) {
        item.traceObj = [...parent.traceObj, item]
      } else {
        item.traceObj = [item]
      }
      if (item.children) {
        fn(item.children, item)
      }
    })
  }
  fn(myList, {})
  console.log('设置完链路之后的数据：', myList)
  return myList
}
setTrace(list)

// 找爹行动
const children = [
  '怪诞行为学之可预测的非理性',
  '行为学',
  '影响力',
  '心理学',
  '经济学',
  '上衣',
  '其他'
]
const getFather = (children, list) => {
  const myList = JSON.parse(JSON.stringify(list))
  let result = {
    arrStr: [],
    arrObj: []
  }
  const fn = (list, parent) => {
    list.forEach(item => {
      if (parent.traceArr) {
        item.traceArr = [...parent.traceArr, item.name]
      } else {
        item.traceArr = [item.name]
      }
      if (parent.traceObj) {
        item.traceObj = [...parent.traceObj, item]
      } else {
        item.traceObj = [item]
      }
      const index = children.indexOf(item.name)
      if (index !== -1) {
        result.arrStr[index] = item.traceArr
        result.arrObj[index] = item.traceObj
      }
      if (item.children) {
        fn(item.children, item)
      }
    })
  }
  fn(myList, {})
  console.log('找爹行动之后的数据：', result)
  return result
}
getFather(children, list)
