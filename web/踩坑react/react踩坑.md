# 文档
https://react.docschina.org/

# 常用生命周期
* componentWillMount
* componentDidMount
    - 建议在此发送ajax拿数据
* componentWillMount和componentDidMount的区别
    - 1、componentWillMount  将要装载，在render之前调用；componentDidMount，（装载完成），在render之后调用
    - 2、componentWillMount  每一个组件render之前立即调用；componentDidMount  render之后并不会立即调用，而是所有的子组件都render完之后才可以调用
    - 3、componentWillMount  可以在服务端被调用，也可以在浏览器端被调用；componentDidMount  只能在浏览器端被调用，在服务器端使用react的时候不会被调用
* componentWillUnmount
    - 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
    
# 为什么react一般在componentDidMount发送ajax，而vue一般在created发送ajax？
* 1、之所以react推荐在componentDidMount钩子中使用而不是componentWillMount的原因：因为请求是异步的，所以无论你放在两个中的任何一个里面，几乎绝对都会在组件渲染之后，再进行数据渲染，也就是说避免不了二次渲染(第一次渲染为默认值，第二次为请求后的数据渲染)，所以效果上放到哪里都一样，但是在DidMount中可以使用refs了。然后重要的是（是在Stack Overflow中的回答看到）：未来的react版本可能会对componentWillMount进行调整，可能在某些情况下触发多次，所以官方是推荐在componentDidMount中进行请求。 当然放到willMount中可能会快那么几毫秒，毕竟先运行嘛。
* 2、vue的渲染前的钩子函数比react多两个：beforeCreat与created。而vue的例子为什么在created中写的，可能是因为是个demo也没有考虑那么多。一样的道理，无论放到created或者beforeMount中也同样避免不了二次渲染，差别也可能是那么几毫秒。

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
