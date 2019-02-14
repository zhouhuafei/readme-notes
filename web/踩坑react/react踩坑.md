# 文档
https://react.docschina.org/

# 常用生命周期
* componentWillMount
* componentDidMount
* componentWillMount和componentDidMount的区别
    - 1、componentWillMount  将要装载，在render之前调用；componentDidMount，（装载完成），在render之后调用
    - 2、componentWillMount  每一个组件render之前立即调用；componentDidMount  render之后并不会立即调用，而是所有的子组件都render完之后才可以调用
    - 3、componentWillMount  可以在服务端被调用，也可以在浏览器端被调用；componentDidMount  只能在浏览器端被调用，在服务器端使用react的时候不会被调用

# jsx
* ```{}```
    - 大括号内部可以写表达式，不可以写语句。例如循环语句，条件语句是不可以写的。
    - 写三目表达式，方法以及函数的调用都是可以的，例如数组的map方法等。
    - 在方法以及函数的内部是可以写语句的。
* 正确案例：在map方法的回调里是可以写if语句的。但是在大括号```{}```的直属内层是不可以写的。
```
ReactDOM.render(
  <h1>
    Hello, {user.arr.map(function(v,i,a){
      if(v===3){
        return 'c';
      }
      return v+1
    })}!
  </h1>,
  document.getElementById('root')
);
```

# 父子通信
* 父传子 props
* 子传父 子组件调用父组件通过props穿过来的方法即可。和jsonp原理相似。
    - 如果传递参数：
    ```
    this.customFn.bind(this, arg1, arg2)
    ```
    - ev在函数内可通过最后一个参数获取到。
    ```
    customFn(arg1, arg2, ev){
    }
    ```
* props是只读的，请遵守这个原则。

# 事件
* 原生事件```onclick```，react事件```onClick```。

# onChange事件
* react给input标签使用onInput事件会报错，react建议使用onChange事件。
* 原生的onchange是失去焦点触发。
* react的onChange事件和原生的oninput事件一样。输入就触发。
