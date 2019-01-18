# 兼容性
* 兼容性IE10以上和其他浏览器都支持，还是相对不错的，要是移动端都支持。

# btoa
base64编码，中文编码需要用encodeURIComponent方法编码一下。

# atob
base64解码。

# 建议
* base64编码(btoa)前，先用十六进制转义字符编码(encodeURIComponent)。
* base64解码(atob)后，再用十六进制转义字符解码(decodeURIComponent)。

