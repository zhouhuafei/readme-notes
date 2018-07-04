# null
* null身上没有方法
    - 没有toString方法
    - 也没有valueOf方法
* null转成数字是0。
* null > 0; // false
* null < 0; // false
* null == 0; // false null在做相等判断时，不进行转型，所以null和0为不同类型数据，结果为false
* null == undefined; // true undefined派生于null
* null >= 0; // true
* null <= 0; // true

* null <= 1; // true
* null >= 1; // false
* null <= -1; // false
* null >= -1; // true

* null < 1; // true
* null > 1; // false
* null < -1; // false
* null > -1; // true

* Number(null); // 0

# undefined
* undefined身上没有方法
    - 没有toString方法
    - 也没有valueOf方法
* undefined转成数字是NaN，NaN和任何类型的数据进行对比或者进行运算时，返回的都是flase。
* undefined > 0; // false
* undefined < 0; // false
* undefined == 0; // false undefined在做相等判断时，不进行转型，所以undefined和0为不同类型数据，结果为false
* undefined == null; // true undefined派生于null
* undefined >= 0; // true
* undefined <= 0; // true

# 原因
* 后来在[ECMAScript 6入门（链接）](http://es6.ruanyifeng.com/?search=%E9%80%97%E5%8F%B7&x=4&y=9#docs/spec)找到==和===的算法细节：
* 规格对每一种语法行为的描述，都分成两部分：先是总体的行为描述，然后是实现的算法细节。相等运算符的总体描述，只有一句话。
* “The comparison x == y, where x and y are values, producestrue or false.”
* 上面这句话的意思是，相等运算符用于比较两个值，返回true或false。
* 下面是算法细节：
    - 1、如果x不是正常值（比如抛出一个错误），中断执行。
    - 2、如果y不是正常值，中断执行。
    - 3、如果Type(x)与Type(y)相同，执行严格相等运算x === y。
    - 4、如果x是null，y是undefined，返回true。
    - 5、如果x是undefined，y是null，返回true。
    - 6、如果Type(x)是数值，Type(y)是字符串，返回x == ToNumber(y)的结果。
    - 7、如果Type(x)是字符串，Type(y)是数值，返回ToNumber(x) == y的结果。
    - 8、如果Type(x)是布尔值，返回ToNumber(x) == y的结果。这里我是不是可以理解，布尔值和其他类型进行比较全部都是转成数字进行比较。
    - 9、如果Type(y)是布尔值，返回x == ToNumber(y)的结果。这里我是不是可以理解，布尔值和其他类型进行比较全部都是转成数字进行比较。
    - 10、如果Type(x)是字符串或数值或Symbol值，Type(y)是对象，返回x == ToPrimitive(y)的结果。ToPrimitive是转成原始值的意思。
    - 11、如果Type(x)是对象，Type(y)是字符串或数值或Symbol值，返回ToPrimitive(x) == y的结果。ToPrimitive是转成原始值的意思。
    - 12、返回false。
* 由于0的类型是数值，null的类型是 Null（这是规格[4.3.13 小节](http://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-null-type)的规定，是内部 Type 运算的结果，跟typeof运算符无关）。因此上面的前 11 步都得不到结果，要到第 12 步才能得到false。
* null==0; // false
