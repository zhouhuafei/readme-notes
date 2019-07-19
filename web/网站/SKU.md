# SKU原理
* 递归处理
* 第1个数组和第2个数组拼接
* 拼接完的结果和第3个数组拼接
* 拼接完的结果和第4个数组拼接
* 案例 - 源码：
    - https://github.com/zhouhuafei/zhf.sku
    - https://github.com/zhouhuafei/zhf.sku/blob/master/src/index.js
* 案例 - 代码：
```
(function (name, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') { // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // requirejs - amd canon
        define(factory);
    } else { // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('sku', function () {
    function sku(arr) {
        const length = arr.length;
        let num = 0;
        let result = [];
        if (length !== 0) {
            arr[0].forEach(function (v) {
                result.push([v]);
            });
            fn(arr);
        }

        function fn(arr) {
            num++;
            if (num < length) {
                const r = [];
                result.forEach(function (v1) {
                    arr[num].forEach(function (v2) {
                        r.push(v1.concat(v2));
                    });
                });
                result = r;
                fn(arr);
            }
        }

        return result;
    }

    return sku;
});
```
    
# SKU实战
* 多规格，没库存的商品进行置灰。
* 从组合完毕的列表中，找到没库存的项。
* 选择规格时，如果差一个规格项就选择完毕了或者每一个规格项都选择完毕了，则从无库存的组合项中进行无库存规格值查找。找到则置灰。
    - 无库存规格值查找时，如果只有一个规格项，则进行特殊处理，因查找起来很方便。
    - 差一个规格项没被选择，则找到没被选择的那一项即可。
    - 全部规格项都被选择了，先要查下无库存的组合项，被选中了几项，如果无库存的组合项，剩一项没被选中，则让对应没被选中项的规格值进行置灰。
    - 置灰之前，要先设置为全部都可点击。
* 不满足查找条件，则要设置全部都可点击。
* 案例 - 注意：因后端给的数据，没使用id进行拼接，而是使用中文逗号拼接的规格值，所以规格值新增时，不允许出现中文逗号，我们的做法是把用户输入的中文逗号统一替换为英文逗号。
    - 安全的做法，应改为使用id拼接。
* 案例 - 数据格式：
```
const attributeList = [
  {
    'key': '颜色',
    'value': [{ 'values': '蓝色', 'img': '' }, { 'values': '米黄色', 'img': '' }],
    'isShow': 0
  },
  {
    'key': '尺寸',
    'value': [{ 'values': '150cm', 'img': '' }, { 'values': '160cm', 'img': '' }, { 'values': '170cm', 'img': '' }],
    'isShow': 1
  }
]
const specificationList = [
  {
    'id': 3364,
    'productId': 78,
    'specId': 18418,
    'specCode': '2651',
    'specContent': '蓝色，150cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 9,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  },
  {
    'id': 3365,
    'productId': 78,
    'specId': 18419,
    'specCode': '2652',
    'specContent': '蓝色，160cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 10,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  },
  {
    'id': 3366,
    'productId': 78,
    'specId': 18420,
    'specCode': '2653',
    'specContent': '蓝色，170cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 12,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  },
  {
    'id': 3367,
    'productId': 78,
    'specId': 18421,
    'specCode': '2655',
    'specContent': '米黄色，150cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 12,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  },
  {
    'id': 3368,
    'productId': 78,
    'specId': 18422,
    'specCode': '2656',
    'specContent': '米黄色，160cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 0,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  },
  {
    'id': 3369,
    'productId': 78,
    'specId': 18423,
    'specCode': '2659',
    'specContent': '米黄色，170cm',
    'prePrice': '256.00',
    'price': '110.88',
    'sellPrice': '126.00',
    'inventory': 0,
    'status': 1,
    'tenantId': 100,
    'isDeleted': 0,
    'imgUrl': null,
    'weight': '1.00',
    'volume': '2.00'
  }
]
```
* 案例 - wxml代码：
```
<view wx:for="{{ data.attributeList }}" wx:for-item="itemP" wx:for-index="indexP" wx:key="{{indexP}}">
  <view class="label pb10">{{ itemP.key }}</view>
  <view class="row-content" wx:for="{{ itemP.value }}" wx:key="{{ index }}">
    <view class="tags">
      <view
        class="item {{ item.active ? 'active' : '' }} {{ item.disabled ? 'disabled' : '' }}"
        bindtap="onSpecClick"
        data-parent-index="{{ indexP }}"
        data-index="{{ index }}"
        data-values="{{ item.values }}"
      >{{ item.values }}
      </view>
    </view>
  </view>
</view>
```
* 案例 - js代码：
```
const productApi = require('../../api/product')
const priceCtrl = require('../../utils/price')

Component({
  properties: {
    id: {
      type: Number,
      value: 0,
      observer (newval) {
        this.setData({ id: newval })
      }
    }
  },

  attached () {
    if (!this.id) return
    this.getInfo()
  },

  methods: {
    getInfo () {
      wx.showLoading()
      productApi.getInfo({
        params: { id: this.id },
        success: ({ data }) => {
          this.setData({ data }) // 此行请勿删除，否则将导致下面formatSpecData调用的报错。
          wx.hideLoading()
          const attributeList = data.attributeList
          let current = null
          if (this.data.specContent) { // 如果specContent有入参，则选中specContent。
            current = data.specificationList.find(v => v.specContent === this.data.specContent)
          } else { // 否则就默认选中有库存的那一项。
            current = data.specificationList.filter(v => +v.inventory !== 0)[0]
          }
          if (!current) { // 商品无库存。
            current = data.specificationList[0] // 则按照第一个商品的规格组合展示数据。
            attributeList.forEach(v => {
              v.value.forEach((item) => {
                item.disabled = true
              })
            })
          } else { // 商品有库存。
            // 对被选中的进行标记。
            const arr = current.specContent.split('，')
            attributeList.forEach((v, i) => {
              v.value.forEach((item) => {
                if (item.values === arr[i]) {
                  item.active = true
                }
              })
            })
            if (attributeList.length === 1) { // 只有一维规格，则置灰无库存的。
              const noStoreList = data.specificationList.filter(v => +v.inventory === 0) // 无库存项
              noStoreList.forEach(v => {
                attributeList['0'].value.forEach(item => {
                  if (item.values === v.specContent) {
                    item.disabled = true
                  }
                })
              })
            } else { // 非一维规格，则没库存的要进行置灰。请勿删除ajax内部第一行的setData，否则将导致下面formatSpecData调用的报错。
              const arr = current.specContent.split('，')
              let index = 0
              attributeList[attributeList.length - 1].value.forEach((v, i) => {
                if (v.values === arr[arr.length - 1]) {
                  index = i
                }
              })
              const parentIndex = attributeList.length - 1
              attributeList[attributeList.length - 1].value[index].active = false // 修复因formatSpecData方法内部的取消选择判定导致最后一维规格不选中的问题。
              this.formatSpecData(index, parentIndex)
              return
            }
          }
          const { int, dec } = priceCtrl.currency(current.price)
          const obj = priceCtrl.currency(current.sellPrice)
          data = {
            ...data,
            price: current.price,
            priceInteger: int,
            priceDecimal: dec,
            sellPrice: current.sellPrice,
            sellPriceInteger: obj.int,
            sellPriceDecimal: obj.dec,
            prePrice: current.prePrice,
            inventory: current.inventory
          }
          this.setData({ data })
        }
      })
    },
    // 格式化规格数据
    formatSpecData (index, parentIndex) {
      let data = this.data.data
      const attributeList = data.attributeList
      const parent = attributeList[parentIndex]
      const obj = parent.value[index]
      if (obj.disabled) { // 没库存，禁止点击。
        return
      }
      if (obj.active) { // 取消选择
        obj.active = false
      } else { // 选择其他项
        parent.value.forEach((item) => {
          item.active = false
        })
        obj.active = true
      }
      const selected = this.getSelectedSpecArr() // 被选中的预设项
      console.log('选中的项', selected)
      const realSelected = selected.filter(v => v) // 真实被选中的项
      const realLength = realSelected.length
      if (attributeList.length - 1 <= realLength) { // 还差一项就选择完毕了(以及选择完毕了)。(都需)检测是否没库存了。
        const noStoreList = data.specificationList.filter(v => +v.inventory === 0) // 无库存项
        const noSelectedIndex = selected.indexOf('') // 哪一项没被选择。为-1表示选择了全部。
        let noStoreKey = {} // 哪一项的哪些规格值没库存了。
        if (noSelectedIndex !== -1) {
          selected.splice(noSelectedIndex, 1)
        }
        noStoreList.forEach(v => {
          if (attributeList.length === 1) { // 只有一个规格项
            const index = 0
            if (!noStoreKey[index]) {
              noStoreKey[index] = []
            }
            noStoreKey[index].push(v.specContent)
            return
          }
          const arr = v.specContent.split('，')
          let key = []
          if (noSelectedIndex !== -1) { // 剩一项没被选中
            key = arr.splice(noSelectedIndex, 1)
            if (selected.join(',') === arr.join(',')) { // 保证选择的对应项和无库存的对应项是同一项。
              if (!noStoreKey[noSelectedIndex]) {
                noStoreKey[noSelectedIndex] = []
              }
              noStoreKey[noSelectedIndex] = noStoreKey[noSelectedIndex].concat(key)
            }
          }
          if (noSelectedIndex === -1) { // 全部规格项都被选择了
            let num = 0 // 无库存的组合项，被选中了几项
            selected.forEach(v => {
              if (arr.indexOf(v) !== -1) {
                num++
              }
            })
            arr.forEach((v, i) => {
              if (num === selected.length - 1 && selected.indexOf(v) === -1) { // 无库存的组合项，剩一项没被选中，则让对应项无库存的规格值置灰。
                if (!noStoreKey[i]) {
                  noStoreKey[i] = []
                }
                noStoreKey[i].push(v)
              }
            })
          }
        })
        console.log('没库存的项', noStoreKey)
        // 先全都不禁止点击。
        attributeList.forEach(v => {
          v.value.forEach((item) => {
            item.disabled = false
          })
        })
        // 存在无库存项，则让无库存项不可以被点击。
        if (Object.keys(noStoreKey).length) {
          Object.keys(noStoreKey).forEach(key => {
            attributeList[key].value.forEach(v => {
              v.disabled = noStoreKey[key].indexOf(v.values) !== -1 // 没库存的规格项对应的规格值进行置灰。
            })
          })
        }
      } else { // 选中的规格项数不满足计算条件，则不禁止点击。
        attributeList.forEach(v => {
          v.value.forEach((item) => {
            item.disabled = false
          })
        })
      }
      if (attributeList.length === realLength) { // 全部选择完毕了
        const current = this.getSelectedSpec()
        const { int, dec } = priceCtrl.currency(current.price)
        const obj = priceCtrl.currency(current.sellPrice)
        data = {
          ...this.data.data,
          price: current.price,
          priceInteger: int,
          priceDecimal: dec,
          sellPrice: current.sellPrice,
          sellPriceInteger: obj.int,
          sellPriceDecimal: obj.dec,
          prePrice: current.prePrice,
          inventory: current.inventory
        }
      }
      this.setData({ data })
    },
    // 已选中规格 - 组合后的数据
    getSelectedSpec () {
      const arr = this.getSelectedSpecArr()
      const specList = this.data.data.specificationList
      return specList.find(v => v.specContent === arr.join('，'))
    },
    // 已选中规格 - 组合前的数据
    getSelectedSpecArr () {
      const attributeList = this.data.data.attributeList
      const arr = [...Array(attributeList.length)].map(v => '')
      attributeList.forEach((v, i) => {
        v.value.forEach(v2 => {
          if (v2.active) {
            arr[i] = v2.values
          }
        })
      })
      return arr
    },
    // 点击规格
    onSpecClick ({ currentTarget: { dataset } }) {
      const { index, parentIndex } = dataset
      this.formatSpecData(index, parentIndex)
    }
  }
})
```
