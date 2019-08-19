# 泛型(generic)
> 参数化的类型，一般用来限制集合的类型。
* 数组中只允许放入Person的实例。
```typescript
class Person {}
const myArray: Array<Person> = [];
myArray.push(new Person());
```

# 接口(interface)
> 用来建立某种代码约定，使得其开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。
