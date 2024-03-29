## ArrayBuffer
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
* ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。
* ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## DataView
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView
* DataView 视图是一个可以从 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。

## Blob对象
* https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
* Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    - 从Blob中读取内容的唯一方法是使用 FileReader。
    ```
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
       // reader.result 包含转化为类型数组的blob
    });
    reader.readAsArrayBuffer(blob);
    ```

## File对象
* https://developer.mozilla.org/zh-CN/docs/Web/API/File
* https://developer.mozilla.org/zh-CN/docs/Web/API/File/File
* File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。
* 示例
```javascript
const file = new File(['foo'], 'foo.txt', {
  type: 'text/plain'
})
// 配合FormData可以直接做文件上传。没测。理论上我觉的可以。
// 经测试，上述file实例，可被FileReader读取。
```

## File对象转成Blob对象
```
// 步骤1：先转成base64
var reader = new FileReader();
reader.onload = function(e){
    // target.result 该属性表示目标对象的DataURL
    let base64 = e.target.result;
    console.log('base64', base64);

    // 步骤2：将base64解码并转换为Blob对象
    let arr = base64.split(',');
    let data = window.atob(arr[1]);
    let mime = arr[0].match(/:(.*?);/)[1];
    let ia = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    let blob = new Blob([ia], {type: mime});
    console.log('blob', blob);
}
// 传入一个参数对象即可得到基于该参数对象的文本内容
reader.rederAsDataURL(file);
// reader.readAsText(file, 'utf-8'); // 此方法可以将 Blob 或者 File 对象根据特殊的编码格式转化为内容(字符串形式)。第二参数不传，则默认为 utf-8 编码。
```
* btoa和atob
    - btoa base64编码
    - atob base64解码
* FileReader介绍
    - https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    - FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
* Uint8Array介绍
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
    - Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

## Blob对象转成File对象
```
let file = new window.File([blob], file.name, {type: file.type})
```

## base64和ArrayBuffer互转
```javascript
// base64 转 ArrayBuffer
function base64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// ArrayBuffer 转 base64
function arrayBufferToBase64 (buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
```

## 案例
```javascript
import axios from 'axios';

axios({
    url: `${window.VUE_APP_API_URL + window.VUE_APP_BASE_API}miniapp/qrcode?token=${Cookie.get('Admin-Token')}&width=750&scene=${encodeURIComponent(`storeCode=${storeCode}`)}`,
    responseType: 'arraybuffer', // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'。默认是'json'。
}).then((res) => {
    console.log(Object.prototype.toString.call(res.data)); // data会被处理成[object ArrayBuffer]类型的数据，因为入参时axios的responseType设置为了arraybuffer。
    downloadImg(res.data, name + '二维码');
});

// 下载 excel 文件
function downloadExcel(data, filename) {
    const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', filename);
    a.click();
    URL.revokeObjectURL(objectUrl);
}

// 下载 img 文件
function downloadImg(data, filename) {
    const blob = new Blob([data], {type: 'image/png'});
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', filename);
    a.click();
    URL.revokeObjectURL(objectUrl);
}
```

## ArrayBuffer转字符串
```
function utf8ByteToUnicodeStr(utf8Bytes) {
  var unicodeStr = ''
  for (let pos = 0; pos < utf8Bytes.length;) {
    const flag = utf8Bytes[pos]
    let unicode = 0
    if ((flag >>> 7) === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1
    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 5] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 6
    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 4] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 5
    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 3] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 4
    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12

      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 2] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 3
    } else if ((flag & 0xC0) === 0xC0) { // 110
      unicode = (utf8Bytes[pos] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 1] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 2
    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1
    }
  }
  return unicodeStr
}
// 后端响应的数据是ArrayBuffer类型
if (Object.prototype.toString.call(response.data) === '[object ArrayBuffer]') {
  try {
    const parsedRes = JSON.parse(utf8ByteToUnicodeStr(new Uint8Array(response.data)))
    Message({
      message: decodeURIComponent(parsedRes.message),
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(parsedRes)
  } catch (e) {
    return response.data
  }
}
```

## 微信公众号的图片长按保存无效？
* 问题原因：
  - 图片设置了`Referer`防盗链，防盗链策略很严格，即使请求头里没有`Referer`也不让访问。
  - 长按保存图片是浏览器行为，可以想象成把图片链接直接贴到浏览器的地址栏进行保存，此时请求头中是没有`Referer`的，于是导致保存时报错`403`。
  - `nginx`默认的防盗链策略没那么严格，请求头里没有`Referer`是允许访问的，只有带了`Referer`且`Referer`不符合预期时才会报`403`。
* 解决问题：
  - 方案1（复杂方案）：`base64`没有域的概念，可以在客户端把图片都转成`base64`进行渲染。
    - 补充：转`base64`是客户端的`js`触发，不管是发送`xhr`还是发送别的`get`请求，此时`Referer`都是当前网址，是不会触发防盗链的，所以不会报`403`。
    - 弊端：需要使用`js`拿到所有图片，全都转成`base64渲染`，会导致页面臃肿，页面臃肿时，如果页面上有输入框，会导致输入框卡顿。
    - 其他：使用`blob:url`载入图片虽然页面不会臃肿，但是长按保存图片是无效的，并不能解决当前问题，`blob:url`适用于普通浏览器的海报渲染和下载。
  - 方案2（最佳方案）：修改防盗链策略为默认策略。此乃最佳方案，因为就算是严格策略，防盗链依然是很好破解的。
  - 方案3（无效方案）：放弃长按保存，增加保存按钮，使用微信JS-SDK进行保存。此方案无效。
    - 微信屏蔽了浏览器的下载行为，使用`js`配合`a`标签`download`下载或者响应头的`application/octet-stream`下载是行不通的。
    - `sdk`的下载只能下载使用`sdk`上传的图片，所以此方案行不通。
* 问题延伸：如何禁止微信公众号中的图片长按保存？
  - 方案1：给图片加css样式`pointer-events: none;`。
  - 方案2：给图片加一层`div`遮罩。

## 图片路径转换为base64
* 方案1：使用`canvas.toDataUrl`。
* 方案2：使用`blob`。
  - `xhr`下载数据流，然后把数据流转成`blob`，上述有`downloadImg`案例。
  - 使用`URL.createObjectURL`可以将`blob`转成`blob:url`，上述有案例。`blob:url`可以直接放在`img`的`src`中使用。
  - 使用`FileReader`可以将`blob`转成`base64`。

## canvas可以直接转成Blob对象
```javascript
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob)
})
```
