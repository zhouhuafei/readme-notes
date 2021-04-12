# 客户端导入导出excel
* 导入-參考：https://www.cnblogs.com/liuxianan/p/js-excel.html
* 导出-參考：https://www.kitesky.com/archives/218
* 工具：https://github.com/SheetJS/sheetjs
* 案例：https://github.com/zhouhuafei/jd_docker-app/blob/master/client-ui/src/views/cookie/List.vue
* 摘要：
```javascript
import ApiUser from '@/api/user'
import ApiCookie from '@/api/cookie'
import XLSX from 'xlsx'

export default {
  data () {
    return {
      search: {
        name: '',
        page: 1, // 当前是第几页
        limit: 10, // 每页数据条数
        count: 300, // 数据总条数
        pageCount: 30 // 总共多少页
      },
      tableData: []
    }
  },
  async created () {
    this.getList()
  },
  methods: {
    chooseFile (opts = {}) {
      const input = document.createElement('input')
      input.addEventListener('change', (e) => {
        const tempFilePaths = [...e.target.files]
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
    importAccount () {
      // 參考：https://www.cnblogs.com/liuxianan/p/js-excel.html
      const reader = new FileReader()
      reader.onload = async function (e) {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetNames = workbook.SheetNames // 工作表名称集合
        const worksheet = workbook.Sheets[sheetNames[0]] // 这里我们只读取第一张sheet
        let arrJson = XLSX.utils.sheet_to_json(worksheet)
        arrJson = arrJson.map(v => {
          return {
            'name': v['名称'],
            'pt_key': v.pt_key,
            'pt_pin': v.pt_pin,
            'priority': v['优先级']
          }
        })
        await ApiCookie.importExcel({ list: arrJson })
        this.$message.success('导入成功')
        this.getList()
      }
      this.chooseFile({
        success: ({ tempFilePaths }) => {
          reader.readAsBinaryString(tempFilePaths[0])
        }
      })
    },
    async exportAccount () {
      // 參考：https://www.kitesky.com/archives/218
      const result = await ApiCookie.getList({
        ...this.search,
        limit: 0 // 直接一页查出全部
      })
      const filename = 'cookie.xlsx'
      const workbook = XLSX.utils.book_new()
      const arrJson = result.list.map(v => {
        return {
          '名称': v.name,
          'pt_key': v.pt_key,
          'pt_pin': v.pt_pin,
          '优先级': v.priority
        }
      })
      // 数组转excel
      const ws1 = XLSX.utils.json_to_sheet(arrJson)
      // 表格转excel
      // const ws1 = XLSX.utils.table_to_sheet(this.$refs.table.$el)
      XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet1')
      XLSX.writeFile(workbook, filename)
    },
    lookLogs () {
      window.open('/jd_docker-app/logs', '_blank')
    },
    async scriptStart () {
      await ApiUser.scriptStart()
    },
    async scriptStop () {
      await ApiUser.scriptStop()
    },
    async getList () {
      const result = await ApiCookie.getList({ ...this.search })
      this.tableData = result.list
      this.search.count = result.count
    },
    async del (row) {
      await ApiCookie.delete({ ...row })
      this.$message.success('成功')
      this.getList()
    },
    handleSizeChange (val) {
      this.search.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.search.page = val
      this.getList()
    }
  }
}
```
