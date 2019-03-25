> 使用scss进行css的预编译

# 案例
* element对比mint-ui对比vant
    - element和vant都有清零样式。
    - element和vant都有对body设置默认字体大小(可配置)。
    - element和vant都有对body设置默认字体颜色(可配置)。
    - element和vant都有对body设置默认字体类型(不可配置)。
    - element没对body设置默认行高。
    - vant对body设置的默认行高是1(不可配置)。
    
# 个人总结
> ui样式应该和用户的清零样式以及其他样式完全解耦，尽最大努力做到互不影响。所以我认为应该遵守以下约定。
* 
