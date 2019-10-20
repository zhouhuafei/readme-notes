# 准备工作
* 看文档 https://github.com/dcloudio/uni-app
* 下载HBuilderX编辑器。
* 新建uni-app项目(直接默认模版创建即可)。
* 运行->运行到小程序模拟器->微信开发者工具。

# static目录
* 存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此，如果不放在这个目录，会导致静态资源引入失败。

# 条件编译
> ###### 官方文档：https://uniapp.dcloud.io/platform?id=%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91
> ###### 其他文档：https://ask.dcloud.net.cn/article/35441
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

# rpx单位默认是基于750px设计的
* 问题：如果设计图是375px的呢？
* 解决方案1(推荐)：scss封装一个名为`px2rpx`的`function`，函数内部乘以2即可。写css时，使用函数包装下量取的数值即可。
    - 定义：
    ```
    @function px2rpx($px) {
      @return $px * 2rpx;
    }
    ```
    - 引入：略
    - 使用：
    ```
    .div {
      width: px2rpx(100);
    }
    ```
* 解决方案2(不推荐)：px转成rpx。
    - 工具 > 设置 > 编辑器配置 > 启用px转rpx/upx提示 > px转rpx/upx的比例由1变为0.5即可 | px转rpx/upx小数部分保留长度由2变为6即可。
    - 不推荐原因：并不能直接把px转成rpx。而是写代码时，出现100px->200rpx的选项，让你选，我不喜欢这种方式。

# uni-app默认支持async和await么？
* `支持`。
* 非同步Api返回的是Promise。
