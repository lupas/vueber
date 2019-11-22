<template>
  <div class="outerInputContainer">
    <div class="innerInputContainer">
      <input
        ref="inputField"
        placeholder="Type a message..."
        @input="updateMessage"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @keydown="handleKeydown"
      />
      <slot name="append"></slot>
    </div>
    <slot name="append-outer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    message: null
  }),
  methods: {
    updateMessage() {
      const value = this.$refs.inputField.value
      this.message = value
      this.$emit('input', value)
    },
    handleKeydown(value) {
      this.$emit('keydown', value)
    }
  }
}
</script>

<style scoped>
.outerInputContainer {
  display: flex;
  width: 100%;
  height: 36px;
  padding: 0px 4px 0px 4px;
}

.innerInputContainer {
  display: flex;
  width: 100%;
  border-radius: 40px;
  background-color: var(--selectedColor);
  padding: 2px 16px 2px 16px;
}

input {
  width: 100%;
  border: none;
  background-color: transparent;
}

input:focus {
  outline: 0;
}
</style>
