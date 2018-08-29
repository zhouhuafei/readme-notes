```
div {
  width: 300px;
  height: 300px;
  background-color: blue; /* 通用 */
  background-color: red\9; /* IE6/IE7/IE8/IE9/IE10 */
  background-color: yellow\0; /* IE8/IE9/IE10 */
  +background-color: pink; /* IE6/IE7 */
  -background-color: orange; /* IE6 */
}
```
* 我个人常用如下，需要按照顺序书写。
    - "\9"
    - "\0"
    - "+"
    - "-"

hack我个人常用列表如下。

|   Hack常用	    |   写法                         |   兼容版本         |
|   :----       |   :----                       |   :----           |
|   \9          |   color: red\9;               | 	IE 6\7\8\9\10   |
|   \0          |   color: red\0;               | 	IE 8\9\10       |
|   +           |   +color: red;                | 	IE 6\7          |
|   -           |   -color: red;                | 	IE 6            |

hack其他列表如下。

|   Hack其他	    |   写法                         |   兼容版本         |
|   :----       |   :----                       |   :----           |
|   \9\0        |   color: red\9\0;             | 	IE 9\10         |
|   *           |   *color: red;                |   IE 6\7          |
|   #           |   #color: red;                | 	IE 6\7          |
|   _           |   _color: red;                | 	IE 6            |
|   !important  |   !important;color: green;    | 	IE 7\8\9\10     |
