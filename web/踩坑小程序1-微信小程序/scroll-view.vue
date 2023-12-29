<template>
  <!-- h5 vue 实现微信小程序scroll-view的部分功能 -->
  <div
    ref="wrap"
    class="wrap"
    :class="[scrollX?'scrollX':'', scrollY?'scrollY':'']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'scroll-view',
  props: {
    'scroll-x': {
      type: Boolean,
      default: false
    },
    'scroll-y': {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.wrap = this.$refs.wrap
    this.$refs.wrap.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll () {
      const wrap = this.wrap
      if (this.scrollX) {
        if (wrap.scrollLeft === 0) {
          this.$emit('scrolltoupper')
        }
        if (wrap.scrollLeft + wrap.offsetWidth === wrap.scrollWidth) {
          this.$emit('scrolltolower')
        }
      }
      if (this.scrollY) {
        if (wrap.scrollTop === 0) {
          this.$emit('scrolltoupper')
        }
        if (wrap.scrollTop + wrap.offsetHeight === wrap.scrollHeight) {
          this.$emit('scrolltolower')
        }
      }
      this.$emit('scroll')
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    overflow: hidden;

    &.scrollX {
      overflow-x: auto;
    }

    &.scrollY {
      overflow-y: auto;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
