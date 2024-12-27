// 案例：把类似 16rpx 格式的字符串转换为 px2rpx(16) 格式的字符串 - 转换后配合scss可以把小程序上的组件样式复制到管理后台使用
{
  let str = `
  .view {
    font-size:32rpx; padding: 40rpx;
    width:  300rpx; height:    200rpx;
  }
  `
  str = str.replace(/(?<!px)(-?\d+)rpx/ig, (match, firstGroup) => `px2rpx(${firstGroup})`)
  console.log('str：', str)
}

// 案例：把类似 14px 格式的字符串转换为 28px 格式的字符串 - 可以用来解决微信小程序富文本渲染单位px无法自适应的问题
{
  let str = `
  <p style="font-size:14px;"></p>       <p style="font-size: 16px;"></p>
  <p style="font-size:  18px;"></p>  <p style="font-size:    20px;"></p>
  `
  str = str.replace(/(\d*)px/ig, (match, firstGroup) => `${firstGroup * 2}px`)
  console.log('str：', str)
}
