* 我把ajax请求的状态分为两种，分别是error和success。
    - error，即为响应出现错误，响应的状态不是200。
    - success，即为响应成功，响应的状态是200。不过这个成功又分为真成功succss和假成功failure。
* 请求发到服务端，服务端的响应状态是200就算是成功了。
    - 满足业务条件的成功就是success。
    - 不满足业务条件的成功就是failure。
    - 失败一般统一处理，成功了做成功之后各自的业务处理。
* 请求发送到服务端，服务端的响应状态不是200，即为出错了。
    - 出错了就是error。
    - 错误一般统一处理。
    - 常见的错误有404，500。
* ajax(XmlHttpRequest)的readyState状态为4就可以通过responseText获取到完整的数据了。
    - readyState状态为4对应xhr2中的load事件。
    - ajax,status状态为200时(这里其实就是服务端的响应状态)，即为成功，一般会在此时把responseText输出。此时就算是成功了，然后再细分为业务上的成功(success)和失败(failure)，如果内部出现数据库的查询错误，也算是业务上的失败。
    - ajax,status状态不是200(这里其实就是服务端的响应状态)，即为失败，一般不会把responseText输出。此时就算是error，常见的error也就是404和500了，其他错误，例如数据库查询的错误都按照失败(failure)处理。
    - 更多ajax细节，请自行查询ajax的原理，这里就不详述了。

# 总结:
* api请求的响应状态是200就算是成功，成功的状态又分为业务上的成功success和业务上的失败failure。
* api请求的响应状态不是200就算是出错了，出错的状态是error。

# 其他
* 封装ajax时，以下http状态的响应码均可认定为响应成功。
```
const isSuccess = status >= 200 && status < 300 || status === 304;
```
* xhr.open方法的第三参数默认为true。表示异步。如果设置为false。则表示是同步。
    - 不建议设置为false。

# axios
> axios在客户端使用的是xhr2
* 问：xhr2中，请求在进行到什么状态下会触发onload事件？
    - 答：xhr.readyState状态为4，表示响应已返回。此时会触发onload事件。
* 问：axios什么时候才算请求成功？
    - 答：axios在onload事件中处理方式是，HTTP状态码大于等于200且小于300就算请求成功，以下代码摘自axios源码。
    ```javascript
    const defaults = {
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    }
    ```
* 问：axios什么时候算请求失败？
    - 答：HTTP状态码小于200或大于等于300就算请求失败，请求失败会抛出错误信息```new Error('Request failed with status code')```。
* 问：xhr2的onerror事件什么时候会触发？
    - 例如没有网络或者跨域或者服务没启动就会触发请求错误，请求错误会抛出错误信息```new Error('Network Error')```。
