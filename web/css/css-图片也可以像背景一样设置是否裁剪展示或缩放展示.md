# 图片也可以像背景一样设置是否裁剪展示或缩放展示

### 适用于 图片img标签 视频video标签
> https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
* `object-fit`属性值：
  - fill
  - contain
  - cover
  - none
  - scale-down

### 适用于 背景
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size
* `background-size`属性值：
  - contain
  - cover
  - 100px 100px
  - 100% 100%
  - 除了`cover`不需要，其他都需要配合`background-repeat: no-repeat;`进行使用，否则背景会重复。
