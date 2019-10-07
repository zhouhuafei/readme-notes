# 准备工作
* 看文档 https://github.com/dcloudio/uni-app
* 下载HBuilderX编辑器。
* 新建uni-app项目(直接默认模版创建即可)。
* 运行->运行到小程序模拟器->微信开发者工具。

# static目录
* 存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此，如果不放在这个目录，会导致静态资源引入失败。

# 条件编译
https://ask.dcloud.net.cn/article/35441
```
// #ifdef MP-WEIXIN
wx.onAppRoute((route) => {
  console.log('wx.onAppRoute', route)
})
// #endif
```
* ifdef(正向条件) ifndef(反向条件) endif(条件结束)
  - APP-PLUS
  - APP-PLUS-NVUE
  - H5
  - MP-WEIXIN
  - MP-ALIPAY
  - MP-BAIDU
  - MP

# 路由监听
https://github.com/SilurianYang/uni-simple-router
