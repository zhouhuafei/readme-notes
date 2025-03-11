const mp = {
  async setClipboardData (options) {
    const val = options.data || ''
    try {
      await navigator.clipboard.writeText(val)
    } catch (e) {
      console.log('e：', e)
      const input = document.createElement('textarea')
      input.value = val
      document.body.appendChild(input)
      input.select && input.select() // Android
      input.setSelectionRange && input.setSelectionRange(0, val.length) // IOS
      document.execCommand('Copy')
      document.body.removeChild(input)
    }
  },
  setNavigationBarTitle (options) {
    document.title = options.title || ''
  },
  makePhoneCall (options) {
    const a = document.createElement('a')
    a.href = `tel:${options.phoneNumber}`
    a.click()
  },
  chooseMedia (options = {}) {
    return new Promise((resolve, reject) => {
      options.count = options.count || 1
      const imageMimeType = ['image/jpeg', 'image/png', 'image/gif']
      const videoMimeType = ['video/mp4']
      const excelMimeType = ['application/vnd.openxmlformats', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      if (options.mediaType) {
        const mimeType = []
        if (options.mediaType.includes('image')) {
          mimeType.push(...imageMimeType)
        }
        if (options.mediaType.includes('video')) {
          mimeType.push(...videoMimeType)
        }
        if (options.mediaType.includes('excel')) {
          mimeType.push(...excelMimeType)
        }
        options.mediaType = mimeType
      } else {
        options.mediaType = imageMimeType
      }
      const input = document.createElement('input')
      input.addEventListener('change', (e) => {
        const tempFiles = [...e.target.files]
        if (tempFiles.length > options.count) {
          const message = `最多上传${options.count}个文件`
          console.log(message)
          reject(new Error(message))
        } else {
          resolve({ tempFiles: tempFiles.map(file => ({ tempFilePath: file })) })
        }
      })
      input.type = 'file'
      input.accept = options.mediaType.join(',')
      if (options.count > 1) {
        input.setAttribute('multiple', 'multiple')
      }
      input.click()
    })
  },
  tempFilesToFormData (options = {}) {
    const formData = new FormData()
    Object.keys(options.formData).forEach((key) => {
      const val = options.formData[key]
      formData.append(key, val)
    })
    formData.append('file', options.filePath)
  }
}

console.log('mp：', mp)

export { mp }
