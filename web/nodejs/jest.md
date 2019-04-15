Jest是一个JavaScript测试框架，由Facebook推出，用来测试所有JavaScript代码，包括React应用程序。

# 安装
```
npm install --save-dev jest
```

# 测试文件命名规范
* *.test.js
* *.spec.js

# 测试命令
* 如果你是全局安装，则当前目录运行jest命令，他会自己寻找测试文件，并执行。
* 如果你是局部安装，请看使用案例。

# 使用案例
* 待测试文件 sum.js
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

* 写测试脚本 sum.test.js
    - 更多expect方法 http://facebook.github.io/jest/docs/en/expect.html
    - 对象和数组使用toEqual进行验证
    - toBe用来比较字符串和数字，toEqual亦可用来比较字符串和数字
    ```
    const sum = require('./sum');

    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    ```

* 把命令加入package.json文件
```
{
    "scripts": {
        "test": "jest"
    }
}
```

* 运行命令进行测试
```
npm run test
```

* 得到结果
```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

# 更多使用说明
* 请参阅官网 http://facebook.github.io/jest/

# git commit 自动测试会报错
* 使用husky包可以配置precommit从而让git在commit之前进行预检测。
```
"scripts": {
    "codeLint": "eslint --ext .js,.vue,.html ./",
    "codeFix": "eslint --fix --ext .js,.vue,.html ./",
    "gulp": "gulp",
    "test": "jest",
    "precommit": "npm run codeLint && npm run test"
},
```
* 但是git commit时出现了以下报错信息
```
FAIL
● Test suite failed to run

SecurityError: localStorage is not available for opaque origins at Window.get localStorage [as localStorage] (node_modules/jsdom/lib/jsdom/browser/Window.js:257:15)
      at Array.forEach (<anonymous>)
```
* 解决方案，增加配置文件
 - https://github.com/zhouhuafei/zhf.time-count-down/blob/master/jest.config.js

# git commit 自动检测并修复语法错误1
https://www.jianshu.com/p/cdd749c624d9
* 1、配置```eslint```(略)
* 2、安装```husky```和```lint-staged```包
* 3、```package.json```中增加如下字段
```json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```
* 解释：
    - ```pre-commit```可以换成```precommit```。
    - ```git add```表示将处理过的代码重新```add```到```git```中。
    - 然后再触发```commit```。
    
# git commit 自动检测并修复语法错误2
* ```eslint```和```husky```配合使用，在```package.json```中增加如下字段
* 此处省略了```jest```包的使用配置
```json
{
    "scripts": {
        "codeLint": "eslint --ext .js,.vue,.html ./",
        "codeFix": "eslint --fix --ext .js,.vue,.html ./",
        "test": "jest",
        "precommit": "npm run codeFix && npm run codeLint && npm run test"
    }
}
```

# 使用husky配合eslint在提交代码时就可以自动修复，为什么还要使用lint-staged？
* lint-staged：只检测和修复改动的代码。
