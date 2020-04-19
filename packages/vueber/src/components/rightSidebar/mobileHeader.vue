<template>
  <toolbarWrapper flat @goBackPressed="backButtonPressed"> </toolbarWrapper>
</template>

<script>
export default {
  components: {
    toolbarWrapper: () => import('../_elements/toolbarWrapper'),
  },
  methods: {
    backButtonPressed() {
      this.$emit('backButtonPressed')
    },
  },
}
</script>

<style scoped></style>
