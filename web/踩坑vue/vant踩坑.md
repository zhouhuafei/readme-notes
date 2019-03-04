# 怎么做表单验证？
* 是否内置表单验证规则？
    - 待续...

# 微信小程序的组件 - van-datetime-picker
* 时间选择器```bindchange```时得不到```event.detail.value```的值，直接报错说```detail```是```undefined```。
    - 原因：文档有误。应使用```bindinput```事件，以及值是```event.detail```。
