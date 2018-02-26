* :nth-of-type(n)
    - 选择器匹配属于其父元素的第 N 个子元素, 元素的类型必须相同
* :nth-child(n)
    - 选择器匹配属于其父元素的第 N 个子元素，元素的类型可以相同
* 注意
    - 元素的类型相同指的是标签名相同，和class，id什么的没有任何关系，只和标签名称有关
    
* div p:nth-of-type(1)
    - 选择div的子元素里第一个p元素
* div p:nth-child(1)
    - 选择div的子元素里第一个元素，且这个元素必须是p元素
* div .p:nth-of-type(1)
    - 选择div的子元素里.p这个class对应的相同类型的第一个标签
    - 如下 h1是h1类型里的第一个 所以会被选中
    - p 是p类型里的第一个 所以会被选中
    - 所以和class无关，只和标签类型有关
    ```
    <!DOCTYPE html>
    <html>
        <head>
            <style> 
            .p:nth-of-type(1) {
                background:#ff0000;
            }
            </style>
        </head>
        <body>
            <h1 class="p">这个会被选中</h1>
            <p class="p">这个会被选中。</p>
            <p class="p">第二个段落。</p>
            <p>第三个段落。</p>
            <p>第四个段落。</p>
            <p>第五个段落。</p>
        </body>
    </html>
    ```