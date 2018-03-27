# BFC定义：
* 块格式化上下文（Block Formatting Context，BFC），它决定了块级元素如何对它的内容进行布局，以及与其他元素的关系和相互关系
* 块级元素：父级（是一个块元素）
* 内容：子元素（是一个块元素）
* 其他元素：与内容同级别的兄弟元素
* 相互作用：BFC里的元素与外面的元素不会发生影响

# BFC特性：
* 生成BFC元素的子元素中，每一个子元素左右外边距与包含块的左右边界接触。
    - 第一个子元素的上边距和最后一个子元素的下边距也是与包含块的上下边界接触
    - 默认父级里的第一个元素的margin-top会传递给父级，而不是撑开父级
    - 父级触发了BFC，margin就不会传递给父级了，而是撑开父级
* 同一个BFC内，子元素上下margin会发生折叠
    - 默认取绝对值大的那个
    - 不想折叠的话，只需要给子级设置display:inline-block或者float为left都可以解决
    - 注意：加overflow:hidden虽然可以触发BFC，但是解决不了折叠问题
* BFC可以包含浮动的元素，所以计算BFC高度时，浮动元素也参与计算。
    - 受欢迎的.clearfix:after可以清除浮动
    - 但是通过BFC也可以清除浮动，只需要给父级加overflow:hidden，加完之后父级就会包裹着子元素
* BFC的区域不会与float的元素区域重叠，BFC可以阻止元素被浮动元素覆盖
    - 给图片加浮动，可以做文字环绕图片效果，给文字容器加overflow:hidden;可以去掉文字环绕效果
* BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。
    - 解决折叠问题就是根据这个原理做的

# 我们在写css常见的一些问题都可以由BFC特性推出，例如：
* Block元素与父元素同宽，所以Block元素竖直方向上垂直排列。
* 竖直方向上有的Block元素margin会重叠，水平方向不会。
* 浮动元素会尽量接近左上方或右上方。
* 为父元素设置overflow:hidden或浮动父元素，则父元素会包含其浮动的子元素。

# 触发BFC：
* html根元素或包含html根元素的元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible