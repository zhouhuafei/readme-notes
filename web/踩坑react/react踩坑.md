# 文档
https://react.docschina.org/

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
