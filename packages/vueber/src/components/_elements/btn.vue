<template>
  <button :disabled="disabled" @click="$emit('clicked')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
  font-size: 18px;
  background-color: transparent;
  border-width: 0px;
}
</style>
