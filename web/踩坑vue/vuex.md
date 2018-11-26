# Getters
```
const store = {
  state: {
    items: [],
  },
  getters: {
    menu(state) {
      return state.items;
    },
  },
};
```
* getters是派生出的状态。
* this.$store.state.menu.items和this.$store.getters.menu得到的结果是一致的。
* 即：```this.$store.state.menu.items===this.$store.getters.menu; // true```。

# Mutation
* 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
```
const store = {
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
};
store.commit('increment');
```

# Action
* Action 类似于 mutation，不同在于：
* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。
```
const store = {
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
};
store.dispatch('increment');
```

# 模块
```
const store = {
 modules: {
   account: {
     namespaced: true, // 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
     // 模块内容（module assets）
     state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
     getters: {
       isAdmin () { ... } // -> getters['account/isAdmin']
     },
     actions: {
       login () { ... } // -> dispatch('account/login')
     },
     mutations: {
       login () { ... } // -> commit('account/login')
     }
   }
 }
};
```
