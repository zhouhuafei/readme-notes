## npm init egg --type=sample 到底做了什么？
> https://zhuanlan.zhihu.com/p/160134555
* `npm init egg --type=sample`等同于`npx create-egg --type=sample`。
  - `npx create-egg`可以避免在本地安装`create-egg`模块，并能运行`create-egg`模块。
  - 运行`create-egg`模块就是执行`create-egg`项目里`package.json`文件中的`bin`对应的`js`文件。
  - https://github.com/eggjs/create-egg/blob/master/package.json
  - `npm create`是`npm init`的别名。
