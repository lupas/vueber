<template>
  <img
    class="avatarImg"
    :src="src"
    :alt="alt"
    :height="size"
    :width="size"
    :style="dynStyle"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '45px',
    },
  },
  computed: {
    dynStyle() {
      return {
        width: this.size,
        height: this.size,
        'min-width': this.size,
        'min-height': this.size,
      }
    },
  },
}
</script>

<style scoped>
.avatarImg {
  border-radius: 100%;
}
</style>
