# 有些浏览器不支持Promise和async以及await怎么兼容？
* 引入```babel-polyfill```包即可。
* ```babel-polyfill```源码地址：https://github.com/babel/babel/tree/master/packages/babel-polyfill

# 微信原生小程序怎么使用async和await？
* 小程序开发工具-详情-开启ES6转ES5。
* 下载 regenerator 库 https://github.com/facebook/regenerator 。
* 将库中packages文件夹下 regenerator-runtime 文件夹全部复制到小程序项目中。
* 小程序项目全局引入 regenerator 库。
* 在app.js中引入```runtime.js```。
* 疑问 - 小程序中提供的那些api都是回调形式的该怎么破？
    - 建议使用taro框架或者别的小程序框架。

# async
* 返回值：返回 Promise 对象。
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
* 返回值：返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。
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
// 其实并不尽然，因为obj只是```await fn2```的结果。测试分行写，是否会并发。按理说应该是会并发的(经测试会并发)。因为就算是&&也是有先后顺序的。所以正确写法应该如下：
const obj1 = await fn1;
const obj2 = await fn2;
if(obj1.status === 'success' && obj2.status === 'success') {
    // 请求成功且业务上成功。
}
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
* 怎么防止await因接口报错，导致流程走不下去？
    - 答：根据上述原理，对axios进行一次catch捕获并返回状态值即可，建议返回json格式对象并附上标识。
    - 如果想带错误信息，也可以把错误信息带上，这样的话，await就不会报错，因为```Promise```对象的处理结果不是抛出一个错误，而是抛出一个json了。

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
    -  all中所有的Promise都走resolve则走then，有一个走reject就走catch。
* Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。
* 需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
* 问：使用Promise.all处理多条请求时(假如发送请求使用的是axios)，如果有一条请求失败了，则会走到catch中，只能得到一个失败的结果，那怎么才能得到其他成功了的结果呢？
    - 答：all的特性是所有的都成功才会走then，那么只要想办法让axios不返回失败就可以了。只需对axios进行catch捕获即可。
* 问：我对axios进行了二次封装，封装时是先走的catch，然后走的then。会导致什么问题？
    - 二次封装核心代码如右所示：```return axios(opts).catch(res=>res).then(res=>res)```。
    - 答：Promise.all时，二次封装的接口即使404了，也会走进then里。不会走到catch里。其实只要对接口错误进行了捕获(catch)，就不会走进Promise.all的catch里了。

# Promise.race
* 顾名思义，Promse.race就是赛跑的意思，意思就是说，```Promise.race([p1, p2, p3])```里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

# Promise库
https://github.com/petkaantonov/bluebird/

# 自问自答
* 问题1：await时怎么防止Promise抛错。
    - 答：对Promise进行catch操作，并返回结果。
* 问题2：Promise.all中的Promise什么情况下会走进Promise.all的catch中。
    - 答：只要有一个失败了就会走进去。如果这些失败全被Promise.all中的Promise捕获了(catch)，则不会走进catch，而是会走进then。

# axios的两种二次封装方式
* 二次封装方式1、
    - axios外套一层普通函数，在函数中```return axios.catch().then()```。
    - catch时返回的状态设置为error(请求错误或响应错误，即响应状态非200)。
    - then时，请求成功且业务成功状态设置为success。请求成功且业务失败状态设置为failure。
    - 如此封装方式，相当于```二次封装方式2、```全都走resolve并设置对应状态。
* 二次封装方式2(推荐)、
    - 外部套一层new Promise进行axios的二次封装即可.
    - 请求成功且业务成功走resolve。状态设置为success(请求成功，业务成功)。
    - 请求成功但是业务失败走reject。状态设置为failure(请求成功，业务失败)。
    - 请求错误走reject。状态设置为error(请求错误或响应错误，即响应状态非200)。

# ```二次封装方式1、```的优劣势
* ```二次封装方式1、```优点：
    - 2、以Promise的方式使用时，遇到ajax请求完之后需要改变开关的场景时，只需要在then中都处理开关状态。
* ```二次封装方式1、```弊端：
    - 1、Promise.all如果遇到失败的请求，在catch中捕获不到。需要在then中对数据进行二次状态判定。
    - 2、使用Promise触发请求时，无论成功和失败都会走到then中，每条请求都需要在then中对数据进行二次状态判定。
    - 3、两种方式使用async/await时都需要对数据进行二次状态判定。但是此种封装方式，使用Promise时，在then中也需要对数据进行二次状态判定。


# ```二次封装方式2、```的优劣势
* ```二次封装方式2、```优点：
    - 1、Promise.all如果遇到失败的请求，可以在catch中捕获到。
    - 2、Promise的then中只会出现成功的请求，失败的不会走进去。所以不用做多余的if判断。
* ```二次封装方式2、```弊端：
    - 1、以Promise的方式使用时，遇到ajax请求完之后需要改变开关的场景时，需要在then和catch中都处理开关状态。如果使用async/await的方式，则此弊端可忽略。

# 后续开智补充
* 接口请求失败直接输入Error(错误)`Promise.reject(new Error(message))`。
* 如此操作，接口若是出错，await会返回一个抛错，相关代码就不会继续往下走。
* 相关代码能继续往下走就说明请求是成功的。如此就没必要做多余的条件判断了。
