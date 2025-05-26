# next踩坑dify.md

## 真机调试困难
* 页面出错的时候，会被系统级别的错误页面拦截，导致看不到错误信息。
  - 移动端调试工具`eruda`在next中使用时，无法捕获到错误信息。
* 需要自定义错误页面，输出错误信息。

## 在Mac电脑上，用Safari浏览器调试IOS手机移动端页面。可以看到错误信息。
* 打开iPhone手机的开发者模式，流程是：设置 -> Safari -> 高级 -> 网页检查器（开启）
* 打开Mac上Safari的开发者模式，流程是：Safari -> 设置 -> 高级 -> 在菜单栏中显示“开发”菜单（勾选）
* 用数据线将iPhone手机和Mac连接起来，在电脑的Safari中按照流程执行：开发 -> 手机名称 -> 正在调试的网站

## 深层依赖出了bug如何解决
* dify项目依赖`remark-gfm`包。
* `remark-gfm`包内部依赖`mdast-util-gfm`包。
* `mdast-util-gfm`包内部依赖`mdast-util-gfm-autolink-literal`包。
* `mdast-util-gfm-autolink-literal`包有bug。
#### 方案一：把所有的包都fork一遍，改名字，修改内部依赖，发布到npm
* 弊端：改动太大，改动涉及到的包太多，维护成本高。如果依赖的深度再深一点，那修复起来就更麻烦了。
#### 方案二：使用本地依赖
* 把`mdast-util-gfm-autolink-literal`包复制一份到本地项目中，并提交到git仓库。
* 把`mdast-util-gfm-autolink-literal`包加入到`package.json`的`dependencies`中。
  - 把`mdast-util-gfm-autolink-literal`包指向本地的路径。
  - `"mdast-util-gfm-autolink-literal": "file:./mdast-util-gfm-autolink-literal",`。
* 把`mdast-util-gfm-autolink-literal`包的bug修复，然后重新安装依赖，重新打包。
#### ios15 渲染出错
* 把依赖的第三方包`"remark-gfm": "^4.0.0",`改为`"zhf.remark-gfm": "^4.0.3",`。
  - 没使用本地依赖进行修复，是因为使用本地依赖进行打包时，pnpm报错导致打包失败（npm不报错且能正常打包）。
  - 后端架构师使用的pnpm进行包管理，打包时出错了，就还原回了方案一。我个人习惯使用npm进行包管理。
#### ios14和ios13 渲染出错
* 没继续排查，产品说兼容到ios15就行了。低于ios15的提示用户升级系统。
