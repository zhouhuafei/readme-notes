# 文档
https://github.com/NervJS/taro

# 安装
```
sudo npm install -g @tarojs/cli
```
* 报错：```NPM Unexpected end of JSON input while parsing near```
    - 解决方案：```nrm use taobao```

# Redux和TypeScript
* 因增加了开发负担，没有安装使用。

# 富文本和字体
* 拿百度小程序和微信小程序来说，还是会存在富文本和字体的坑的。
    - 微信小程序和百度小程序使用wxParse时，template解析时入参和接收参数的解析语法不一致。微信小程序是```{{}}```。百度小程序是```{{ {} }}```
    - 微信小程序可以使用在线阿里字体图标。百度小程序不可以。
    - 百度小程序可以使用本地阿里字体图标。微信小程序不可以。
    - 以上都需要特殊处理。

# 最大的弊端
* 在百度小程序不支持第三方的情况下，无法import到dist中的ext.js。这和我的需求冲突。弃之。这个弊端是其他小程序框架也存在的问题。我还是使用自己配置的gulp进行兼容小程序的开发吧。
  - 除非各个小程序平台都支持第三方平台。否则真心无解。

# options
* 微信小程序：onLoad(options)
* taro：this.$router.params

# getUserInfo一直失败，一直失败，一直失败。202。
* 业务变成时更换了小程序的app_id，修改完之后没给我的小程序账号授权。

# 百度小程序只能使用本地字体图标
* 微信只能使用远程字体图标？怎么兼容两种？
    - 如果使用gulp可以使用某些包做到对文件内部进行内容替换。
    - 但是taro只能进行文件替换。经过测试。发现文件替换对src里的scss无效。那么只剩下一种解决方案了。
    - 把字体打成base64引入。

# 坑点
* setState是异步的。
    - onInput卡顿。出现了覆盖现象。
    - 出现这个问题的原因是：我把一个好几兆的全国地址数据列表放到了state上。
* ''会解析成true。(等taro官方修复)。
```
onClick={this.viewOrder.bind(this, 'DONE', '')}
```
* 使用&&时，false会被渲染出来。(等taro官方修复)。
```
// 这个会渲染出isShow
{1 === 2 && (<View>isShow</View>)}
{3 === 3 && (<View>isShow</View>)}
// 这个会渲染成false
```
