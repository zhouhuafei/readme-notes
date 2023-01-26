## 忽略ts类型检查
* 通过`// @ts-nocheck`注释来忽略类型检查 - 放在文件顶部用以忽略整个文件的类型检查。
* 通过`// @ts-ignore`注释来忽略类型检查 - 放在代码上一行用以忽略某行代码的类型检查。

## 文档
* 官方文档：https://www.tslang.cn
* 入门文档：https://ts.xcatliu.com
* 类型体操：https://www.jianshu.com/p/276a7d596744

## TS类型中的any和void以及never的区别？
https://juejin.cn/post/6844904126019534861
* 非严格模式下，null和undefined可以赋值给除never外的所有类型。
* 严格模式下null和undefined不能赋值给其他类型（void有特例↓）。
  - 能将undefined赋值给void。
  - 但null依然如上所述，不能赋值给void。

## public和protected以及private的区别？
|       位置      |      private      |     protected   |        public     |
|      :---:      |      :---:        |       :---:     |         :---:     |
|      本类内      |       	Y         |       	Y       |           Y       |
|      子类内      |       	N         |	        Y       |   	    Y       |
|       外部       |       	N         |     	N       |	        Y       |
|    能否重新定义   |        N         |	        Y       |       	Y       |
* 对属性或方法的访问控制是通过在前面添加关键字`public`、`protected`、`private`来实现的。
* 被定义为`public`可以在任何地方被访问。默认`public`。
* 被定义为`protected`可以被其自身以及其子类和父类访问。
* 被定义为`private`只能被其定义所在的类访问。

## 类型断言和强制类型转换
* 类型断言：`(window as any).a = 1`。
* 强制类型转换：`(<any>window).a = 1`。

## 联合类型（|）和交叉类型（&）
```typescript
let hello: string | number
hello = 1
hello = 'a'
let world: { a: string } & { b: number }
world = { a: 'a', b: 2 }
```
