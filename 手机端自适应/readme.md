# 手机端自适应
* meta - 放在head标签里
```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```
* dpr - 放在head的结束标签之前（个人不建议使用，我着实没发现它有什么卵用）
```
<script>
    (function () {
        var viewport = document.querySelector('meta[name=viewport]');
        var dpr = window.devicePixelRatio;
        var scale = 1 / dpr;
        var content = 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
        document.querySelector('html').setAttribute('data-dpr', dpr);
        viewport.setAttribute('content', content);
    })();
</script>
```
* rem - 放在class为g-wrap的开始标签之后，这里的g-wrap你可以看成是body标签
```
<script>
    (function (win, doc) {
        function isPc() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        function resize() {
            var html = doc.querySelector('html');
            var wrap = doc.querySelector('.g-wrap');
            if (isPc()) {
                html.classList.add('.g-pc');
            } else {
                html.classList.remove('.g-pc');
            }
            html.style.fontSize = wrap.offsetWidth / 10 + 'px';
        }

        resize();
        win.addEventListener('resize', resize);
    }(window, document));
</script>
```
# 吐槽dpr
* 我着实不知道这个dpr加上缩放有什么卵用，还会增加一些不必要的负担，例如商详页的商品描述一般都是别的地方转过来的数据，里面的数据自带标签还有字体大小单位是px，经过dpr缩放几倍之后，看起来会很小，还有通过dpr进行放大，恶不恶心。图片倒是还好，加个最大 宽度10rem就醒了（这里的10是个人分割的，根据你自己的分割情况而定，为什么用10rem，不用100%，因为有些div标签自带宽度很宽很宽，超过了最大宽度，你100%就失去了意义，只有10rem可以解决）
* 说高清吧，确实会高清，但是也是在没有给图片加rem的情况下，例如iphone4，设备屏幕物理像素是640x940px，css像素是320x480px，dpr是2，我设置了dpr缩放0.5倍之后，body的宽度变成了640和设备的物理像素一致了，一张css像素为375px的图片，看起来确实更清晰一些，但是这种高清有个卵用？图片不能自适应了，如果我想让用户传最大为750px的图，那用户传的375px是不是就是5rem，当我给图片设置5rem的宽度，图片展示起来又不是高清了，那我要dpr有个卵用？
* 这里的dpr我个人是没有加的,在此仅作为记录，万一有什么奥妙是我没有参悟透彻的呢，还请有谁知道这个dpr有什么卵用的高级玩家大发善心帮我详细解释一下，最好是验证过的，因为我没验证出来到底有什么卵用。
* 我最后的最后又验证了下使用背景，发现同样清晰，最后又重新验证了一下图片，发现还是清晰，我个人得出的结论是dpr没什么卵用。dpr没什么卵用。dpr没什么卵用。
* 最后的最后再最后，我发现清晰和图片的缩放比例有关，因为即使我使用了dpr，调小图片的宽度，它依然会有时清晰有时不清晰，可能也和谷歌浏览器的渲染机制有关吧，因为我是用谷歌浏览器模拟测试的。
* 最最最最最最最最后，我又用小米mix2测试了一下，发现加或者不加dpr都是清晰的，懒得继续测试了，就这样吧，不了了之吧。
* 最最最最最最最最最最最后，还是想吐槽一句，dpr没卵用。