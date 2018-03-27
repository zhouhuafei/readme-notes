# BFC定义：
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

# BFC布局规则：
* 生成BFC元素的子元素会一个接着一个放置。垂直方向上他们的起点是一个包含块的顶部，两个相邻子元素之间的垂直距离取决于元素的margin特性。在BFC中相邻的块级元素外边距会折叠，同属一个BFC的两个相邻Box的margin会发生重叠。
* 生成BFC元素的子元素中，每一个子元素左外边距与包含块的左边界接触，即使浮动元素也是如此（除非这个子元素自身也是一个浮动元素）。
* BFC的区域不会与float的元素区域重叠。
* 计算BFC高度时，浮动元素也参与计算。
* BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。

# 触发BFC：
* html根元素或包含html根元素的元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible