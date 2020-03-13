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
* 2、vue的渲染前的钩子函数比react多两个：beforeCreate与created。而vue的例子为什么在created中写的，可能是因为是个demo也没有考虑那么多。一样的道理，无论放到beforeCreate、created、beforeMount或者mounted中也同样避免不了二次渲染，差别也可能是那么几毫秒。
    - beforeCreate中```el```和```data```并未初始化。但是如果加了定时器setTimeout，则是可以获取到的。所以在ajax的回调中也是可以获取到的。
    - vue的生命周期钩子函数中，只有beforeCreate和created会在服务器端渲染(SSR)过程中被调用。

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
* 疑问：三目遇到需要返回多个并列的div怎么处理？
    - vue有template
    - 微信小程序有block
    - jsx有？有！`<React.Fragment></React.Fragment>`，`key`是唯一可以传递给`Fragment`的属性。
    - 短语发：`<></>`，它不支持`key`或`属性`。
    - 相关文档：https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/fragments.html
    - 案例：
    ```
    render() {
      return (
        <React.Fragment>
          <ChildA />
          <ChildB />
          <ChildC />
        </React.Fragment>
      );
    }
    ```
    - 其他方案：返回一个数组。
    ```
    render() {
      return [
        <div key="id1">div1</div>,
        <div key="id2">div2</div>,
        <div key="id3">div3</div>
      ]
    }
    ```

# 父子通信
* 父传子 props
* 子传父 子组件调用父组件通过props穿过来的方法即可。和jsonp原理相似。
* props是只读的，请遵守这个原则。
* MyChild.js
```
import React from 'react'

class MyChild extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hello: 'world'
    }
  }

  render () {
    // 事件传递参数 - 事件配合bind(this)可防止this指向被改变。
    return (
      <div onClick={this.childFn.bind(this, 'arg1', 'arg2')}>my-child</div>
    )
  }

  // ev在函数内可通过最后一个参数获取到。
  childFn (arg1, arg2, ev) {
    this.props.parentFn(arg1, arg2)
  }
}

export default MyChild
```
* MyParent.js
```
import React from 'react'
import MyChild from './MyChild.js'

class MyParent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hello: 'world'
    }
  }

  render () {
    return (
      <MyChild parentFn={this.parentFn.bind(this)}></MyChild>
    )
  }

  parentFn (arg1, arg2) {
    console.log(arg1, arg2) // 'arg1' 'arg2'
  }
}

export default MyParent
```

# 事件
* 原生事件```onclick```，react事件```onClick```。

# onChange事件
* react给input标签使用onInput事件会报错，react建议使用onChange事件。
* 原生的onchange是失去焦点触发。
* react的onChange事件和原生的oninput事件一样。输入就触发。

# react中有没有类似vue中slot的功能？
> 有：https://zhuanlan.zhihu.com/p/33728369
* 实践：https://github.com/zhouhuafei/hello-world/blob/master/react/react%E4%B8%AD%E7%B1%BB%E4%BC%BCvue%E4%B8%ADslot%E7%9A%84%E5%8A%9F%E8%83%BD.html
* 关键知识点
  - 模拟具名和非具名插槽：使用`this.props.children`。
  - 模拟作用域插槽：传给子组件一个方法，让子组件调用即可。
    - 在父组件中定义方法并绑定给子组件，定义方法时使用行参接收数据，并返回JSX的布局结构。
    - 在子组件中接收方法并调用方法，调用方法时使用实参传输数据，并接收返回值用以渲染布局信息。
