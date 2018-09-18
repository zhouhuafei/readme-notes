```
<style>
    div {
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        position: relative;
    }
</style>
<div>
    <section>section</section>
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

# 方式4
```
div {
    line-height: 100px;
    text-align: center;
}

section {
    display: inline-block;
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

# 方式6
```
div {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
```
