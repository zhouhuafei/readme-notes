# 工作记录
* 公司绩效考核的标准变了
* 以前不写的，后来让写了，和绩效有关，不知道要写多久
* 大家貌似都不太喜欢写这玩意儿

# 又不需要写周报了(2018/08/01)
* 但是我写习惯了，继续保持吧。

# 数据记录说明
* 仅记录一些安全的数据，此处不可记录账号和密码。
* 对应的数据如果记录到对应项目的readme.md文件中，查阅起来可以方便他人。
* 记录到此处只是方便了自己，当然我也会在对应的项目中也记录一份。

# 微商城商家自有小程序
* 位置：yunqi-mstore项目的whd-mstore分支
* 测试的时候
    - appid：wx0cbee15036c4aa54
    - extAppid：wx0cbee15036c4aa54
    - 因是吴伟个人的appid，受微信官方限制，无法发起支付。
* 上线的时候
    - appid：wx52e69a20960968e9
    - extAppid：不需要extAppid，需把dist目录里的ext.json删除。因为即使把extAppid的值换成wx52e69a20960968e9也不行，会提示没有权限。

# 微商城门店小程序
* 位置：wsc-mstore-offline项目的dev分支
    - appid：wxab6cd8a4e5573a25
    - extAppid：wxab6cd8a4e5573a25

# 微好店商家自有小程序
* 位置：yunqi-mstore项目的master分支
    - appid：wxd10aec12c954efcd
    - extAppid：wxd10aec12c954efcd

# 微好店门店小程序
* 位置：wsc-mstore-offline项目的whd-mstore分支
    - appid：wxc770f9ef01572ccd
    - extAppid：wxc770f9ef01572ccd

# 小程序注意事项
* 因不同分支对应不同品牌，ext.json不一样。所以不同分支不能互相merge。除非把ext.json从版本库里移除或者在merge之前把ext.json备份起来，不同分支对应不同品牌时ext.json从版本库里移除才是正确做法。

# 登录
* 微好店小程序判断是否登录，是根据open_id是否存在。在指定入口跳去授权登录。授权登录完获取open_id和userInfo。
* 微商城小程序判断是否登录，是根据open_id以及userInfo是否存在。在指定入口跳去授权登录。授权登录完获取open_id和userInfo。
* 门店小程序判断是否登录，是根据isLogin是否存在，在接口底层直接跳授权登录页去登陆。授权登录完调getUserInfo获取open_id和userInfo。
* 我主张的做法。判断是否登录需open_id存在且hasUserInfo存在。存open_id不存userInfo。获取userInfo因未授权导致失败就移掉hasUserInfo(让isLogin方法通不过)并跳到授权登录页进行登录。
