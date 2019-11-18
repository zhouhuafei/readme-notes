```
(function (name, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') { // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // requirejs - amd canon
        define(factory);
    } else if (window) { // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('browserPlatform', function () {
    function isPc() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    return {
        isPc() {
            return isPc();
        },
        isH5() {
            return !isPc();
        },
        isWeiXin() {
            return navigator.userAgent.toLowerCase().match(/MicroMessenger/ig);
        },
        isAndroid() {
            return window.navigator.appVersion.match(/android/ig);
        },
        isIos() {
            return window.navigator.appVersion.match(/iphone/ig);
        },
    };
});
```
