/* eslint-disable */
{
  class A {
    a = 'a'
  }

  class B {
    b = 'b'
  }

  class C {
    c = 'c'
  }

  class D {
    d = 'd'
  }

  const dependenciesClass = {}

  function defineClass (className) {
    // 重点1：把形参和类进行关系绑定
    const injectionsParameters = [
      { name: 'a', Class: A },
      { name: 'b', Class: B },
      { name: 'c', Class: C },
      { name: 'd', Class: D }
    ]

    class Class {
      // 特性：constructor中的形参可以随意调换顺序。顺序调换后不会影响到最终结果的打印。
      constructor (
        a,
        b,
        c,
        d
      ) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        console.log('this.a：', this.a)
        console.log('this.b：', this.b)
        console.log('this.c：', this.c)
        console.log('this.d：', this.d)
      }
    }

    dependenciesClass[className] = { Class, injectionsParameters }
  }

  function instanceClass (className) {
    const currentClass = dependenciesClass[className]
    // 重点2：得到构造函数中形参的字符串（也就是a,b,c,d）。同时得到了顺序。
    const match = currentClass.Class.toString().match(/^[^\(]*\(\s*([^\)]*)\)/m)
    if (match) {
      const getConstructorParametersSort = match[1].split(',').map(v => v.replace(/\s*/g, '')).filter(v => v)
      // 重点3：根据形参字符串以及形参字符串的顺序，去依赖收集器中找出对应的类，然后按照顺序自动实例化类。
      new currentClass.Class(...getConstructorParametersSort.map(v => {
        const obj = currentClass.injectionsParameters.find(v2 => v2.name === v)
        const Class = obj.Class
        return new Class()
      }))
    } else {
      new currentClass.Class()
    }
  }

  defineClass('MyClass')
  instanceClass('MyClass')
}
