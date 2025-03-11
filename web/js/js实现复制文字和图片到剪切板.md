> js实现复制文字和图片到剪切板

## 复制文字和复制图片
#### 复制内容到剪切板 - 文字和图片均可复制
* navigator.clipboard.write
* https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/write
#### 复制内容到剪切板 - 仅可复制文字
* navigator.clipboard.writeText
* https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText
#### 读取剪贴板的内容 - 文字和图片均可读取
* navigator.clipboard.read
* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read
#### 读取剪贴板的内容 - 仅可读取文字
* navigator.clipboard.readText
* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText

## 复制文字 - 存在不兼容IOS的问题
```html
<button class="my-copy-txt-btn">复制文本</button>
<script>
document.querySelector('.my-copy-txt-btn').addEventListener('click', () => {
  const input = document.createElement('textarea') // input会丢失换行
  input.value = Math.random()
  document.body.appendChild(input) // 需要先在页面上渲染出来
  // input.focus() // 不加这个也可以复制，加了这个，点击复制时页面会跳动。
  input.select && input.select() // Android
  input.setSelectionRange && input.setSelectionRange(0, input.value.length) // IOS
  // input.blur() // 不加这个也可以复制
  document.execCommand('Copy')
  document.body.removeChild(input)
})
</script>
```
* 上述已不兼容IOS，可以使用复制图片的方式复制文本，可以参考这篇文章：https://blog.csdn.net/weixin_44786530/article/details/129782905
```html
<p><span id="text">我是需要复制的文本内容3</span></p>
<button type="button" id="test3" onclick="copy_3()">复制</button>

<script>
function copy_3 () {
  const selection = window.getSelection()
  const range = document.createRange()

  // 移除之前选中内容
  if (selection.rangeCount > 0) selection.removeAllRanges()
  // 选中新的内容
  range.selectNode(document.getElementById('text'))
  selection.addRange(range)
  // 复制
  document.execCommand('copy')

  console.log('复制成功！')
  selection.removeAllRanges()
}
</script>
```
* 上述已不兼容IOS，可以使用最新的API复制文本：`await navigator.clipboard.writeText(val)`。在本项目中，搜索`async setClipboardData`关键字查看。

## 复制图片 - 亦可用来复制文字且兼容IOS
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
* 我本地http测试时，发现不能复制https的图片。例如这张：`https://cdqn.zhimeiplus.com/100_1553073239871_19857911.png`。
* 而有些http的图片也复制不成功。例如这张：`http://sbxx.top/static-no-cache/test/zero/img.jpg`。
  - 七牛的http图片可以被复制成功。例如这张：`http://cdqn.zhimeiplus.com/100_1553073239871_19857911.png`。
  - 我以为是跨域的问题，发现一些响应头里没有`Access-Control-Allow-Origin: *`的http图片也可以被复制成功。例如这张：`http://img09.viwik.com/images/20170406/tooopen_sl_134512302044.jpg`。
  - 本地nginx服务里的http图片也可以被复制成功。例如这张：`http://127.0.0.1/github-zhouhuafei/suibianxiexie/static-no-cache-wrap/static-no-cache/test/zero/img.jpg`。
