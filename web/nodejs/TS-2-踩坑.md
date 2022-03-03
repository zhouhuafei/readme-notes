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
* 在声明文件中增加声明即可。以vue3的ts项目和`zhf.sku`包为例，只需要在`shims-vue.d.ts`文件中增加一句`declare module 'zhf.sku'`即可。
