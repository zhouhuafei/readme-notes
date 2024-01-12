/* eslint-disable */

// window.cjdgUtils
window.cjdgUtils = {
  getDpr () {
    if (window) {
      return window.devicePixelRatio
    } else {
      return 1
    }
  },
  utf8Encode (string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  encode (input) {
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0
    input = this.utf8Encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    }
    return output
  },
  imgSrc (obj) {
    if (Object.prototype.toString.call(obj).slice(8, -1) !== 'Object') return

    let {
      src,
      type = 'normal',
      mode,
      width,
      height,
      dpr,
      rotate,
      markText = '',
      videoTime = 1
    } = obj

    if (!src) return ''
    if (type === 'none') return src

    let symbol = '?'
    if (src.includes('?')) symbol = '&'

    // 以腾讯云为基准
    const typeObj = {
      normal: `${symbol}`,
      cut: `${symbol}imageMogr2/crop/`,
      rotate: `${symbol}imageMogr2/rotate/`,
      watermark: `${symbol}watermark/2/fontsize/20/dissolve/50/gravity/northeast/dx/20/dy/20/batch/1/degree/-45/spacing/100/text/`,
      // 视频截取首帧 为了兼容七牛 增加了 &vframe/jpg/offset/${videoTime} 若后续不再需要 则可以进行删除
      video: `${symbol}ci-process=snapshot&format=jpg&time=${videoTime}&vframe/jpg/offset/${videoTime}`
    }

    let imgUrl = `${src}${typeObj[type]}`
    width = Number(width)
    height = Number(height)
    rotate = Number(rotate)
    mode = Number(mode)
    mode = [0, 1, 2, 3, 4, 5].includes(mode) ? mode : 1
    dpr = Number(dpr) || this.getDpr()

    function setImageView2 (width, height, joinSymbol = '') {
      if (width || height) imgUrl += `${joinSymbol}imageView2/${mode}/`
      if (width) imgUrl += `w/${width * dpr}/`
      if (height) imgUrl += `h/${height * dpr}/`
    }

    switch (type) {
      case 'normal':
        setImageView2(width, height)
        break
      case 'cut':
        if (!width) width = 100
        if (!height) height = 100
        imgUrl += `${width * dpr}x${height * dpr}/gravity/center`
        break
      case 'rotate':
        if (!rotate) rotate = 90
        imgUrl += `${rotate}`
        setImageView2(width, height, '|')
        break
      case 'watermark':
        imgUrl += `${this.encode(markText)}`
        setImageView2(width, height, '|')
        break
      case 'video':
        break
    }

    if (['?', '&'].includes(imgUrl)) imgUrl = ''

    return imgUrl
  }
}

// cjdg-image-view
;(function () {
  const genTemplateDom = () => {
    const templateDom = document.createElement('template')
    templateDom.innerHTML = `
      <style>
        :host {
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-color: transparent;
          background: transparent;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: inherit;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-color: transparent;
          background: transparent;
        }
      </style>
      <img src="" alt="" />
    `
    return templateDom
  }

  class ExtHTMLElement extends HTMLElement {
    genShadowDom () {
      const contentDom = genTemplateDom().content
      const imgDom = contentDom.querySelector('img')
      const attributeList = this.getAttributeNames() || []
      const attrObj = {}

      if (attributeList.length) {
        attributeList.map(item => {
          const itemValue = this.getAttribute(item) || this[item]
          attrObj[item] = itemValue
          if (item === 'radius') {
            imgDom.style.borderRadius = `${itemValue}px`
          }
          if (item === 'round') {
            imgDom.style.borderRadius = '50%'
          }
        })
      }

      const arr = ['src', 'type', 'mode', 'width', 'height', 'dpr', 'videoTime']
      arr.map(item => {
        const itemVal = this.getAttribute(item) || this[item]
        if (itemVal) attrObj[item] = itemVal
      })

      const typeVal = this.getAttribute('type') || this['type'] || 'normal'
      let imgUrl = this.getAttribute('src') || this['src']
      if (typeVal !== 'none') imgUrl = window.cjdgUtils.imgSrc(attrObj)
      imgDom.setAttribute('src', imgUrl)

      const shadow = this.attachShadow({ mode: 'closed' })
      shadow.appendChild(contentDom)
    }

    // 当自定义元素第一次被连接到文档DOM时被调用 - 相当于mounted
    connectedCallback () {
      setTimeout(this.genShadowDom.bind(this))
      console.log('connectedCallback')
    }

    // 当自定义元素与文档DOM断开连接时被调用 - 与beforeDestroy类似
    disconnectedCallback () {
      console.log('disconnectedCallback')
    }

    // 当自定义元素被移动到新文档时被调用
    adoptedCallback () {
      console.log('adoptedCallback')
    }

    // 当自定义元素的一个属性被增加、移除或更改时被调用
    attributeChangedCallback () {
      console.log('attributeChangedCallback')
    }
  }

  class NewExtHTMLElement extends ExtHTMLElement {
  }

  window.customElements.define('image-view', ExtHTMLElement) // 老的使用方式
  window.customElements.define('cjdg-image-view', NewExtHTMLElement)
})()

// 超导的管理后台 是angular项目 子项目繁多 此文件目前处于不稳定状态 建议备份一份放入framework项目中自行维护 比使用CDN要方便
// 为啥不在om-bms-framework项目中动态引入CDN文件？因为动态引入的js文件，执行慢一拍，刷新页面会报错。

// cjdg-file-upload
;(function () {
  const genScript = () => {
    const sdkSrc = 'https://static.xxynet.com/common/js/cos-js-sdk-v5.min.js'
    const script = document.createElement('script')
    script.src = sdkSrc
    document.head.appendChild(script)
  }
  genScript()

  const genTemplateDom = () => {
    const templateDom = document.createElement('template')
    templateDom.innerHTML = `
      <style>
        :host {
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-color: transparent;
          background: transparent;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: inherit;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-color: transparent;
          background: transparent;
        }
      </style>
      <img src="" alt="" />
    `
    return templateDom
  }

  class ExtHTMLElement extends HTMLElement {
    genShadowDom () {
      const contentDom = genTemplateDom().content
      const imgDom = contentDom.querySelector('img')
      const attributeList = this.getAttributeNames() || []
      const attrObj = {}

      if (attributeList.length) {
        attributeList.map(item => {
          const itemValue = this.getAttribute(item) || this[item]
          attrObj[item] = itemValue
          if (item === 'radius') {
            imgDom.style.borderRadius = `${itemValue}px`
          }
          if (item === 'round') {
            imgDom.style.borderRadius = '50%'
          }
        })
      }

      const arr = ['src', 'type', 'mode', 'width', 'height', 'dpr']
      arr.map(item => {
        const itemVal = this.getAttribute(item) || this[item]
        if (itemVal) attrObj[item] = itemVal
      })

      const typeVal = this.getAttribute('type') || this['type'] || 'normal'
      let imgUrl = this.getAttribute('src') || this['src']
      if (typeVal !== 'none') imgUrl = window.cjdgUtils.imgSrc(attrObj)
      imgDom.setAttribute('src', imgUrl)

      const shadow = this.attachShadow({ mode: 'closed' })
      shadow.appendChild(contentDom)

      const e = new CustomEvent('change')
      e.$data = {}
      this.dispatchEvent(e)
    }

    // 当自定义元素第一次被连接到文档DOM时被调用 - 相当于mounted
    connectedCallback () {
      setTimeout(this.genShadowDom.bind(this))
      console.log('connectedCallback')
    }

    // 当自定义元素与文档DOM断开连接时被调用 - 与beforeDestroy类似
    disconnectedCallback () {
      console.log('disconnectedCallback')
    }

    // 当自定义元素被移动到新文档时被调用
    adoptedCallback () {
      console.log('adoptedCallback')
    }

    // 当自定义元素的一个属性被增加、移除或更改时被调用
    attributeChangedCallback () {
      console.log('attributeChangedCallback')
    }
  }

  class NewExtHTMLElement extends ExtHTMLElement {
  }

  window.customElements.define('cjdg-file-upload', NewExtHTMLElement)
})()
