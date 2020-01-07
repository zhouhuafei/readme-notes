# 泛型(generic)
> 参数化的类型，一般用来限制集合的类型。
* 数组中只允许放入和Person实例格式一致的数据。
```typescript
class Person {}
const myArray: Array<Person> = [];
myArray.push(new Person());
```
* 数组中只允许放入数字。
```typescript
const myArray: Array<Number> = [];
myArray.push(1);
```

# 接口(interface)
> 用来建立某种代码约定，使得其开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。
* interface
```typescript
interface IPerson {
    name: string; // 分号
    age: number;
    height?: number; // 可选属性
}
class Person {
    // 此处接口作为一个方法的类型声明，此时ts会检查你传入的参数是否满足接口声明的属性要求。
    constructor(public config: IPerson) {}
}
new Person({name: 'name', age: 18}) // 正确的传入参数，则不会报错。
```
* implements
```typescript
interface Animal {
    eat()
}
// Sheep 实现 Animal 则需要实现接口中的eat方法。
class Sheep implements Animal {
    eat () {
        console.log('我吃草')
    }
}
new Sheep().eat();
// Tiger 实现 Animal 则需要实现接口中的eat方法。
class Tiger implements Animal {
    eat () {
        console.log('我吃肉')
    }
}
new Tiger().eat();
```

# 注解(annotation)
> 注解为程序的元素(类、方法、变量)加上更直观更明了的说明，这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用的。
* 告诉框架读取什么文件，渲染到什么位置。
* @Component就是注解，由Angular2提供，告诉Angular2框架如何处理AppComponent这个类。
```
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app works!';
}
```

# 类型定义文件
> 类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript的工具包，如JQuery等。
* 类型定义文件的以```.d.ts```结尾，里面主要用来定义类型。
    - 在ts里直接使用```$```符号会报错，如果文件夹下有对应的jq的类型定义文件，则就不会报错了。
* 常用类型定义文件```*.d.ts```：https://github.com/DefinitelyTyped/DefinitelyTyped
* 使用typing工具安装```*.d.ts```类型定义文件：https://github.com/typings/typings
