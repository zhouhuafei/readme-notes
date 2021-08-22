* paste事件是在内容粘贴到文档流之前触发的，所以要配合定时器，进行延迟使用。
  - 场景：div配合contenteditable模拟textarea。
  - 如果：想获取div的innerHTML。
  - 需要：需要使用setTimeout，否则获取不到。
