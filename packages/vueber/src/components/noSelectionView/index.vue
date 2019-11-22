<template>
  <btn @click="handleClick">
    Select a chatpartner.
  </btn>
</template>

<script>
export default {
  components: {
    btn: () => import('../_elements/btn')
  },
  methods: {
    handleClick() {
      this.$emit('clicked')
    }
  }
}
</script>
