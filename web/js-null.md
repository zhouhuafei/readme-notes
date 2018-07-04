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
