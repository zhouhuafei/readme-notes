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
      - `Win10`系统，`caodong-admin-songxia`项目，我`.gitlab-ci.yml`脚本配合`gh-pages`触发`deploy`时，会报上述错误。
      - gh-pages配成ssh时gitlab的ci/cd虽然会成功，但是成功的Job步骤里会抛错误日志。
      - gh-pages配成http时Job步骤会一直处于pending状态，最后导致对应的Job步骤因超时而失败。
        - 超时默认值为`60`分钟。
        - 可以通过`Settings > CI/CD > General pipelines settings`进行修改。
    - 问题原因：`gitlab-runner`是基于`https`进行`git clone`的，目前不支持基于`ssh`进行`git clone`。
      - 所以我把gh-pages配成了https，然后就出现了gh-pages报错案例3。
* gh-pages报错案例3
    - 报错如下：
    ```
    ------ deploy callback res begin ------
    ProcessError: Cloning into '/home/gitlab-runner/builds/him45RZ2/0/web/caodong-admin/node_modules/.cache/gh-pages/git.wowkai.cn!panasonic!sxweb.git'...
    fatal: could not read Username for 'https://git.wowkai.cn': No such device or address

        at ChildProcess.<anonymous> (/home/gitlab-runner/builds/him45RZ2/0/web/caodong-admin/node_modules/gh-pages/lib/git.js:42:16)
        at ChildProcess.emit (events.js:315:20)
        at maybeClose (internal/child_process.js:1048:16)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:288:5) {
      code: 128
    }
    ------ deploy callback res end ------
    ```
    - 问题的本质：gitlab-runner的--user权限太低，--user的默认值为gitlab-runner。
    - 解决方案：直接设置gitlab-runner为root权限就可以解决。--user的值设置为root。
    ```
    ps aux|grep gitlab-runner  # 查看当前runner用户
    sudo gitlab-runner stop  # 停止gitlab-runner
    sudo gitlab-runner uninstall  # 卸载gitlab-runner
    gitlab-runner install --working-directory /home/gitlab-runner --user root   # 安装并设置--user(例如我想设置为root)
    sudo systemctl start gitlab-runner  # 启动gitlab-runner
    ps aux|grep gitlab-runner # 再次执行会发现--user的用户名已经更换成root了
    sudo systemctl enable gitlab-runner # 设置开机自启动
    ```

# 建议
* 如果只是一台服务器的部署。建议手动更新。因为可能还涉及到npm包的更新。以上写法无法满足。```git pull -p```之后可能还需要追加：
```
npm i --production 或者 cnpm i --production
pm2 restart all
```
* 如果是多台服务器的更新。还是走自动化吧。否则会累死的。
* 市面上应该有自动化管理的工具。可以尝试一下。例如：https://github.com/jenkinsci/jenkins
