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
const arr2: (string | number)[] = []
const arr3: Array<string> = []
const arr3: Array<string | number> = []
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
