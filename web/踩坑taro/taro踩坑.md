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
