<template>
  <svg
    :viewBox="`0 0 24 24`"
    xmlns="http://www.w3.org/2000/svg"
    class="w-8 h-8 fill-current inline-block"
    :style="iconStyle"
  >
    <path :d="icon" :fill="color" />
    <slot name="paths" />
    <title>{{ iconTitle }}</title>
  </svg>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    },
    iconTitle: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: 'grey'
    }
  },
  computed: {
    iconStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        color: this.color
      }
    }
  },
  created() {}
}
</script>
