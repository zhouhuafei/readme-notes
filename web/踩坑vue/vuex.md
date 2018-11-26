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
}
```
