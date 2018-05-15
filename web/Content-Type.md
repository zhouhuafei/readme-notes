* Content-Type，从名字上可以理解为内容类型，但在互联网上专业术语叫“媒体类型”，即MediaType，也叫MIME类型，主要是用来指明报文主体部分内容属于何种类型，比如html，json或者xml等等。
* 但是content-type一般只存在于Post方法中，因为Get方法是不含“body”的，它的请求参数都会被编码到url后面，所以在Get方法中加Content-type是无用的。
* 常见的类型包括以下几种
    - text/html HTML格式
    - text/plain 纯文本格式
    - text/xml XML格式
    - image/gif gif图片格式
    - image/jpeg jpg图片格式
    - image/png png图片格式
    - application/xhtml+xml XHTML格式
    - application/xml XML数据格式
    - application/atom+xml Atom XML聚合格式
    - application/json JSON数据格式
    - application/pdf pdf格式
    - application/msword Word文档格式
    - application/octet-stream 二进制流数据（如常见的文件下载）
    - application/x-www-form-urlencoded 表单提交中默认的encType
    - multipart/form-data 在表单中文件上传时，就需要使用该格式
