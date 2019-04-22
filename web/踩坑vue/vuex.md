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
store.commit('increment', {}); // 可以带一个参数，所以建议带json。
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
store.dispatch('increment', {}); // 可以带一个参数，所以建议带json。
```

# 模块和命名空间
* 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
* 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
```
const store = {
 modules: {
   account: {
     namespaced: true, // 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
     // 模块内容(module assets)
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
* 不加namespaced: true属性的话。当前模块的mutations和actions和其他模块的mutations和actions有重名的风险(因注册在全局命名空间)，注意规避即可。
```
console.log(store.state.moduleA.count);
console.log(store.getters.moduleA.count);
store.commit('login');
store.dispatch('login');
```

# 辅助函数
* mapState和mapGetters应该绑定到computed上。
    - 就算mapGetters中有些getters返回的是个函数，也应该绑定到computed上，然后在模版里直接调用即可。```<div>{{ fn(args) }}<div>```
    - 如果mapGetters中有些getters返回的是个函数，你把它绑定到了methods上，那么在模版里你需要调用两次。```<div>{{ fn()(args)  }}<div>```
* mapMutations和mapActions应该绑定到methods上。

# 时光旅行
* 只能在开发者工具devtools中进行旅行么？待续...
