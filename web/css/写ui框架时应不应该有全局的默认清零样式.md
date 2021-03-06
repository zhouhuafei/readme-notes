> 使用scss进行css的预编译

# 业界主流ui框架css文件对比。
* ```ant-design```
    - 有大量全局的清零样式。也有对组件的清零样式。
    - 全局的清零样式中把所有标签都设置成了```box-sizing: border-box;```。
    ```
    *,
    *::before,
    *::after {
      box-sizing: border-box; // 1
    }
    ```
    - 有全局的```font-family```。
    - 好处：不需要每个组件都进行样式重置。
    - 坏处：和用户样式冲突的几率增大。
* ```element```
    - 无全局的清零样式。清零样式是针对每个组件单独做的。
    - 无全局的```font-family```。
    - 好处：和用户样式冲突的几率降低。
    - 坏处：需要每个组件都进行样式重置。
* ```mint-ui```
    - 无全局的清零样式。清零样式是针对每个组件单独做的。
    - 无全局的```font-family```。
    - 好处：和用户样式冲突的几率降低。
    - 坏处：需要每个组件都进行样式重置。
* ```vant```
    - 有少量全局的清零样式。也有对组件的清零样式。
    - 无全局的```font-family```。
    - 好处：和用户样式冲突的几率降低。
    - 坏处：降低的不够彻底。

# 个人总结
> ui样式应该和用户的清零样式以及其他样式完全解耦，尽最大努力做到互不影响。所以我认为应该遵守以下规则。
* 1、无清零样式或者清零样式局部化。哪个组件需要清零样式就给哪个组件清。
    - 可使用scss的mixin或者占位符实现。个人建议使用占位符(可以编译出更少的css代码)。以下是占位符的案例。
    ```
    %reset-form-element {
      margin: 0;
      padding: 0;
      background: none;
      border: none;
      outline: none;
      color: inherit;
      line-height: inherit;
      font-size: inherit;
      font-family: inherit;
      vertical-align: middle;
    }
    
    %reset-font {
      color: #232323;
      font-size: 14px;
      line-height: 1;
    }
    
    %reset-a {
        color: inherit;
        outline: none;
        text-decoration: none;
    }
    
    %reset-img {
        border: none;
        vertical-align: middle;
        max-height: 100%;
        max-width: 100%;
    }
    ```
    - 在需要清零的地方使用即可。
    ```
    .g-btn {
        @extend %reset-form-element;
        @extend %reset-font;
    }
    ```
* 2、字体类型交给用户去控制。
* 3、设置默认的字体大小和字体颜色，但是不能设置给body，而是给每个组件单独设置。
    - 否则body的字体大小和字体颜色如果被覆盖了，则会导致ui中的字体大小和颜色全部变化。
* 4、给每个组件都设置行高为1。
    
# 如果用户需要使用清零样式，我个人建议使用normalize.css
https://github.com/necolas/normalize.css
