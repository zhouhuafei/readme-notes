> ###### 说明：Angular 规范是目前使用最广的写法，比较合理和系统化，并且有配套的工具。前前端框架Angular.js采用的就是该规范。
> ###### 文档：https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type
> ###### 工具：https://github.com/conventional-changelog/commitlint

# 规范
* chore：构建过程或辅助工具的变动
    - 单词意思：日常事务;例行工作;令人厌烦的任务;乏味无聊的工作。
    - 个人觉得：用于日常小修改最为合适，例如加个注释，换个标签之类的使用这个比较合适。
    - 构建过程或辅助工具的变动我觉的使用build更为合适。
* docs：文档(documentation)
* feat：新功能(feature)
* fix：修补bug
* perf：性能优化(performance)
* refactor：重构(即不是新增功能，也不是修改bug的代码变动)
* style：格式(不影响代码运行的变动)
* test：增加测试
* revert：撤销之前的commit
* polish：润色
    - 个人觉得：样式调整，交互优化使用这个比较合适。
* ci：自动化部署
* build：构建工具或构建过程或构建结果等的变动
    - 个人觉得：这个单词更适合用于构建过程或辅助工具的变动
* workflow：工作流程
* misc: 一些未归类或不知道将它归类到什么方面的提交

# 工具
> 主要工具是`commitlint`和`commitizen`。
* 使用`commitlint`校验`commit`是否符合规范。
    - https://github.com/conventional-changelog/commitlint
    - https://github.com/typicode/husky
    - https://commitlint.js.org/#/guides-local-setup
* 使用`git cz`取代`git commit`。
    - 案例：https://github.com/vuejs/vue 使用的是工具是 commitizen git-cz
    - commitizen：https://github.com/commitizen/cz-cli
    - git-cz：https://github.com/streamich/git-cz

# `git-cz`实操流程
* 1、安装：`npm install -g commitizen git-cz`。
* 2、配置：`package.json`文件中新增如下代码即可。
```
{
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
```

# `commitlint`实操流程
* 1、安装并生成配置文件。
```
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
* 2、在`package.json`文件中新增如下配置。
```
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```
* 3、把生成的`commitlint.config.js`文件中的双引号去掉。
  - 把
  ```
  "module.exports = {extends: ['@commitlint/config-conventional']}"
  ```
  - 变为
  ```
  module.exports = {extends: ['@commitlint/config-conventional']}
  ```
* 4、安装husky。
```
npm install --save-dev husky
```
