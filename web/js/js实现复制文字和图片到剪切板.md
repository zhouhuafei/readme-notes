> js实现复制文字和图片到剪切板

## 复制文字
```html
<button class="my-copy-txt-btn">复制文本</button>
<script>
document.querySelector('.my-copy-txt-btn').addEventListener('click', () => {
  const input = document.createElement('input')
  document.body.appendChild(input) // 需要先在页面上渲染出来
  input.value = Math.random()
  input.focus()
  input.select()
  input.blur()
  document.execCommand('Copy')
  document.body.removeChild(input)
})
</script>
```

## 复制图片
> https://blog.csdn.net/amyleeYMY/article/details/99311440
```html
<img class="my-copy-img" src="http://cdqn.zhimeiplus.com/100_1553073239871_19857911.png" alt="">
<button class="my-copy-img-btn">复制图片</button>
<script>
function getSelect (targetNode) {
  if (window.getSelection) { // chrome等主流浏览器
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNode(targetNode)
    selection.removeAllRanges()
    selection.addRange(range)
  } else if (document.body.createTextRange) { // ie
    const range = document.body.createTextRange()
    range.moveToElementText(targetNode)
    range.select()
  }
}

document.querySelector('.my-copy-img-btn').addEventListener('click', () => {
  getSelect(document.querySelector('.my-copy-img'))
  document.execCommand('copy')
  window.getSelection().removeAllRanges() // copy之后清空选择区域
})
</script>
```
* 我本地http测试时，发现不能复制https的图片。
* 而有些http的图片也复制不成功。
  - 我以为是跨域的问题，发现一些允许跨域的图片也存在复制不成功的场景。测试。待续...
  - 七牛的http图片可以被复制成功。
  - 本地nginx服务里的http图片也可以被复制成功。
