# git - 虽然经常使用，但还是随手记录一下吧
* 新建分支
```
git checkout -b branchName
```
* 推到远程仓库
```
git push
```
* 删除远程分支
```
git push origin :branchName
或
git push origin --delete branchName
```
* 更新远程分支， -p表示如果远程被删除了，本地的也会被删除
```
git pull -p
```
* 新建本地分支并关联远程分支
```
git checkout -b branchName origin/branchName
```
* 删除本地分支
```
git branch -D branchName
```
* 回滚
```
git  reset --hard commitId
```
* 常用
```
git add .
git commit -m log
git pull
git push
```
* 将本地的一个普通目录与远程仓库进行关联
```
git init
git remote -v
git remote add origin https://github.com/zhouhuafei/test.git
git push --set-upstream origin master
git remote -v
```
* 取消本地目录下关联的远程库：
```
git remote remove origin
```
* 每次提交输入密码太麻烦，以下是解决方案
```
git config --global credential.helper store
```
* git打tag(标签)(方便追溯指定版本存在的问题以及回溯到某个指定版本)
    - https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
    ```
    git tag v1.0.0 // 打tag
    git tag // 查看本地tag
    git tag -d test_tag // 本地删除tag
    git push origin v1.0.0 // 推送本地新增的tag
    git push origin --tags // 推送本地新增的所有tag
    git show-ref --tags // 查看远程tag
    ```

* git commit 添加表情
    - ![图片加载中...](./images/1.png)
    ```
    git commit "message :trollface:"
    ```

# add之后，取消add
```
git reset HEAD xxx.txt
```

# add之后，取消add并取消对文件的修改
```
git checkout -- xxx.txt
```

# commit之后，修改/改写commit(用当前的commit信息替换掉上一个commit信息)。
* --amend 之后，会有一个vim编辑器让你修改之前的commit信息。
```
git commit -am xxx
git add .
git commit --amend
```

# commit之后，取消commit。
* ```git reset --soft|--mixed|--hard <commit_id>```
    - --mixed 会保留源码，只是将git commit和index 信息回退到了某个版本。(会回退到add之前)
    - --soft 保留源码，只回退到commit信息到某个版本。不涉及index的回退，如果还需要提交，直接commit即可。(会回退到add之后)
    - --hard 源码也会回退到某个版本，commit和index 都会回退到某个版本。(注意，这种方式是改变本地代码仓库源码)
* 回退之后，可能会提示需要pull，其实你并不需要pull了，你可以强制提交。```git push --force``` 强制提交。

# git revert
* commit push 代码已经更新到远程仓库
* 对于已经把代码push到线上仓库，你回退本地代码其实也想同时回退线上代码，回滚到某个指定的版本，线上，线下代码保持一致.你要用到下面的命令。
```
git revert <commit_id>
```
* revert 之后你的本地代码会回滚到指定的历史版本，这时你再 git push 既可以把线上的代码更新。
* 注意：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit，看似达到的效果是一样的，其实完全不同。

# github fork 出的仓库怎样与原仓库保持一致
github 开发程中， 我们常需要fork出一个仓库进行开发， 但是原来的仓库更新之后，fork出的仓库需要进行一波同步。
1. ```git remote -v``` // 查看远程库地址。
2. ```git remote add upstream XXXXXXXXXXXXXXX.git``` // upstream 设置原仓库的名字，后面是原仓库的地址。
3. ```git fetch upstream``` // 抓取原仓库的修改文件。
4. ```git checkout XXX``` // 切换到需要合并的本地仓库的本地分支。
5. ```git merge upstream/dev``` // 将原仓库的Dev 分支与本地仓库的当前分支合并。
6. ```git push origin XXX_branch``` // 将当前仓库的本地分支推送到远程分支。

# Pull Request
"Pull Request 是一种通知机制。你修改了他人的代码，将你的修改通知原来的作者，希望他合并你的修改，这就是 Pull Request。"
* 第一步，你需要把别人的代码，克隆到你自己的仓库，Github 的术语叫做 fork。
* 第二步，在你仓库的修改后的分支上，按下"New pull request"按钮。
* 第三步，填写说明，帮助别人理解你的提交，然后按下"create pull request"按钮即可。

# 更新remote的url
```
git remote set-url origin https://git.ishopex.cn/thomas/baihui-baidu-fenxiao.git
```
