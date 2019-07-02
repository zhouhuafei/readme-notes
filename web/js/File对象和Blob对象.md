# Blob对象
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

# File对象
* https://developer.mozilla.org/zh-CN/docs/Web/API/File
* https://developer.mozilla.org/zh-CN/docs/Web/API/File/File
* File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。
* 示例
```javascript
const file = new File(['foo'], 'foo.txt', {
  type: 'text/plain'
})
// 配合FormData可以直接做文件上传。没测。理论上我觉的可以。
```

# File对象转成Blob对象
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

# Blob对象转成File对象
```
let file = new window.File([blob], file.name, {type: file.type})
```

# 案例
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
