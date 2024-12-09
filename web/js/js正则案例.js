// 案例1：把类似 16rpx 格式的字符串转换为 px2rpx(16) 格式的字符串
{
  let str = `
  .view {
    font-size:32rpx; padding: 40rpx;
    width:  300rpx; height:    200rpx;
  }
  `
  str = str.replace(/(\d*)rpx/ig, (match, firstGroup) => `px2rpx(${firstGroup})`)
  console.log('str：', str)
}
// 案例2：把类似 14px 格式的字符串转换为 28px 格式的字符串
{
  let str = `
  <p style="font-size:14px;"></p>       <p style="font-size: 16px;"></p>
  <p style="font-size:  18px;"></p>  <p style="font-size:    20px;"></p>
  `
  str = str.replace(/(\d*)px/ig, (match, firstGroup) => `${firstGroup * 2}px`)
  console.log('str：', str)
}
