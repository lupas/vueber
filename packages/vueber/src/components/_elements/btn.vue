<template>
  <button
    class="ripple"
    :style="dynStyle"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dynStyle() {
      return {
        '--selectedColor': this.color ? this.color : null,
        'font-size': this.small ? '15px' : null,
      }
    },
  },
}
</script>

<style scoped>
button {
  display: flex;
  cursor: pointer;
  font-size: 18px;
  background-color: transparent;
  border-width: 0px;
  padding: 6px 14px 6px 14px;
  border-radius: 15px;
  font-weight: 500;
}

button:focus {
  outline: 0;
  background-color: transparent;
}

button:hover {
  background-color: var(--selectedColor);
}

/* Ripple effect */
.ripple {
  background-position: center;
  transition: background 0.8s;
}
.ripple:hover {
  background: var(--selectedColor)
    radial-gradient(circle, transparent 1%, var(--selectedColor) 1%)
    center/15000%;
}
.ripple:active {
  background-color: var(--selectedColor);
  background-size: 100%;
  transition: background 0s;
}
</style>
