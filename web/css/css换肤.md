# 只是更换主体容器的背景色，背景图，边框色之类的
* 给页面的最外层容器加肤色样式即可，图片用背景即可，方便快捷。
* 例如加
    - g-skin-red
    - g-skin-blue
    - g-skin-yellow
    - g-skin-grey
# 如果要更换整站的主色调，字体高亮颜色，按钮高亮颜色，边框高亮颜色，以及所有组件主体的高亮颜色。
* scss里写两份颜色配置文件，通过打包工具，打包出两份不同的肤色css显然是更好的解决方案。
* 如果还继续使用class加肤色样式的方式。
    - 字体加颜色不能直接写css，而是加class 例如加个类名为g-font-color-highlight
    - 背景加颜色不能直接写css，而是加class 例如加个类名为g-background-color-highlight
    - 边框加颜色不能直接写css，而是加class 例如加个类名为g-border-color-highlight
