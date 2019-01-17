# 为什么要使用签名cookie？
* 防止cookie被篡改。
    - 题外话：set-cookie时设置httponly为true可以防止客户端js读写cookie。

# 案例
* sessionID
    - set-cookie: connect.sid=s%3AxHCdrvtXDVAD-JVMtthhulD8K9TYRLGp.nNyRADwu0ESev2WihSBj388qIpWGD7QWHFTUmL48qO8; Path=/; Expires=Thu, 24 Jan 2019 15:32:53 GMT; HttpOnly
* 上述```s%3AxHCdrvtXDVAD-JVMtthhulD8K9TYRLGp```部分是cookie值，这个值是被加密过的。可以防止明文暴露sessionID。
* 上述```nNyRADwu0ESev2WihSBj388qIpWGD7QWHFTUmL48qO8```部分是签名，可以防止cookie值被篡改。

# 签名
* 1、在服务端以某个格式组合cookieValue和cookieSecret，然后进行MD5单向加密。
* 2、生成如下格式的cookie值：```cookieValue.cookieSigned```，然后响应到客户端。
* 3、接收到客户端请求的cookie时，服务端会把接收到的cookieValue和服务端的cookieSecret再次进行组合以及加密，如果得到的签名和接收到cookieSigned一致。则表示cookie未被篡改。


# 其他
* 服务端set-cookie时，响应头里可以看到格式如下：
    - set-cookie: key1=value1; Path=/
* 细节：
    - 结尾不带分号。
    - 服务端如果设置多条cookie。则响应头里会有多条set-cookie字段。
    ```
    set-cookie: key1=value1; Path=/
    set-cookie: key2=value2; Path=/
    ```
