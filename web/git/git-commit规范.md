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
* 使用`git cz`取代`git commit`。
  - commitizen：https://github.com/commitizen/cz-cli

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

# `git cz`实操流程
* 1、安装依赖并进行初始化。
  - 全局安装
  ```
  npm install commitizen -g
  commitizen init cz-conventional-changelog --save-dev --save-exact
  ```
  - 局部安装
  ```
  npm install --save-dev commitizen
  npx commitizen init cz-conventional-changelog --save-dev --save-exact
  ```
* 2、配置`package.json`文件。
```
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```
* 配置完毕，即可使用`git cz`命令。

# 使`git cz`附带表情包
> 上述的`git cz`并不具有表情包功能，然而这个包可以使`git cz`具有表情包的能力：https://github.com/streamich/git-cz
* 使用方式：本人在mac上，直接进行`npm i --save-dev git-cz`安装，安装完了就能用。

# 根据commit信息生成更新日志
> https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli
* 安装工具。
```
npm install -g conventional-changelog-cli
```
* 如果这是您第一次使用此工具，并且想要生成所有以前的变更日志，则可以执行。
```
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```
* 下面命令不会覆盖以前的`Change log`，只会在`CHANGELOG.md`的头部加上自从上次发布以来的变动。
```
conventional-changelog -p angular -i CHANGELOG.md -s
```

# 根据commit信息生成更新日志 - vue是怎么做的
* https://github.com/vuejs/vue/blob/dev/scripts/gen-release-note.js
  - 1、在`.gitignore`文件中忽略`RELEASE_NOTE*.md`文件。
  - 2、写js脚本。
  ```
  const version = process.argv[2] || process.env.VERSION
  const cc = require('conventional-changelog')
  const file = `./RELEASE_NOTE${version ? `_${version}` : ``}.md`
  const fileStream = require('fs').createWriteStream(file)

  cc({
    preset: 'angular',
    pkg: {
      transform (pkg) {
        pkg.version = `v${version}`
        return pkg
      }
    }
  }).pipe(fileStream).on('close', () => {
    console.log(`Generated release note at ${file}`)
  })
  ```
* https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog
