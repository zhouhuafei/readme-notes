# rem了解
* 1rem默认大小是16px，因为浏览器里，html页面，根结点的默认字体大小是16px。
* 因浏览器限制页面的最小字体是12px。(高倍屏例外，高倍屏字体可以小于12px，即便如此，你也不能把字体设置的小于12px，毕竟一倍屏还是存在的，没被市场淘汰，你就需要兼容)。
* 所以给html设置字体大小时，最小不能小于12px。
* 因此js计算rem时，动态分割成10份，保证每份不会小于12px。

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
