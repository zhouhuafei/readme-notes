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

# gh-pages报错
* gh-pages报错案例1
    - 报错如下：
    ```
    ------ deploy callback res begin ------
    ProcessError: To ssh://git.wowkai.cn:10080/panasonic/sxweb.git
     ! [rejected]        master -> master (fetch first)
    error: failed to push some refs to 'ssh://git@git.wowkai.cn:10080/panasonic/sxweb.git'
    hint: Updates were rejected because the remote contains work that you do
    hint: not have locally. This is usually caused by another repository pushing
    hint: to the same ref. You may want to first integrate the remote changes
    hint: (e.g., 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.

        at ChildProcess.<anonymous> (E:\www\gitlab-juzhi\caodong-admin-songxia\node_modules\gh-pages\lib\git.js:42:16)
        at ChildProcess.emit (events.js:315:20)
        at maybeClose (internal/child_process.js:1021:16)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:286:5) {
      code: 1
    }
    ------ deploy callback res end ------
    ```
    - 解决方案：`rm -rf node_modules/.cache/gh-pages/`
* gh-pages报错案例2
    - 报错如下：
    ```
    ------ deploy callback res begin ------
    ProcessError: Cloning into 'F:\GitLab-Runner\builds\yyK2jR7J\0\web\caodong-admin\node_modules\.cache\gh-pages\ssh!git.wowkai.cn!10080!panasonic!sxweb.git'...
    Host key verification failed.
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.

        at ChildProcess.<anonymous> (F:\GitLab-Runner\builds\yyK2jR7J\0\web\caodong-admin\node_modules\gh-pages\lib\git.js:42:16)
        at ChildProcess.emit (events.js:315:20)
        at maybeClose (internal/child_process.js:1021:16)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:286:5) {
      code: 128
    }
    ------ deploy callback res end ------
    ```
    - 场景细节：
      - Win10系统，caodong-admin-songxia项目，我gitlab配合gh-pages触发deploy时，会报上述错误。
      - deploy配成ssh时gitlab的ci会成功，但是成功的Job步骤里会抛错误日志。
      - deploy配成http时Job步骤会一直处于pending状态，最后导致对应的Job步骤因超时而失败。
        - 超时默认值为`60`分钟。
        - 可以通过`Settings > CI/CD > General pipelines settings`进行修改。
    - 解决方案Win10：没找到解决方案。
    - 解决方案Linux：待续....

# 建议
* 如果只是一台服务器的部署。建议手动更新。因为可能还涉及到npm包的更新。以上写法无法满足。```git pull -p```之后可能还需要追加：
```
npm i --production 或者 cnpm i --production
pm2 restart all
```
* 如果是多台服务器的更新。还是走自动化吧。否则会累死的。
* 市面上应该有自动化管理的工具。可以尝试一下。例如：https://github.com/jenkinsci/jenkins
