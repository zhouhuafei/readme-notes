# 微信小程序语法高亮
* 配置路径：File -> Settings -> Editor -> File Types
* wxml走xml或html的模板
* wxss走scss或css的模板

# 微信小程序语法提示
* https://github.com/miaozhang9/wecharCodejar
* 希望后续WebStorm官方可以提供微信小程序的语法支持。
    - 插件市场：WebStorm插件市场有一款名为```WeChat weapp Support```的插件，可以让WebStorm支持微信小程序js相关的api提示。
* 如果开发微信小程序的话，```HBuilderX编辑器```的语法提示做的就非常完善。
* 微信开发者工具的提示最是完善，毕竟是本家的工具。

# eslint
* 如果没开启es6，使用const定义变量时，eslint检测工具会报错：```Const definitions are not supported by current JavaScript version```

# 快捷键
* ```Alt + J```可以选中多个相同的字符串，和sublime的Ctrl+D的作用一样。
* ```Ctrl + Shift + U```光标所在位置大小写转换。

# WebStorm做Vue项目时卡顿，加了内存条变成16G内存还是卡。
* 找到WebStorm.exe.vmoptions这个文件。
* 第二行和第三行更改为：
    ```
    -Xms128m
    -Xmx1024m
    ```
* 重启。
* 亲测无效，于是我下载了最新版的WebStorm，发现居然神奇的不卡了。

# php高亮
* 偏好设置 -> Editor -> File Types
* 找到PHP那一项
* 增加*.php

# 破解
> 2018.3.5
* 1、hosts
```
0.0.0.0 account.jetbrains.com
0.0.0.0 www.jetbrains.com
```
* 2、Activation code
```
4RULSIH54N-eyJsaWNlbnNlSWQiOiI0UlVMU0lINTROIiwibGljZW5zZWVOYW1lIjoiMjA5OSAxODExIiwiYXNzaWduZWVOYW1lIjoiIiwiYXNzaWduZWVFbWFpbCI6IiIsImxpY2Vuc2VSZXN0cmljdGlvbiI6IkZvciBlZHVjYXRpb25hbCB1c2Ugb25seSIsImNoZWNrQ29uY3VycmVudFVzZSI6ZmFsc2UsInByb2R1Y3RzIjpbeyJjb2RlIjoiSUkiLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifSx7ImNvZGUiOiJBQyIsInBhaWRVcFRvIjoiMjAxOS0xMS0yNyJ9LHsiY29kZSI6IkRQTiIsInBhaWRVcFRvIjoiMjAxOS0xMS0yNyJ9LHsiY29kZSI6IlBTIiwicGFpZFVwVG8iOiIyMDE5LTExLTI3In0seyJjb2RlIjoiR08iLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifSx7ImNvZGUiOiJETSIsInBhaWRVcFRvIjoiMjAxOS0xMS0yNyJ9LHsiY29kZSI6IkNMIiwicGFpZFVwVG8iOiIyMDE5LTExLTI3In0seyJjb2RlIjoiUlMwIiwicGFpZFVwVG8iOiIyMDE5LTExLTI3In0seyJjb2RlIjoiUkMiLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifSx7ImNvZGUiOiJSRCIsInBhaWRVcFRvIjoiMjAxOS0xMS0yNyJ9LHsiY29kZSI6IlBDIiwicGFpZFVwVG8iOiIyMDE5LTExLTI3In0seyJjb2RlIjoiUk0iLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifSx7ImNvZGUiOiJXUyIsInBhaWRVcFRvIjoiMjAxOS0xMS0yNyJ9LHsiY29kZSI6IkRCIiwicGFpZFVwVG8iOiIyMDE5LTExLTI3In0seyJjb2RlIjoiREMiLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifSx7ImNvZGUiOiJSU1UiLCJwYWlkVXBUbyI6IjIwMTktMTEtMjcifV0sImhhc2giOiIxMTA3MzgwNy8wIiwiZ3JhY2VQZXJpb2REYXlzIjowLCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-rlH9JbPzbld/Oak51Co3HlhD6xgE7CsvbrLl6RCySuv2sw37KBfDPY1PT2lAEkW0MJkUtGtmSHVp/jk8F4RuHGvouJFMdCtnsKdnebdjaPsKpjgxoreWlOu8VCnrGh+3mmuswzGKouw52ffxbmsvGFa5ybvWv7mj9gqSY0V20OcgCmIT3dlj4f9xc0iA9o7z1pvedVzcOrxVKvLmmqRp+4zMfNuMQB5sraznW9BxslR1sWN0pUOu9/J+k7IH6Wld/oGv5dtHYFqk5RinSBMTjYlZ+X4AV5f83Z4SkzbHqy2fGC6S3NoifaVFxRSP5TQDe6hsg7Fzic6k1iWAup89pg==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO/5oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/78TmVqFl8nOeD5+07B8VEaIu7c3E1N+e1doC6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSVq9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxFjnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQAF8uc+YJOHHwOFcPzmbjcxNDuGoOUIP+2h1R75Lecswb7ru2LWWSUMtXVKQzChLNPn/72W0k+oI056tgiwuG7M49LXp4zQVlQnFmWU1wwGvVhq5R63Rpjx1zjGUhcXgayu7+9zMUW596Lbomsg8qVve6euqsrFicYkIIuUu4zYPndJwfe0YkS5nY72SHnNdbPhEnN8wcB2Kz+OIG0lih3yz5EqFhld03bGp222ZQCIghCTVL6QBNadGsiN/lWLl4JdR3lJkZzlpFdiHijoVRdWeSWqM4y0t23c92HXKrgppoSV18XMxrWVdoSM3nuMHwxGhFyde05OdDtLpCv+jlWf5REAHHA201pAU6bJSZINyHDUTB+Beo28rRXSwSh3OUIvYwKNVeoBY+KwOJ7WnuTCUq1meE6GkKc4D/cXmgpOyW/1SmBz3XjVIi/zprZ0zf3qH5mkphtg6ksjKgKjmx1cXfZAAX6wcDBNaCL+Ortep1Dh8xDUbqbBVNBL4jbiL3i3xsfNiyJgaZ5sX7i8tmStEpLbPwvHcByuf59qJhV/bZOl8KqJBETCDJcY6O2aqhTUy+9x93ThKs1GKrRPePrWPluud7ttlgtRveit/pcBrnQcXOl1rHq7ByB8CFAxNotRUYL9IF5n3wJOgkPojMy6jetQA5Ogc8Sm7RG6vg1yow==
```
> 2019.1.3
* 我升级到2019.1.3之后，上述的破解方式无效了。我进行了如下操作。
    - 1、把上述第一步的hosts去掉。
    - 2、把网断掉。
    - 3、执行上述的第二步操作。
    - 4、再联网即可。
    - 弊端：重启WebStorm，需要重新走上述流程。
* 其他解决方案：版本回退。
    - 去WebStorm官网，下载2018.3.6版本的WebStorm，然后按照2018.3.5的方式进行2018.3.6的破解即可。
    - 其他版本的下载网址：https://www.jetbrains.com/webstorm/download/other.html
> 2019.2.1
* 破解：
    - 暂时没破解，使用的试用码。
    - 试用码地址：http://idea.lanyus.com/

# WebStorm全局搜索搜索不全了
* 删掉```.idea```文件夹，使用WebStorm重新打开项目，让WebStorm重新扫描文件夹即可。
    - 亲测无用。
    - 解决方案：安装最新版本，我的版本由2018.3.5变为了2019.2.1。

# Emmet的css简写不能用了，提示的不符合我的预期。
* 解决方案：
    - `Editor > Emmet > CSS`。
    - 第1、2、4项全部勾选即可。

# 设置js代码风格
* 位置
    - `Editor > Code Style > JavaScript`
    - `Punctuation选项`和`Spaces选项`
* 快捷设置方式
  - `Editor > Code Style > JavaScript > Set from > Predefined Style > JavaScript Standard Style | Google JavaScript Style Guide`
* `Code Style`导出和导入
  - 导出：`Editor > Code Style > 设置图标 > Export > Intellij IDEA code style XML`
  - 导入：`Editor > Code Style > 设置图标 > Import Scheme > Intellij IDEA code style XML`
  - 我的个人配置：`./WebStorm-CodeStyle.xml`
