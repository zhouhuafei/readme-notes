# 方案1：定时脚本
使用sh写一份定时git pull的脚本。

# 方案2：git hooks
待续...

# 风险
* 不懂事的前端闲的蛋疼。把未开发完全的代码打到master线上了。进行了自动更新岂不让人无奈。
* 在develop分支上开发，然后通过打包。把代码打到其他分支上的工具如下：
    - https://github.com/tschaub/gh-pages
    - https://github.com/shinnn/gulp-gh-pages
