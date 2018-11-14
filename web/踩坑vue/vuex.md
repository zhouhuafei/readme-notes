# getters
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
