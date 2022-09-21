# css-不定宽高垂直居中
```
<style>
div {
  width: 100px;
  height: 24px;
  line-height: 18px;
  color: #fff;
  font-size: 12px;
  background: #000;
  position: relative;
}

section {
  background: #f00;
}
</style>
<div>
  <section>字</section>
</div>
```

# 方式1
```
div {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# 方式2
```
div {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
```

# 方式3
```
section {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

# 方式4-1 - 如果section有内容 - 无独立高度
```
div {
  line-height: 24px;
  text-align: center;
}

section {
  display: inline-block;
}
```

# 方式4-2 - 如果section有内容 - 有独立高度 - 因section中有字，所以可以用line-height增加独立高度顺便实现居中
```
div {
  line-height: 24px;
  text-align: center;
}

section {
  display: inline-block;
  line-height: 12px;
}
```

# 方式4-3 - 如果section无内容（需要拿掉section中字） - 有独立高度 - 因section中无字，所以需要用更多的属性去实现居中
```
div {
  line-height: 24px;
  text-align: center;
  font-size: 0;
}

section {
  display: inline-block;
  width: 50%;
  height: 12px;
  vertical-align: middle;
}
```

# 方式5
```
div {
  text-align: center;
}

div:after {
  content: '';
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}

section {
  display: inline-block;
  vertical-align: middle;
}
```

# 方式6-1 - session为块元素 - session中有字
```
div {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

# 方式6-2 - session为块元素 - session中无字
```
div {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

section {
  width: 100%;
  height: 12px;
}
```

# 方式6-3 - session为内联块元素 - session中有字
```
div {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

section {
  width: 100%;
  height: 12px;
  line-height: 1;
  display: inline-block;
}
```

# 方式6-4 - session为内联块元素 - session中无字
```
div {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  font-size: 0;
}

section {
  width: 100%;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}
```

# 总结：如果内联块元素在垂直居中时存在上下间距的误差？
* 1、先尝试给内联块元素加`vertical-align: middle;`。
* 2、再尝试给其父级加`line-height: 1;`。
* 3、最后再尝试给其父级加`font-size: 0;`或`line-height: 0;`。
