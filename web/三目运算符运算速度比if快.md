* 三目运算符运算速度比if快了13左右
```
let a;
let b;
let c;
const time1 = new Date();
if (a === 1) {
    b = 2;
} else {
    b = 0;
}
console.log(new Date() - time1); // 12, 13, 14, 15, 16
const time2 = new Date();
c = a === 1 ? 2 : 0;
console.log(new Date() - time2); // 0
```