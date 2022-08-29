## typescript往window上挂载属性报错如何解决？
* 方案1 - 使用声明合并：整个项目都能用的方法，适用于自定义属性。
```typescript
declare global {
  interface Window {
    isWeChat: boolean
  }
}
```
* 方案2 - 使用交叉类型：单文件的方法，适用于简易Polyfill，或者不希望泄漏。
```typescript
declare var window: Window & { isWeChat: boolean }
```

## ts引入js的第三方模块时报缺少声明文件的错误？
#### 方案1
* 在声明文件中增加声明即可。
* 以vue-cli创建的vue3的ts项目和`zhf.sku`包为例，只需要在`shims-vue.d.ts`文件中增加一句`declare module 'zhf.sku'`即可。
  - `shims-vue.d.ts`：vue-cli创建的vue3的ts项目。
  - `env.d.ts`：vite创建的vue3的ts项目。
#### 方案2
* 在`tsconfig.json`文件中，设置`noImplicitAny`为`false`。

## TS2556: A spread argument must either have a tuple type or be passed to a rest parameter.
#### 使用`as const`可以防止报上述错误
```typescript
const test = (a: string, b: string, c: string): void => undefined
const arr = ['a', 'b', 'c'] as const
test(...arr)
```
