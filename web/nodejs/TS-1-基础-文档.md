> 摘自：https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html

###### 可以当js使用
```
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

###### 类型注解
* 类型注解是一种轻量级的为函数或变量添加约束的方式。
```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```
```
greeter.ts(7,26): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
* 其他案例 - 数组
```
const arr1: string[] = []
const arr2: Array<string> = []
const arr3: (string | number)[] = []
const arr4: Array<string | number> = []
class Super {}
const arr5: Super[] = []
const arr6: Array<Super> = []
```
* 其他案例 - 函数 - 返回值是字符串
```
function fn (name: string): string {
  return 'string'
}
```
* 其他案例 - 函数 - 返回值是任意类型
```
function fn (name: string): any {
  return 'string'
}
```
* 其他案例 - 函数 - 返回值是字符串或者是数字
```
function fn (name: string): string ｜ number {
  return 'string'
}
```
* 其他案例 - 函数 - 无返回值
```
function fn (name: string): void {
}
```

###### 接口
* 使用接口来描述一个拥有 firstName 和 lastName 字段的对象。
* 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。
* 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements 语句。
```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

###### 类
* 在构造函数的参数上使用 public 等同于创建了同名的成员变量。
```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

###### TS存取器和defineProperty的区别
* TS存取器 模拟 vue的计算属性
> 转成es5后，内部实现依然是使用defineProperty实现的。
```
class Super {
  private firstname: string = 'zhou';
  private lastname: string = 'huafei';
  get fullname () : string {
    return this.firstname + '-' + this.lastname
  }
  set fullname(newVal: string) {
    this.firstname = newVal.split('-')[0]
    this.lastname = newVal.split('-')[1]
  }
}
const obj1 = new Super()
obj1.fullname = 'zhou-huafei2'
const obj2 = new Super()
console.log(obj1.fullname)
console.log(obj2.fullname)
```
* defineProperty
```
var obj = {};
Object.defineProperty(obj, 'txt', {
    get: function () {
        console.log('获取');
        return obj;
    },
    set: function (newValue) {
        console.log('设置');
        return newValue;
    },
});
```
