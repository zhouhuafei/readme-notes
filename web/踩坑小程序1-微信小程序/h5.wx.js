const wx = {
  setClipboardData ({ data }) {
    const val = data || ''
    const input = document.createElement('textarea')
    input.value = val
    document.body.appendChild(input)
    input.select()
    input.blur()
    document.execCommand('Copy')
    document.body.removeChild(input)
  },
  setNavigationBarTitle (obj) {
    document.title = obj.title || ''
  },
  uploadFile (opts = {}) {
    const formData = new FormData()
    Object.keys(opts.formData).forEach((key) => {
      const val = opts.formData[key]
      formData.append(key, val)
    })
    formData.append('file', opts.filePath)
  },
  chooseImage (opts = {}) {
    const input = document.createElement('input')
    input.addEventListener('change', (e) => {
      const tempFilePaths = e.target.files
      if (tempFilePaths.length > opts.count) {
        const message = `最多上传${opts.count}个文件`
        console.error(message)
        opts.fail && opts.fail({ message })
      } else {
        opts.success && opts.success({ tempFilePaths })
      }
    })
    input.type = 'file'
    if (opts.count > 1) {
      input.setAttribute('multiple', 'multiple')
    }
    input.click()
  },
  makePhoneCall (e) {
    const a = document.createElement('a')
    a.href = `tel:${e.phoneNumber}`
    a.click()
  }
}

console.log('wx：', wx)
