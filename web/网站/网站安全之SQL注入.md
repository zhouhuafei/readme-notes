# 原理
通过把SQL命令用户写入提交的数据中，改变代码原有SQL语句的语义，从而达到控制服务器执行恶意的SQL命令，导致可写入任意SQL语句并执行

# 案例
* 例如想查询用户名为```'zhouhuafei'```且```sex='man'```信息。
* 结果查询条件```'zhouhaufei'```因为SQL注入变成了```'' or 1=1 #'```(用户输入```' or 1=1 #```)。
* 查询时，得到的sql语句是：```select * from users where username='' or 1=1#' and sex='man';```。
* ```#```和```--```可以注释掉后面的一行SQL代码，相当于去掉了一个where条件。
    - 所以，以上等价于```select * from users where username='' or 1=1;```。
    - 因1==1永远成立，即where子句总是为真，将该sql进一步简化之后。
    - 等价于如下select语句：```select * from users;```。
    - 该sql语句的作用是检索users表中的所有字段。
* 假如你只想删指定的某一条信息。但是被注入了```' or 1=1 #```之后就会导致删除全部数据。

# 防御
* 1.永远不要信任用户的输入。对用户的输入进行校验，可以通过正则表达式，或限制长度；对单引号和双"-"以及"#"进行转换等。
* 2.永远不要使用动态拼装sql，可以使用参数化的sql或者直接使用存储过程进行数据查询存取。
* 3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
* 4.不要把机密信息直接存放，加密或者hash掉密码和敏感的信息。
* 5.应用的异常信息应该给出尽可能少的提示，最好使用自定义的错误信息对原始错误信息进行包装。
* 6.sql注入的检测方法一般采取辅助软件或网站平台来检测，软件一般采用sql注入检测工具jsky,网站平台就有亿思网站安全平台检测工具。
* 总结：建议使用成熟的mysql操作框架来防止注入。

# nodejs使用mysql防止注入
https://github.com/mysqljs/mysql
* 方法一：使用escape()对传入参数进行编码：
> 参数编码方法有如下三个：
```
mysql.escape(param)
connection.escape(param)
pool.escape(param)
```
> 案例：
```
var userId = 1, name = 'test';
var query = connection.query('SELECT * FROM users WHERE id = ' + connection.escape(userId) + ', name = ' + connection.escape(name), function(err, results) {
  // ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test';
```
* 方法二(个人偏爱这个语法)：使用connection.query()的查询参数占位符：
```
var post = {userId: 1, name: 'test'};
var query = connection.query('SELECT * FROM users WHERE ?', post, function(err, results) {
  // ...
});
console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test';
```
* 方法三：使用escapeId()编码SQL查询标识符：
    - 如果你不信任用户传入的SQL标识符（数据库、表、字符名），可以使用escapeId()方法进行编码。最常用于排序等。
    - escapeId()有如下三个功能相似的方法：
    ```
    mysql.escapeId(identifier)
    connection.escapeId(identifier)
    pool.escapeId(identifier)
    ```
    - 案例：
    ```
    var sorter = 'date';
    var sql  = 'SELECT * FROM posts ORDER BY ' + connection.escapeId(sorter);
    connection.query(sql, function(err, results) {
     // ...
    });
    ```
* 方法四：使用mysql.format()转义参数：
    - 准备查询，该函数会选择合适的转义方法转义参数```mysql.format()```用于准备查询语句，该函数会自动的选择合适的方法转义参数。
    - 案例：
    ```
    var userId = 1;
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['users', 'id', userId];
    sql = mysql.format(sql, inserts); // SELECT * FROM users WHERE id = 1;
    ```

# nodejs使用mongoDB防止注入
https://github.com/Automattic/mongoose
* 建议是用成熟的框架。例如mongoose。内部包含防注入机制。

# 总结
* 总之就是不要相信用户输入的任何信息。要对用户信息进行过滤。得到自己期望的信息才去进行数据库操作。
