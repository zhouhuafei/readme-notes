# 模块化
当这个第一种导出方式
```
// a.js
module.exports = {a:1};
```
换成这个第二种导出方式
```
// a.js
export default {a:1};
```
之后
```
第一种导入可以如此写：
import {a} from './a.ja'; 这样写的话a是1，因webpack打包是按照commonjs规范进行打包
第二种导入不可以如此写：
import {a} from './a.ja'; 这样写的话a是undefined，因webpack打包是按照es6的模块化规范进行打包
第二种导入的正确写法1：
import {default as obj} form './a.ja';
const a=obj.a;
第二种导入的正确写法2：
import obj from './a.ja';
const a=obj.a;
```
总结：es6的模块化，导出的如果是默认模块。只能用一个变量进行统一接收。

# 改的我心累
* globalData字段换成从app上读取。
* options换成从this.$router.params上读取。
* 套页面换成jsx的语法。
* data换成state。
* this.$apply()没有。挨个换成this.setState({a,b,c});。
* 事件调用的函数传参时customFn.bind(this,arg1)一下。
* 等等等。

# wxParse
```
WxParse.wxParse('content', 'html', content, this.$scope, 5);
```
* 上面如果传的是this，则wxParse.js中需要把this.setData换成this.setState。

# React的setState是异步的
* wepy转taro踩坑时踩到一个坑。
* 如果想setState之后立即获取到数据(实时获取)，可以使用```this.getState().attrName```。
    - getState()应该是state的实时备份，等内部操作完了，才会赋值给state。【未经查证，纯属猜测】
* 异步的原因：
    - 保证内部的一致性
    - 性能优化
    - 更多的可能性
