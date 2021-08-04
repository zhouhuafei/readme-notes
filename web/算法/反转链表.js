// 所有的递归都可以改写成使用while循环实现
{
  // 生成链表
  function genListNode (arr) {
    if (!arr || !arr.length) return {}
    let maxIndex = arr.length - 1
    const r = {}
    let next
    arr.forEach((v, i) => {
      if (!next) {
        r.val = v
        if (i < maxIndex) {
          r.next = {}
          next = r.next
        }
      } else {
        next.val = v
        if (i < maxIndex) {
          next.next = {}
          next = next.next
        }
      }
    })
    return r
  }

  const listNode1 = genListNode(['a', 'b', 'c', 'd', 'e', 'f'])
  console.log('listNode1', listNode1)
  const listNode2 = genListNode(['a'])
  console.log('listNode2', listNode2)
  const listNode3 = genListNode([])
  console.log('listNode3', listNode3)

  // 反转链表 - 方式1 - 链表转成数组，进行数组的反转，数组转成链表
  function reverseListNode1 (listNode) {
    if (!listNode) return {}
    if (!listNode.next) return listNode
    const arr = [listNode.val]
    let next = listNode.next
    while (next) {
      arr.push(next.val)
      next = next.next
    }
    arr.reverse()
    return genListNode(arr)
  }

  // 反转链表 - 方式2 - 链表反向拼接，把第1个变成尾巴，第2个变成第1个尾巴的头，第3个变成第2个尾巴的头，依次类推。
  // 想象一下有1个空数组，每次遍历都是使用unshift方法进行填充。
  // 即每次遍历都是从头部进行数据的填充，每次填充瞬间，当前被填充的数据都处在头部位置。
  // 当所有数据填充完毕，一个被反转的数据结构就形成了。
  function reverseListNode2 (listNode) {
    if (!listNode) return {}
    if (!listNode.next) return listNode
    let r = {
      val: listNode.val
    }
    let next = listNode.next
    while (next) {
      r = {
        val: next.val,
        next: r
      }
      next = next.next
    }
    return r
  }

  const listNode1BeReversed1 = reverseListNode1(listNode1)
  console.log('listNode1BeReversed1', listNode1BeReversed1)

  const listNode1BeReversed2 = reverseListNode2(listNode1)
  console.log('listNode1BeReversed2', listNode1BeReversed2)

  const noParamTriggerReverseListNode = reverseListNode2()
  console.log('noParamTriggerReverseListNode', noParamTriggerReverseListNode)

  const noNextTriggerListNode = reverseListNode2({ val: 'no next' })
  console.log('noNextTriggerListNode', noNextTriggerListNode)
}
