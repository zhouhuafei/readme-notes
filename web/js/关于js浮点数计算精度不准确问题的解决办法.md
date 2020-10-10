# 原因
```
先看一个实例：
0.1 + 0.2 =？
0.1 + 0.2 = 0.3？
我们先来看一段 JS。
console.log( 0.1+ 0.2);
输出为 0.30000000000000004。是不是很奇葩
其实对于浮点数的四则运算，几乎所有的编程语言都会有类似精度误差的问题，只不过在 C++/C#/Java 这些语言中已经封装好了方法来避免精度的问题，而 JavaScript 是一门弱类型的语言，从设计思想上就没有对浮点数有个严格的数据类型，所以精度误差的问题就显得格外突出。下面就分析下为什么会有这个精度误差，以及怎样修复这个误差。
首先，我们要站在计算机的角度思考 0.1 + 0.2 这个看似小儿科的问题。我们知道，能被计算机读懂的是二进制，而不是十进制，所以我们先把 0.1 和 0.2 转换成二进制看看：
0.1 => 0.0001 1001 1001 1001…（无限循环）
0.2 => 0.0011 0011 0011 0011…（无限循环）
上面我们发现0.1和0.2转化为二进制之后，变成了一个无限循环的数字，这在现实生活中，无限循环我们可以理解，但计算机是不允许无限循环的，对于无限循环的小数，计算机会进行舍入处理。进行双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100110011001100 因浮点数小数位的限制而截断的二进制数字，这时候，我们再把它转换为十进制，就成了 0.30000000000000004。
```
```
知道了浮点数产生的原因了，那么怎么处理这个问题呢？
方法一(不推荐)：指定要保留的小数位数(0.1+0.2).toFixed(1) = 0.3;这个方法toFixed是进行四舍五入的也不是很精准，对于计算金额这种严谨的问题，不推荐使用，而且不同浏览器对toFixed的计算结果也存在差异。
方法二(推荐)：把需要计算的数字升级（乘以10的n次幂）成计算机能够精确识别的整数，等计算完毕再降级（除以10的n次幂），这是大部分编程语言处理精度差异的通用方法。
(0.1*10 + 0.2*10) / 10 == 0.3 // true
```
* 注：10.2 * 100 得到的结果是 1019.9999999999999
  - 百位数的乘法运算也存在精度缺失的问题，建议使用千位数进行运算。

# 解决方案
> 以下是拷贝网上的代码
```javascript
/**
 ** 加
 **/
function add(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

/**
 ** 减
 **/
function subtract(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 ** 乘
 **/
function multiply(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 ** 除
 **/
function divide(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
  }
  with (Math) {
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}
```

# 包
* https://github.com/nefe/number-precision
* https://github.com/MikeMcl/decimal.js
* https://github.com/MikeMcl/bignumber.js
