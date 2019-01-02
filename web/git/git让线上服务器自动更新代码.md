# 方案1：定时脚本
使用sh写一份定时git pull的脚本。

# 方案2：git钩子 - git hooks
* 原理：git通过钩子触发对应事件，执行对应脚本。
* 编写脚本：```vim ./.git/hooks/post-receive```。
```
#!/bin/bash

# 如果不是远程仓库就退出
IS_BARE=$(git rev-parse --is-bare-repository)
if [ -z "$IS_BARE" ];then
    echo >&2 "fatal: post-receive: IS_NOT_BARE"
    exit 1
fi

# 如果是master分支才触发
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

# 建议
* 如果只是一台服务器的部署。建议手动更新。因为可能还涉及到npm包的更新。以上写法无法满足。```git pull -p```之后可能还需要追加：
```
npm i --production 或者 cnpm i --production
pm2 restart all
```
* 如果是多台服务器的更新。还是走自动化吧。否则会累死的。
* 市面上应该有自动化管理的工具。可以尝试一下。例如：https://github.com/jenkinsci/jenkins
