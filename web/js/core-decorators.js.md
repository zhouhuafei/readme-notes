```javascript
/**
 * 注解 装饰器 java里叫注解 javascript里叫装饰器
 * core-decorators.js
 * @autobind 原理 简单实现
 * */
```

## 应用
```javascript
import { autobind } from 'core-decorators'

class Person {
  @autobind
  getPerson () {
    return this
  }
}

let person = new Person()
let getPerson = person.getPerson

getPerson() === person
// true
```

## 原理
```javascript
class Person {
  getPerson () {
    return this
  }
}

// 在此处进行一些处理 让末尾等式成立
function autobind (target, name) {
  const fn = target[name]
  Object.defineProperty(target, name, {
    get () {
      return fn.bind(this)
    }
  })
}

autobind(Person.prototype, 'getPerson')

let person = new Person()
let getPerson = person.getPerson
// 让下面的等式成立
console.log(getPerson() === person) // true
```
