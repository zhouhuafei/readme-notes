> 使用scss进行css的预编译

# 案例
* element对比mint-ui对比vant
    - element和vant都有清零样式。
    - element和vant都有对body设置默认字体大小(可配置)。
    - element和vant都有对body设置默认字体颜色(可配置)。
    - element和vant都有对body设置默认字体类型(不可配置)。
    - element没对body设置默认行高。
    - vant对body设置的默认行高是1(不可配置)。
    
# 如果需要使用清零样式，建议使用normalize.css
https://github.com/necolas/normalize.css

# 个人总结
> ui样式应该和用户的清零样式以及其他样式完全解耦，尽最大努力做到互不影响。所以我认为应该遵守以下规则。
* 1、无清零样式或者清零样式局部化。哪个组件需要清零样式就给哪个组件清。
    - 可使用scss的mixin或者占位符实现。个人建议使用占位符(可以编译出更少的css代码)。以下是占位符的案例。
    ```
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
        @extend %reset-a;
    }
    ```
* 2、字体类型交给用户去控制。
* 3、设置默认的字体大小和字体颜色，但是不能设置给body，而是给每个组件单独设置。
    - 否则body的字体大小和字体颜色如果被覆盖了，则会导致ui中的字体大小和颜色全部变化。
* 4、给每个组件都设置行高为1。

# 我一度怀疑我的个人总结是否有点走偏了？
> ui框架是否应该有默认的全局清零样式？
* 答：不应该有。
    - 看了下```ant-design```。感觉思想和我的思想是一致的。
    - 清零应该是局部化的，应该是哪里需要清哪里。
    - https://github.com/ant-design/ant-design/
