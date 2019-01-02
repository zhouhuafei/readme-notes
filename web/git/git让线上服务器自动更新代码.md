# 方案1：定时脚本
使用sh写一份定时git pull的脚本。

# 方案2：git钩子 - git hooks
* 原理：git通过钩子触发对应事件，执行对应脚本。
* 编写脚本：```vim ./.git/hooks/post-receive```。
```
#!/bin/bash
while read oldrev newrev ref
do
    if [[ $ref =~ .*/master$ ]];
    then
        echo "Master ref received.  Deploying master branch to production..."
        cd /root/suibianxiexie/
        git pull -p
    else
        echo "Ref $ref successfully received.  Doing nothing: only the master branch may be deployed on this server."
    fi
done
```
* 给脚本可执行权限：```chmod +x ./.git/hooks/post-receive```。

# git hooks钩子的风险
* 不懂事的前端闲的蛋疼。把未开发完全的代码打到master线上了。进行了自动更新岂不让人无奈。
* 在develop分支上开发，然后通过打包。把代码打到其他分支上的工具如下：
    - https://github.com/tschaub/gh-pages
    - https://github.com/shinnn/gulp-gh-pages
