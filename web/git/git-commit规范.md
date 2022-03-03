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
* ci：自动化流程配置
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
> 上述的`git cz`并不具有表情包功能，然而右边链接中的这个包可以使`git cz`具有表情包的能力：https://github.com/streamich/git-cz
* 1、安装依赖`npm i --save-dev git-cz`。
* 2、修改`package.json`配置，把`"path": "cz-conventional-changelog"`更换为`"path": "git-cz"`。
```
{
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
```

# 还可以使用npm执行`git cz`。
> 配置`package.json`。
```
{
  "scripts": {
    "commit": "git-cz"
  }
}
```
> 运行：`npm run commit`即可。
* 说明：上述配置使得运行`npm run commit`相当于运行`git-cz`命令。
  - `commitizen`包提供了`git-cz`命令。
  - `git-cz`包也提供了`git-cz`命令，还提供了`gitcz`命令。
  - 上述`"commit": "git-cz"`可以更改为`"commit": "npx git-cz"`，还可以更改为`"commit": "git cz"`，也可以更改为`"commit": "gitcz"`。

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
* 下面命令不会覆盖以前的`change log`，只会在`CHANGELOG.md`的头部加上自从上次发布以来的变动。
```
conventional-changelog -p angular -i CHANGELOG.md -s
```
* 说明：`conventional-changelog-cli`工具可进行局部安装和使用(npm上的工具包都可进行局部安装和使用，我个人也推荐进行局部安装和使用，好处就是包的版本在项目中是固定的，不容易出问题)。
```
npm install --save-dev conventional-changelog-cli
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
npx conventional-changelog -p angular -i CHANGELOG.md -s
```
* 我的使用方式：在`package.json`文件中增加以下命令。
```
{
  "scripts": {
    "changelog:init": "npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
    "changelog": "npx conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
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
  - 3、配置`package.json`。
  ```
  {
    "scripts": {
      "release:note": "node scripts/gen-release-note.js"
    }
  }
  ```
  - 4、运行(2.6.6前不用带v前缀，脚本内部自动加了v前缀)。
  ```
  npm run release:note 2.6.6
  ```
* https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog

# changelog的生成依赖什么？
* 1、依赖 `规范的commit信息`。
* 2、依赖 `git的tag`。
* 3、初始化(`npm run changelog:init`)生成的`CHANGELOG.md`文件，其内容中的版本号，依赖`package.json中的version字段`。

# 全局安装`git-cz`的好处
* 不用安装`commitizen`。
* 不用配置`git-cz`。
* 在项目中直接使用`git cz`进行`commit`即可。
* 亲测，全局安装`git-cz`，即可直接使用`git cz`。

# git-cz 自定义配置
* 在项目根目录使用`changelog.config.js`进行自定义配置。
* 文档：https://www.npmjs.com/package/git-cz#custom-config

# 报错
* 同事的电脑使用`git-cz`报错：`/c/Users/admin/AppData/Roaming/npm/node: line 1: /node_modules/node/bin/node: No such file or directory`。
* 解决方案：删除当前项目`node_modules`目录里的`husky`包。

## 为什么能触发git钩子？
* 使用vue-cli创建的项目，为什么能在package.json中配置gitHooks，使之触发git钩子？
  - 因为vue-cli会在`.git/hooks`目录中增加`pre-commit`和`commit-msg`等诸多的钩子脚本。
* 使用husky包的v7版本时，为什么可以把`pre-commit`和`commit-msg`等诸多的钩子脚本不放在`.git/hooks`目录中？
  - 因为`husky install`命令修改了`.git`目录中`config`文件的`hooksPath`值，使之指向了`.git/hooks`目录的外部。

## 使用`conventional-changelog`命令生成`CHANGELOG.md`文件
* 使用`conventional-changelog`命令生成`CHANGELOG.md`文件需要`conventional-changelog-cli`包。
#### 初始化内容：`npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0`。
* 不仅可在git打tag之后使用（会生成全部tag的feat和fix）。
  - 操作时需要先对package.json的version字段进行自增，然后打tag，最后运行上述命令。
* 也可以在git打tag之前使用（会生成自上次tag后的feat和fix）。
  - 操作时需要先对package.json的version字段进行自增，然后运行上述命令，最后打tag。
#### 追加新内容：`npx conventional-changelog -p angular -i CHANGELOG.md -s`。
* 只可以在git打tag之前使用（会生成自上次tag后的feat和fix）。
  - 操作时需要先对package.json的version字段进行自增，然后运行上述命令，最后打tag。
#### 注意事项：git的tag需要是v开头的格式。
* 例：`git tag v2.0.0 -m "标签的注释"`。
#### 最佳实践：保持版本号的一致性。
* 例：如果package.json的version字段是`2.0.0`，那么git打tag时就要打成`v2.0.0`。
