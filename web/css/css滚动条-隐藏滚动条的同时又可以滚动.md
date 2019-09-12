# 方案0
* 推荐这个。
* 方案1是不成熟的方案。
```
<style>
    .element, .outer-container {
        width: 200px;
        height: 200px;
    }

    .outer-container {
        position: relative;
        overflow: hidden;
    }

    .inner-container {
        position: absolute;
        left: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #999999;
    }
</style>
<div class="outer-container">
    <div class="inner-container">
        <div class="element">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
        </div>
    </div>
</div>
```

# 方案1
* 超出滚动高度加：```right: -17px;```。
    - 仅限pc。
    - 超出滚动高度再加此属性，否则宽度会增加```17px```。
```
<style>
    .wrap {
        width: 200px;
        height: 200px;
        overflow: hidden;
        background: #999999;
        position: relative;
    }

    .content {
        overflow-x: hidden;
        overflow-y: auto;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: -17px;
    }
</style>
<div class="wrap">
    <div class="content">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
    </div>
</div>
```

# 方案2
* 推荐这个。
```
<style>
    .wrap1 {
        overflow-x: hidden;
        overflow-y: auto;
        width: 200px;
        height: 200px;
        background: #999999;
    }

    .wrap1::-webkit-scrollbar {
        display: none;
    }
</style>
<div class="wrap1">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
</div>
```
