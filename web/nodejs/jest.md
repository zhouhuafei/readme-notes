Jest是一个JavaScript测试框架，由Facebook推出，用来测试所有JavaScript代码，包括React应用程序。

## 安装
```
npm install --save-dev jest
```

## 测试文件命名规范
* *.test.js
* *.spec.js

## 测试命令
* 如果你是全局安装，则当前目录运行jest命令，他会自己寻找测试文件，并执行。
* 如果你是局部安装，请看使用案例。

## 使用案例
* 待测试文件 sum.js
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
* 写测试脚本 sum.test.js
  - 更多expect方法 http://facebook.github.io/jest/docs/en/expect.html
  - 对象和数组使用`toEqual`进行验证。
  - `toBe`用来比较字符串、数字等基础类型的数据，`toEqual`亦可用来比较字符串、数字等基础类型的数据。
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

## describe
> 测试代码的书写，Jest有很多种方式，可以直接在测试文件中写一个test或it用来测试，也可以使用describe函数创建一个测试集。
* 在describe中使用it和test。
* it和test是一模一样的功能。
* 在it和test中使用expect。

## Jest中异步代码的测试
* Jest中异步代码的测试：https://www.jianshu.com/p/ed212e1be81e
* Jest中断言assertions的理解：https://www.jianshu.com/p/f650eadeb4f8

## 更多使用说明
* 请参阅官网 http://facebook.github.io/jest/

## jest报错
> 报错内容如下
```
FAIL
● Test suite failed to run

SecurityError: localStorage is not available for opaque origins at Window.get localStorage [as localStorage] (node_modules/jsdom/lib/jsdom/browser/Window.js:257:15)
      at Array.forEach (<anonymous>)
```
* 解决方案：https://github.com/zhouhuafei/zhf.time-count-down/blob/master/jest.config.js

## git commit 之前进行代码风格的检测和修复(检测改动部分)
> 在`package.json`中增加如下内容
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```
* 需：配置`eslint`以及安装`husky`和`lint-staged`包。`lint-staged`只检测和修复改动的代码。
* 注：修复完毕，`git add`会将修复后的代码重新`add`到`git`中。然后再触发`commit`。
* `vue-cli3`创建的项目包含`lint-staged`的配置，案例如下。
```
{
  "scripts": {
    "lint": "vue-cli-service lint"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  }
}
```

## git commit 之前进行代码风格的检测和修复(检测全部内容)
> 在`package.json`中增加如下内容
```json
{
    "scripts": {
        "codeLint": "eslint --ext .js,.vue,.html ./",
        "codeFix": "eslint --fix --ext .js,.vue,.html ./",
        "test": "jest",
        "precommit": "npm run codeFix && npm run test && git add ."
    }
}
```

## 覆盖率
* `%Stmts`是语句覆盖率(statement coverage)：是不是每个语句都执行了？
* `%Branch`分支覆盖率(branch coverage)：是不是每个if代码块都执行了？
* `%Funcs`函数覆盖率(function coverage)：是不是每个函数都调用了？
* `%Lines`行覆盖率(line coverage)：是不是每一行都执行了？

## vue单元测试 - mount和shallowMount的区别是什么？
> https://github.com/vuejs/vue-test-utils
* mount仅仅挂载当前组件实例；而shallowMount挂载当前组件实例以外，还会挂载子组件。
