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
#### 方案二：使用 patch-package
* 弊端：需要安装`patch-package`，需要手动打补丁，维护成本高。
#### 方案三：使用 overrides
* 推荐：对项目本身的侵入最小。
