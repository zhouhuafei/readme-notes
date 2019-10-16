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

# 校验 commit 是否符合规范
> https://github.com/vuejs/vue 使用的是工具是 commitizen git-cz
* 官网：https://npm.taobao.org/package/git-cz
* github：https://github.com/streamich/git-cz
* commitizen：https://github.com/commitizen/cz-cli
* 安装依赖
```
npm install -g commitizen
npm install --save-dev git-cz
```
* 在`package.json`配置
```
{
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
```

# 校验 commit 是否符合规范
* 亲测，无效。待续...
* https://github.com/ghooks-org/ghooks
* 在`package.json`配置`ghooks`
```
"config": {
  "ghooks": {
    "commit-msg": "validate-commit-msg"
  },
  "validate-commit-msg": {
    "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert", "polish", "workflow", "misc"],
    "scope": {
      "required": false,
      "allowed": ["*"],
      "validate": false,
      "multiple": false
    },
    "warnOnFail": false,
    "maxSubjectLength": 100,
    "subjectPattern": ".+",
    "subjectPatternErrorMsg": "subject does not match subject pattern!",
    "helpMessage": "",
    "autoFix": false
  }
}
```
