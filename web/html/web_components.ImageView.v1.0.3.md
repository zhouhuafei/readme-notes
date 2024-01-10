## 目的
* 基于腾讯云，统一处理图片的src，使之支持图片裁切、旋转、水印等。

## 引入
* 在head标签中引入依赖文件
```html
<script src="https://static.xxynet.com/common/js/ImageView.v1.0.3.js"></script>
```

## 在vue2中使用
#### 在main.js中增加
```javascript
Vue.prototype.$imgSrc = window.cjdgUtils.imgSrc.bind(window.cjdgUtils)
```
#### 使用工具方法
```html
<img :src="$imgSrc({src:item.src,width:100})" />
```
#### 使用image-view组件
```html
<image-view :src="item.src" width="100" />
```

## 注意事项
* 1、不管是工具方法还是image-view组件。其参数width和height仅对src内的/w/和/h/生效。
* 2、老项目中可能对img标签有样式控制，我们换了标签后，需要把css也修改掉，否则样式会丢失。使用image-view组件时会存在此问题，使用工具方法时不存在此问题。
  - 方案1：
  ```scss
  .parent img {
    width: 100px;
    height: 100px;
  }
  // 把上述改为
  .parent image-view {
    width: 100px;
    height: 100px;
  }
  ```
  - 方案2：
  ```scss
  .parent img {
    width: 100px;
    height: 100px;
  }
  // 把上述改为
  .parent .img {
    width: 100px;
    height: 100px;
  }
  // 然后给image-view增加class="img"
  ```

## 参数说明
> 工具方法和image-view组件的参数是统一的，均支持下述参数。
* 1、dpr：苹果系统需要使用2倍图或3倍图。仅对src内的/w/和/h/生效。
  - 未设置dpr参数时，会自动适配。
  - 若手动设置了dpr参数，则以手动设置的为准。
* 2、type默认为normal，若width和height都设置了，则会对图片进行等比缩放，居中裁剪。
  - 支持仅设置width或height，mode默认为1，会自动裁切出一个正方形。mode为0时，仅设置width则height自适应，反之亦然。
  - 图片基本处理（腾讯云官方文档）：https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2
* 3、type为cut时，width和height必填，若不填则全都默认100 * dpr。
* 4、type为rotate时，rotate必填，若不填则默认90。
* 5、type为watermark时，markText必填，若不填则无水印。
* 6、type为none时，不对图片的src进行任何处理。
* 7、image-view组件支持使用radius和round参数进行圆角设置，工具方法不支持。圆角的设置，建议在外部使用css处理，用以规避单位转换问题，例如px转rem、vw等。
* 8、使用image-view组件时，有时需要对其内部的img标签进行object-fit设置。此时，直接使用css给image-view进行object-fit设置即可。
