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
