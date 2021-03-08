## 文档
https://www.tslang.cn/docs/handbook/basic-types.html

## 类型断言 和 强制类型转换
* 类型断言：`(window as any).a = 1`
* 强制类型转换：`(<any>window).a = 1`

## typescript 往 window 上挂载属性报错如何解决？
* （声明合并）整个项目都能用的方法，适用于自定义属性：
```typescript
declare global {
  interface Window {
    isWeChat: boolean
  }
}
```
* （交叉类型）单文件的方法，适用于简易Polyfill，或者不希望泄漏：
```typescript
declare var window: Window & { isWeChat: boolean }
```

## 联合类型（|） 和 交叉类型（&）
```typescript
var hello: string | number
hello = 1
hello = 'a'
var world: { a: string } & { b: number }
world = { a: 'a', b: 2 }
```

## TS 类型中的 any、void 和 never
https://juejin.cn/post/6844904126019534861

## ts 特殊符号用法
1. 属性或参数中使用 ？：表示该属性或参数为可选项
2. 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
3. 变量后使用 ！：表示类型推断排除null、undefined
