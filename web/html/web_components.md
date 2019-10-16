> ###### 教程：http://www.ruanyifeng.com/blog/2019/08/web_components.html
> ###### 文档：https://developer.mozilla.org/zh-CN/docs/Web/Web_Components

# 案例 - 定义组件 - js创建dom
```
<body>
  <user-card></user-card>

  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();

        var image = document.createElement('img');
        image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
        image.classList.add('image');

        var container = document.createElement('div');
        container.classList.add('container');

        var name = document.createElement('p');
        name.classList.add('name');
        name.innerText = 'User Name';

        var email = document.createElement('p');
        email.classList.add('email');
        email.innerText = 'yourmail@some-email.com';

        var button = document.createElement('button');
        button.classList.add('button');
        button.innerText = 'Follow';

        container.append(name, email, button);
        this.append(image, container); // this表示自定义元素实例。
      }
    }

    window.customElements.define('user-card', UserCard);
  </script>
</body>
```

# 案例 - 定义组件 - template
```
<body>
  <user-card></user-card>

  <template id="userCardTemplate">
    <style>
      /*:host伪类，指代自定义元素本身。*/
      :host {
        display: flex;
        align-items: center;
        width: 450px;
        height: 180px;
        background-color: #d4d4d4;
        border: 1px solid #d5d5d5;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }
      .image {
        flex: 0 0 auto;
        width: 160px;
        height: 160px;
        vertical-align: middle;
        border-radius: 5px;
      }
      .container {
        box-sizing: border-box;
        padding: 20px;
        height: 160px;
      }
      .container > .name {
        font-size: 20px;
        font-weight: 600; // 无效 值应为bold
        line-height: 1;
        margin: 0;
        margin-bottom: 5px;
      }
      .container > .email {
        font-size: 12px;
        opacity: 0.75;
        line-height: 1;
        margin: 0;
        margin-bottom: 15px;
      }
      .container > .button {
        padding: 10px 25px;
        font-size: 12px;
        border-radius: 5px;
        text-transform: uppercase;
      }
    </style>

    <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
    <div class="container">
      <p class="name">User Name</p>
      <p class="email">yourmail@some-email.com</p>
      <button class="button">Follow</button>
    </div>
  </template>

  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();

        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        this.appendChild(content);
      }
    }

    window.customElements.define('user-card', UserCard);
  </script>
</body>
```

# 自定义组件 - 入参
```

<body>
  <user-card
    image="https://semantic-ui.com/images/avatar2/large/kristy.png"
    name="User Name"
    email="yourmail@some-email.com"
  ></user-card>

  <template id="userCardTemplate">
    <style>...</style>

    <img class="image">
    <div class="container">
      <p class="name"></p>
      <p class="email"></p>
      <button class="button">Follow John</button>
    </div>
  </template>

  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();

        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        content.querySelector('img').setAttribute('src', this.getAttribute('image'));
        content.querySelector('.container>.name').innerText = this.getAttribute('name');
        content.querySelector('.container>.email').innerText = this.getAttribute('email');
        this.appendChild(content);
      }
    }

    window.customElements.define('user-card', UserCard);
  </script>
</body>
```

# Shadow DOM
> 我们不希望用户能够看到`<user-card>`的内部代码，`Web Component`允许内部代码隐藏起来，这叫做`Shadow DOM`，即这部分`DOM`默认与外部`DOM`隔离，内部任何代码都无法影响外部。
```
class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );

    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
  }
}

window.customElements.define('user-card', UserCard);
```
> 上面代码中，`this.attachShadow()`方法的参数`{ mode: 'closed' }`，表示`Shadow DOM`是封闭的，不允许外部访问。
* 注：经测试，加了`Shadow DOM`，内部代码通过`查看元素`，依然可以看到。不过加了`Shadow DOM`之后，会出现一些其他特性，具体请看下述完整示例。

# 完整示例
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>web_components</title>
        <style>
            /* 覆盖组件样式(加或者不加Shadow DOM，此行一直有效) */
            user-card {
                /* 不加Shadow DOM，需要!important才生效。加了Shadow DOM不需要!important也生效。 */
                border-color: #ff0000 !important;
            }

            /* 覆盖组件样式(加了Shadow DOM则此行无效，不加Shadow DOM则此行有效) */
            user-card .container > .email {
                color: #ff0000;
            }

            /* 总结：加了Shadow DOM，无法覆盖user-card内部子元素的样式，user-card本身的样式可以被覆盖 */
        </style>
    </head>
    <body>
        <user-card
            image="https://semantic-ui.com/images/avatar2/large/kristy.png"
            name="User Name"
            email="yourmail@some-email.com"
        >
            <p>no name slot - My different text</p>
            <p slot="my-text">has name slot - My different text</p>
            <!--
            Vue中
            不管slot有没有name属性，只要slot中有内容(后备内容)，就会默认展示。
            Web Components中
            slot有name属性且有slot中有内容(后备内容)，才会默认展示。
            -->
        </user-card>

        <template id="userCardTemplate">
            <style>
                /* :host伪类，指代自定义元素本身。(加Shadow DOM，:host有效。不加Shadow DOM，:host无效)。 */
                /* 没加Shadow DOM时，此处的:host无效，我换成user-card就有效了 */
                :host {
                    display: flex;
                    align-items: center;
                    width: 500px;
                    background-color: #d4d4d4;
                    border: 1px solid #d5d5d5;
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    padding: 10px;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                p {
                    margin: 0;
                }

                /* 以下有效 */
                .image {
                    flex: 0 0 auto;
                    width: 160px;
                    vertical-align: middle;
                    border-radius: 5px;
                }

                .container {
                    box-sizing: border-box;
                    padding: 20px;
                }

                .container > .name {
                    font-size: 20px;
                    font-weight: 600; // 无效 值应为bold
                    line-height: 1;
                    margin-bottom: 5px;
                }

                .container > .email {
                    font-size: 12px;
                    opacity: 0.75;
                    line-height: 1;
                    margin-bottom: 15px;
                }

                .container > .button {
                    padding: 10px 25px;
                    font-size: 12px;
                    border-radius: 5px;
                    text-transform: uppercase;
                }
            </style>

            <img class="image">
            <div class="container">
                <p class="name"></p>
                <p class="email"></p>
                <button class="button">Follow John</button>
                <slot><p>no name slot - My default text</p></slot>
                <slot name="my-text"><p>has name slot - My default text</p></slot>
            </div>
        </template>

        <script>
            class UserCard extends HTMLElement {
                constructor() {
                    super();

                    var shadow = this.attachShadow({mode: 'closed'});

                    var templateElem = document.getElementById('userCardTemplate');
                    var content = templateElem.content.cloneNode(true);
                    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
                    content.querySelector('.container>.name').innerText = this.getAttribute('name');
                    content.querySelector('.container>.email').innerText = this.getAttribute('email');

                    shadow.appendChild(content);
                }

                connectedCallback() {
                    console.log('connectedCallback：Custom square element added to page.');
                }

                disconnectedCallback() {
                    console.log('disconnectedCallback：Custom square element removed from page.');
                }

                adoptedCallback() {
                    console.log('adoptedCallback：Custom square element moved to new page.');
                }

                attributeChangedCallback(name, oldValue, newValue) {
                    console.log('attributeChangedCallback：Custom square element attributes changed.');
                }
            }

            window.customElements.define('user-card', UserCard);
        </script>
    </body>
</html>
```

# 其他
* 上面的例子中，`<template>`与网页代码放在一起，其实可以用脚本把`<template>`注入网页。这样的话，`JavaScript`脚本跟`<template>`就能封装成一个`JS`文件，成为独立的组件文件。网页只要加载这个脚本，就能使用`<user-card>`组件。
    - 使用js创建`template标签`并填入页面即可。
* 支持使用`slot`。
    - 定义时
    ```
    <template id="userCardTemplate">
      <slot name="my-text"><p>My default text</p></slot>
    </template>
    ```
    - 使用时
    ```
    <user-card>
      <ul slot="my-text">
        <li>Let's have some different text!</li>
        <li>In a list!</li>
      </ul>
    </user-card>
    ```
* 生命周期
    - connectedCallback：当 custom element首次被插入文档DOM时，被调用。
    - disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
    - adoptedCallback：当 custom element被移动到新的文档时，被调用。
    - attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
    ```
    class MyOtherCustomElement extends HTMLElement  {
      constructor() {
        super();
        //......
      }

      connectedCallback() {
        console.log('connectedCallback：Custom square element added to page.');
      }

      disconnectedCallback() {
        console.log('disconnectedCallback：Custom square element removed from page.');
      }

      adoptedCallback() {
        console.log('adoptedCallback：Custom square element moved to new page.');
      }

      attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback：Custom square element attributes changed.');
      }
    }
    ```
