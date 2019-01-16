# 文档
* http://mpvue.com/mpvue/

# 使用scss
```
// 安装好之后运行npm run dev直接就可以打包了
npm i --save-dev sass-loader node-sass
```

# 不支持小程序的动态template语法
* 以下内容是从```../踩坑百度小程序/百度小程序踩坑.md```中拷贝过来的。
* 微信小程序的框架中：wepy支持下面这种写法。mpvue不支持，mpvue是vue的组件化思想，要写成vue语法形式的组件。
    - 再次声明一下：百度小程序是三个大括号```data="{{ {arr:[4,5,6]} }}"```
    ```
    // test2.wxml
    <template name="test2">
        <view>{{arr[0]}}</view>
        <view bindtap="fnOuter">{{arr[1]}}</view>
        <view>{{arr[2]}}</view>
    </template>
    // home.wxml
    <import src="../../templates/wxParse/test2.wxml"/>
    <template is="test2" data="{{arr:[4,5,6]}}"></template>
    ```
