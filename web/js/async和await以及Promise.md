# 有些浏览器不支持Promise和async以及await怎么兼容？
* 引入```babel-polyfill```包即可。
* ```babel-polyfill```源码地址：https://github.com/babel/babel/tree/master/packages/babel-polyfill

# async
* async定义的方法返回值是一个Promise。
* 怎么接收async函数返回的具体结果么？
    - 1、使用then方法，在回调里接收。
    ```
    async function getOne() {
        return 1;
    }

    getOne().then(result => console.log(result));
    ```
    - 2、在另外一个async方法中，使用await接收。
    ```
    async function returnOne() {
        return 1;
    }
    async function getOne() {
        var result = await returnOne();
        console.log(result);
    }
    getOne();
    ```

# await
> ```await```操作符用于等待一个```Promise```对象。它只能在异步函数```async function```中使用。
* await后面需要是一个Promise对象。
* await只能在异步函数```async function```中使用。
* 案例1：先等待(非并发请求)。
```
const fn1 = await promiseFn1();
const fn2 = await promiseFn2();
// 等fn1有结果了再执行fn2，等fn2也有结果了，才会走到这一行。如此写法无并发请求。
```
* 案例2：先不等待(并发请求)。
```
const fn1 = promiseFn1();
const fn2 = promiseFn2();
const obj = await fn1 && await fn2;
// 等fn1和fn2执行都有结果了，才会走到这一行。如此写法会并发请求。相当于Promise.all。
```
* 示例代码如下，请问：obj会得到怎样的结果？
    ```
    var obj = await fn();
    console.log(obj);
    ```
    - 接口不出错：如果```axios()```后的```.then()```中有返回值。则obj就是这个返回值。
    - 接口不出错：如果```axios()```后的```.then()```中无返回值。则obj就是undefined。
    - 接口不出错：如果```axios()```后无```.then()```操作。则obj就是接口的返回值。
    - 接口出错：如果```axios()```后的```.catch()```中有返回值。则obj就是这个返回值。
    - 接口出错：如果```axios()```后的```.catch()```中无返回值。则obj就是undefined。
    - 接口出错：如果```axios()```后无```.catch()```操作。则obj打印不出来值。因```var obj = await fn();```会直接抛出错误，所以代码走不到```console.log(obj);```。
    - 总结：```await```返回```Promise```对象的处理结果。如果等待的不是```Promise```对象，则返回该值本身。

# Promise之axios和jq的ajax最新版
* return axios().then().catch()之后。如果后续还接着使用.then()的话。即使失败了。也是会走进then()的。所以我才先catch处理再then处理。
    - catch时把错误的数据整理好。return出去。最后统一走到then里。想处理就二次处理。
* Promise的特性总结：
    - 如果成功(resolve)，就能走到所有的then里。
    - 如果失败(reject)，会走到第一个catch以及第一个catch之后的所有then中。
* 案例1：```axios().then().catch().then().catch().then().catch()```。
    - 如果成功，所有的then都会执行。
    - 如果失败，第一个catch以及第一个catch之后的所有then都会执行。
* 案例2：```axios().catch().then().catch().then().catch().then()```。
    - 如果成功，所有的then都会执行。
    - 如果失败，第一个catch以及第一个catch之后的所有then都会执行。

# Promise.all
* Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
* Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。
* 需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

# Promise.race
* 顾名思义，Promse.race就是赛跑的意思，意思就是说，```Promise.race([p1, p2, p3])```里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

# Promise库
https://github.com/petkaantonov/bluebird/
