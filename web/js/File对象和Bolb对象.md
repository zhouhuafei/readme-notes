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
* File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

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
* FileReader介绍
    - https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
* Uint8Array介绍
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

# Blob对象转成File对象
```
let file = new window.File([blob], file.name, {type: file.type})
```
