
const img = document.createElement('img')
img.onload = () => {
  const width = img.width
  const height = img.height
  console.log('width', width)
  console.log('height', height)
}
img.src = 'https://qiniu.icaodong.com/xcx/common/default-header.png'















