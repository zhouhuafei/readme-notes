## 文档
* https://git-scm.com/book/zh/v2

## Git查看与修改用户名、邮箱
* 查看
```
git config user.name
git config user.email
```
* 修改
```
git config --global user.name "xxx"
git config --global user.email "xxx"
```

## 新建分支
```
git checkout -b branchName
```

## 推到远程仓库
```
git push
```

## 删除远程分支
```
git push origin :branchName
或
git push origin --delete branchName
```

## 拉取远程分支的改动到本地分支
```
git pull -p
```
* `-p的作用`：如果你的同事在远程版本库上删除了某一分支或新增了某一个分支。本地的远程追踪分支并不会改变，使用-p可以解决这一问题。

## 新建本地分支并关联远程分支
```
git checkout -b branchName origin/branchName
```

## 删除本地分支
```
git branch -D branchName
```

## 回滚
```
git reset --hard commitId
```

## 常用
```
git add .
git commit -m log
git pull
git push
```

## 合并
* 以下
```
git add .
git commit -m xxx
```
* 可合并为
```
git commit -am xxx
```
* 注：修改文件可使用合并命令，新增文件仍需依次使用命令。

## 将本地的一个普通目录与远程仓库进行关联
```
git init
git remote -v
git remote add origin https://github.com/zhouhuafei/test.git
git push --set-upstream origin master
git remote -v
```

## 取消本地目录下关联的远程库：
```
git remote remove origin
```

## 更新remote的url
```
git remote set-url origin https://git.ishopex.cn/thomas/baihui-baidu-fenxiao.git
```

## 每次提交输入密码太麻烦，以下是解决方案
```
git config --global credential.helper store
```

## git打tag(标签)(方便追溯指定版本存在的问题以及回溯到某个指定版本)
* https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
```
git ls-remote // 列出所有的远程分支和远程tag
git tag // 查看本地tag
git tag v1.0.0 // 创建本地tag
git tag v1.0.0 -m "标签的注释" // 创建本地tag并增加注释
git tag -d test_tag // 删除本地tag
git push origin v1.0.0 // 推送本地新增的tag
git push origin --tags // 推送本地新增的所有tag
git push origin :refs/tags/v1.0.0 // 删除远程tag
```
* 案例
```
git tag v1.0.0-alpha.0 -m "标签的注释 - 内测版1"
git tag v1.0.0-alpha.1 -m "标签的注释 - 内测版2"
git tag v1.0.0-beta.0 -m "标签的注释 - 公测版1"
git tag v1.0.0-beta.1 -m "标签的注释 - 公测版2"
git tag v1.0.0 -m "标签的注释 - 发行版"
```

## git commit 添加表情
* ![图片加载中...](./images/1.png)
```
git commit "message :trollface:"
```

## add之后，取消add
```
git reset HEAD xxx.txt
```

## 取消对文件的修改
```
git checkout -- xxx.txt
```

## 批量删除branch中新加的文件
> ######    `-n`：    --dry-run         dry run
> ######    `-f`：    --force           force
> ######    `-d`：                      remove whole directories
* `-n`：查看会删掉哪些
* `-f`：强制删除
* `-d`：删目录
```
git clean -nfd
git clean -fd
```

## commit之后，修改/改写commit(用当前的commit信息替换掉上一个commit信息)。
* --amend 之后，会有一个vim编辑器让你修改之前的commit信息。
```
git commit --amend
```
* 使用这项技术的时候你必须小心，因为修正会改变提交的SHA-1值。这个很像是一次非常小的rebase——不要在你最近一次提交被推送(`push`)后还去修正它。
* 修改已经提交(`push`)过的commit(不建议)
    - https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2

## commit之后，取消commit。
* ```git reset --soft|--mixed|--hard <commit_id>```
    - --mixed 会保留源码，只是将git commit和index 信息回退到了某个版本。(会回退到add之前)
    - --soft 保留源码，只回退到commit信息到某个版本。不涉及index的回退，如果还需要提交，直接commit即可。(会回退到add之后)
    - --hard 源码也会回退到某个版本，commit和index 都会回退到某个版本。(注意，这种方式是改变本地代码仓库源码)
* 回退之后，可能会提示需要pull，其实你并不需要pull了，你可以强制提交。```git push --force``` 强制提交。

## github fork 出的仓库怎样与原仓库保持一致
github 开发程中， 我们常需要fork出一个仓库进行开发， 但是原来的仓库更新之后，fork出的仓库需要进行一波同步。
> 使用步骤
1. `git remote -v` // 查看远程库地址。
2. `git remote add upstream XXXXXXXXXXXXXXX.git` // upstream 设置原仓库的名字，后面是原仓库的地址。
3. `git fetch upstream` // 抓取原仓库的修改文件。
4. `git checkout XXX` // 切换到需要合并的本地仓库的本地分支。
5. `git merge upstream/dev` // 将原仓库的Dev 分支与本地仓库的当前分支合并。
6. `git push origin XXX_branch` // 将当前仓库的本地分支推送到远程分支。
> 关键命令
```
git remote add upstream XXXXXXXXXXXXXXX.git
git fetch upstream
```

## Pull Request
"Pull Request 是一种通知机制。你修改了他人的代码，将你的修改通知原来的作者，希望他合并你的修改，这就是 Pull Request。"
* 第一步，你需要把别人的代码，克隆到你自己的仓库，Github 的术语叫做 fork。
* 第二步，在你仓库的修改后的分支上，按下"New pull request"按钮。
* 第三步，填写说明，帮助别人理解你的提交，然后按下"create pull request"按钮即可。

## gir revert commitId
* 把某次commit的内容清理掉。然后再直接push即可。
* 不放心可以`git diff -p`一下看看改变了啥。

## git merge后，如何回退？
* 今天将feature分支的代码merge到develop分支后我后悔了，因为feature分支的功能还没有全部开发完成，我在feature分支上commit是可以的，但是这之后我又把它merge到了develop分支这就不合适了。
* 第一步：git checkout到你要恢复的那个分支上
```
git checkout develop
```
* 第二步：git reflog查出要回退到merge前的版本号
```
git reflog
```
* 第三步：`git reset --hard [版本号]`就回退到merge前的代码状态了
```
git reset --hard f82cfd2
```

## 忽略目录`upload`但是不忽略目录`upload/.gitkeep`文件
> 在`.gitignore`增加一下内容即可。注：如果排除了该文件的父级目录，则使用`!`也不会再次被包含。
* 错误写法：`upload`会生效，`upload`整个目录会被过滤。`!upload/.gitkeep`不会生效，`.gitkeep`不会被提交。
```
upload
!upload/.gitkeep
```
* 正确写法：都会生效。`upload`整个目录会被过滤。`.gitkeep`也会被提交。
```
upload/*
!upload/.gitkeep
```

## git cherry-pick
> git cherry-pick可以理解为”挑拣”提交，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。
> 当我们需要在本地合入其他分支的提交时，如果我们不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用git cherry-pick了。
* 用法：`git cherry-pick <commit id>`。

## 把某分支的文件拷贝到当前分支
* 案例：`git checkout feat-after-sale src/views/fullreduce/components/list.vue`。
* 解释：把`feat-after-sale`分支的`src/views/fullreduce/components/list.vue`文件拷贝到当前分支。

## github仓库归档
> 本仓库已迁移至https://github.com/zhouhuafei/hello-world_cookie 是怎么设置的？
* 1、进入指定仓库。
* 2、修改仓库的描述文案，使之变为：本仓库已迁移至 https://github.com/zhouhuafei/hello-world_cookie
* 3、点击`Settings`进行设置。
* 4、选择`Archive this repository`进行仓库归档，使之变为只读仓库。

## git stash
> 在B分支修改东西，突然要切到A分支改东西，但是又不想`git commit`，此时可以使用`git stash`。
* 使用`git stash`命令，把当前B分支的工作状态存储到`stash`。
* 切到A分支把东西改完再切回B分支，再使用`git stash pop`命令恢复之前的工作状态。
```
$ git stash --> 保存当前还未提交的工作状态，恢复到最近一次提交的状态。
$ git stash list --> 查看当前stash保存的状态列表。
$ git stash apply --> 恢复上次stash保存的状态。
$ git stash pop --> 恢复上次stash保存的状态并删除该次stash状态。
$ git stash drop --> 删除上次保存的状态。
```

### 重命名本地分支
* 重命名本地分支：`git branch -m old-name new-name`。
* 如果要重命名当前所在的分支，可以简单用：`git branch -m new-name`。

### 重命名远程分支
* 先把远程分支删了：`git push origin :old-name`。
* 再把本地分支推上去：`git push --set-upstream origin new-name`。

## 删除不包含master关键字之外的所有本地分支
```
git checkout master
git branch | grep -v 'master' | xargs git branch -D
```

## 如果远程已有develop分支，本地没有develop分支
* 使用`git checkout develop`可以直接创建并关联远程分支。

## 查看远程仓库以及本地仓库的信息
* `git remote show origin`。

## ssh
* `ls -al ~/.ssh`
* `ssh-keygen -t rsa -C "zhouhuafei@wowkai.cn"`
* `cat ~/.ssh/id_rsa.pub`

## 合并多个commit
* https://www.jianshu.com/p/964de879904a
* https://www.cnblogs.com/wt645631686/p/13550192.html
* `git rebase -i commitId`
  - `-i`的参数是不需要合并的`commit`的`hash`值。
* 过程中有操作错误，可以使用`git rebase --abort`来撤销修改。

## merge时把develop上的多个commit合成一个commit
* 主要命令：`git merge --squash develop`。
```
git merge --squash develop
git commit -m "feat: merge develop"
git push
```
* 应用场景：deploy发布。

## 提交一个空的commit
`git commit -m "1.1.11" --allow-empty --no-verify`

## 广举的文档 - 独立发版项目创建流程及规则
* 创建新的仓库
```
// 标准版指定分支为独立项目（如果作用 master 分支作为独立部署版的起始版本，则不用指定-b）
git clone -b <branchName> ssh://git@git.wowkai.cn:10080/web/xcx-caodong-user.git xcx-caodong-xxx
cd xcx-caodong-xxx
```
* 关联上游仓库
```
// 将标准版remote从orgin更名为upstream，用于后续同步代码
git remote rename origin upstream
// 设置origin为独立部署版仓库git路径
git remote add origin ssh://git@git.wowkai.cn:10080/xxx/xcx-caodong-xxx.git

// 清理分支
// 如果需合并的分支不是master，需将需合并的分支变为master
git branch -d master
git branch -m <currentBranch> master

// 删除本地除master以外所有分支/标签（保持独立仓库分支干净。若要保留其他分支，不可执行）
git branch | grep -v "master" | xargs git branch -D
// 查看分支详情信息（包括远程分支与本地分支建立的联系）
git branch -vv

// 撤销本地分支与远程分支的映射关系
git branch --unset-upstream

// 将本地分支推到远程
git push -u origin --all
// 将本地标签推到远程（可选项）
git push -u origin --tags
```
* 访问上游仓库
```
// 访问远程仓库，从中拉取还没有的数据
// 注意 此命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作
git fetch upstream

// 将来自 upstream/xxx 的更改合并到本地 xxx 分支中，这会使复刻的 xxx 分支与上游仓库同步，且不会丢失本地更改
git merge upstream/xxx
```

## git rm
* `git rm --cached package-lock.json`：从暂存区删除，但是不从本地删除。适用于提交到了git但是又想忽略的场景，此命令配合.gitignore文件即可实现忽略。
* `git rm -f package-lock.json`：从暂存区删除并从本地删除。

## git查看当前分支合并过哪些分支
`git branch --merged`
