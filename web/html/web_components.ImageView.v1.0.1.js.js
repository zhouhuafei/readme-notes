/* eslint-disable */

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
      width,
      height,
      dpr,
      rotate,
      markText = ''
    } = obj

    if (!src) return ''
    if (type === 'none') return src

    // 以腾讯云为基准
    const typeObj = {
      normal: '',
      cut: '?imageMogr2/crop/',
      rotate: `?imageMogr2/rotate/`,
      watermark: `?watermark/2/fontsize/20/dissolve/50/gravity/northeast/dx/20/dy/20/batch/1/degree/-45/spacing/100/text/`
    }

    let imgUrl = `${src}${typeObj[type]}`
    width = Number(width)
    height = Number(height)
    rotate = Number(rotate)
    dpr = dpr || this.getDpr()
    switch (type) {
      case 'cut':
        if (!width) width = 100
        if (!height) height = 100
        imgUrl += `${width * dpr}x${height * dpr}/gravity/center`
        break
      case 'rotate':
        if (!rotate) rotate = 90
        imgUrl += `${rotate}`
        if (width || height) imgUrl += `|imageView2/1/`
        if (width) imgUrl += `w/${width * dpr}/`
        if (height) imgUrl += `h/${height * dpr}/`
        break
      case 'watermark':
        imgUrl += `${this.encode(markText)}`
        if (width || height) imgUrl += `|imageView2/1/`
        if (width) imgUrl += `w/${width * dpr}/`
        if (height) imgUrl += `h/${height * dpr}/`
        break
      default:
        if (width || height) imgUrl += `?imageView2/1/`
        if (width) imgUrl += `w/${width * dpr}/`
        if (height) imgUrl += `h/${height * dpr}/`
        break
    }
    return imgUrl
  }
}
;(function () {
  const genTemplateDom = () => {
    const templateDom = document.createElement('template')
    templateDom.id = 'imageViewTemplate'
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

  class ImageView extends HTMLElement {
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

      const arr = ['src', 'type', 'width', 'height', 'dpr']
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

  window.customElements.define('image-view', ImageView)
})()
