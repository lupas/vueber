<template>
  <img class="avatarImg" :src="src" :alt="alt" :height="size" :width="size" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '45px'
    }
  }
}
</script>

<style scoped>
.avatarImg {
  border-radius: 100%;
}
</style>
