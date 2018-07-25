# rem了解
* 1rem默认大小是16px，因为浏览器里，html页面，根节点的默认字体大小是16px。
* 因chrome浏览器限制页面的最小字体是12px。
    - font-size为0px，字体会隐藏，这是浏览器共同的特性。
    - safari浏览器字体最小可以设置为1px。
    - mac的2倍屏上，chrome浏览器，字体最小可以设置为6px。(此时浏览器的高级设置里，默认字体的最小字体设置是6px)。
    - mac的2倍屏上，chrome浏览器，字体最小可以设置为12px。(此时浏览器的高级设置里，手动将字体的最小字体设置为12px)。
    - win的1倍屏上，chrome浏览器，字体最小可以设置为6px。(此时浏览器的高级设置里，默认字体的最小字体设置是6px)。
    - win的1倍屏上，chrome浏览器，字体最小可以设置为12px。(此时浏览器的高级设置里，默认字体的最小字体设置是12px)。
    - 以上可得：浏览器可设置的最小字体大小和几倍屏无关。
* 所以给html设置字体大小时，最小不能小于12px。
* 因此js计算rem时，动态分割成10份，保证每份不会小于12px。
* js计算rem动态分割成10份的计算公式(个人倾向这个)。
    - js计算公式
    ```
        html.style.fontSize = wrap.offsetWidth / 10 + 'px';
    ```
    - scss的px2rem计算公式
    ```
        @function px2rem($px,$psd:320) {
            @return $px / $psd * 10rem;
        }
    ```
* js计算rem的最佳解决方案(这个更适合那些不会使用scss的玩家，这个切换到其他宽度设备上，html的font-size，看起来不直观)。
    - 动态分割成100份，1rem等于1px，给html设置font-size:1px，此时无效。
    - 动态分割成设计图宽度的份数（此处假设设计图宽度是320px），再放大100倍，这样1rem就是100px，给html设置font-size:100px，此时有效且方便计算以及更直观的体现计算后的数值。
    - js计算公式 -> html的font-size = 网站最大宽度 / 设计图宽度 * 100
    ```
        html.style.fontSize = wrap.offsetWidth / 320 * 100 + 'px';
    ```
    - scss的px2rem计算公式 -> px2rem = $px / (设计图宽度 / 默认设计图宽度 * 100)
    ```
        @function px2rem($px,$psd:320) {
            $defaultPsdW: 320;
            @return $px / ($psd / $defaultPsdW * 100) * 1rem;
        }
    ```
    - 默认设计图宽度，为什么有这个，因为以前遇到过前期375px，后期750px的设计图，所以此处做了兼容处理，当然如果你遇到这种情况，完全可以重新封装一个px2rem2b函数。

# 写手机端自适应页面时的注意事项
* 例如设计图是750px，我们要兼容的最小屏宽是320px。
* 我们会用js计算，把屏幕均分10份，1rem就是75px，那为什么我们不为了好计算，分成750份呢？
    - 假设此时屏幕宽度是750，分成了750份，那么给html设置的font-size就是1px，1rem就是1px。（埋坑）
    - 假设此时屏幕宽度是320，分成了750份，那么给html设置的font-size就是0.4266666666666667px，1rem就是0.4266666666666667px。（埋坑）
    - 此时问题出现了，因浏览器限制html的最小字体是12px，所以给html设置的font-size如果小于12px，则都是不生效的，此时1rem其实是12px。（跳坑）
    - 此时，你的布局就会出现问题。例如容器被放大，导致布局错乱。
* 均分的时候要保证，最小屏上html的font-size要不小于12px。
* 所以你均分为10份或者20份，都可以。毕竟最小屏320均分为20份，得到的值也是大于12的，但是如果均分之后这个值小于12，则你的均分份数就是有问题的。

# 均分10份
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
