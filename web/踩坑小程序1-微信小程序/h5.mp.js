const mp = {
  async setClipboardData (options = {}) {
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
  setNavigationBarTitle (options = {}) {
    document.title = options.title || ''
  },
  makePhoneCall (options = {}) {
    const a = document.createElement('a')
    a.href = `tel:${options.phoneNumber}`
    a.click()
  },
  chooseMedia (options = {}) {
    return new Promise((resolve, reject) => {
      options.count = options.count || 1
      const imageMimeType = [
        'image/jpeg', 'image/png', 'image/gif', // .jpg|.jpeg/.png/.gif
        'image/webp', 'image/svg+xml', 'image/bmp', // .webp/.svg/.bmp
        'image/x-icon', 'image/vnd.microsoft.icon' // .ico
      ]
      const videoMimeType = [
        'video/mp4' // .mp4
      ]
      const audioMimeType = [
        'audio/mpeg' // .mp3
      ]
      const excelMimeType = [
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
      ]
      if (options.mediaType) {
        const mimeType = []
        if (options.mediaType.includes('image/')) {
          mimeType.push(...options.mediaType)
        } else if (options.mediaType.includes('image')) {
          mimeType.push(...imageMimeType)
        }
        if (options.mediaType.includes('video/')) {
          mimeType.push(...options.mediaType)
        } else if (options.mediaType.includes('video')) {
          mimeType.push(...videoMimeType)
        }
        if (options.mediaType.includes('audio/')) {
          mimeType.push(...options.mediaType)
        } else if (options.mediaType.includes('audio')) {
          mimeType.push(...audioMimeType)
        }
        if (options.mediaType.includes('application/')) {
          mimeType.push(...options.mediaType)
        } else if (options.mediaType.includes('excel')) {
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
  }
}

console.log('mp：', mp)

export { mp }
