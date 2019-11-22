<template>
  <button :disabled="disabled" @click="$emit('click')">
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
  padding: 6px 14px 6px 14px;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
</style>
