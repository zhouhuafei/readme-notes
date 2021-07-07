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
      - `caodong-admin-songxia`项目，我`.gitlab-ci.yml`脚本配合`gh-pages`触发`deploy`时，会报上述错误。
      - `gitlab-runner`运行在，`CentOS`系统，`7.7`版本。
      - gh-pages配成`ssh`仓库地址时gitlab的ci/cd虽然会成功，但是成功的Job步骤里会抛错误日志。
      - gh-pages配成`http`仓库地址时Job步骤会一直处于pending状态，最后导致对应的Job步骤因超时而失败。
        - 超时默认值为`60`分钟。
        - 可以通过`Settings > CI/CD > General pipelines settings`进行修改。
      - gh-pages配成`https`仓库地址时出现了gh-pages报错案例3。
    - 问题本质：是`gitlab-runner`的`--user`权限问题，和`ssh`以及`https`无关。
    - 解决方案：请参考`gh-pages报错案例3`。
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
    - 问题的本质：使用rpm包安装`gitlab-runner`时，`gitlab-runner`的`--user`权限太低，`--user`的默认值为`gitlab-runner`。
      - `ci`脚本执行`git pull -p`时遇到`error: cannot open .git/FETCH_HEAD: Permission denied`也是这个原因所致。
      - 如果使用二进制安装可能会更快的发现问题吧，因为二进制安装时涉及到`gitlab-runner`用户的创建。
      - 如果不创建`gitlab-runner`用户，直接使用`root`用户，这个问题可能我就不会遇到了。
      - `gitlab-runner`在`Linux`系统的官方安装文档：https://docs.gitlab.com/runner/install/linux-manually.html
    - 解决方案：直接设置`gitlab-runner`为`root`权限就可以解决。`--user`的值设置为`root`。
    ```
    ps aux|grep gitlab-runner  # 查看当前runner用户
    sudo gitlab-runner stop  # 停止gitlab-runner
    sudo gitlab-runner uninstall  # 卸载gitlab-runner
    gitlab-runner install --working-directory /home/gitlab-runner --user root   # 安装并设置--user(例如我想设置为root)
    sudo systemctl start gitlab-runner  # 启动gitlab-runner
    ps aux|grep gitlab-runner # 再次执行会发现--user的用户名已经更换成root了
    sudo systemctl enable gitlab-runner # 设置开机自启动
    ```
    - 如何用js脚本使GitLab的runner流程failed，以达到中断流程的目的？
      - 只有同步代码中的`throw new Error('抛错')`可以做到。
      - 因为`Promise.reject(new Error('抛错'))`做不到，所以`async/await`做不到。
      - 所以`async/await`配合`try/catch`配合`throw new Error('抛错')`也做不到。
      - 不管是在`new Promise`中直接写`throw new Error('抛错')`。
      - 还是在`被async关键字修饰的函数`中直接写`throw new Error('抛错')`。
      - 只要涉及到`Promise`，就中断不了流程，只是会打印`UnhandledPromiseRejectionWarning`日志罢了。

# 建议
* 如果只是一台服务器的部署。建议手动更新。因为可能还涉及到npm包的更新。以上写法无法满足。```git pull -p```之后可能还需要追加：
```
npm i --production 或者 cnpm i --production
pm2 restart all
```
* 如果是多台服务器的更新。还是走自动化吧。否则会累死的。
* 市面上应该有自动化管理的工具。可以尝试一下。例如：https://github.com/jenkinsci/jenkins
