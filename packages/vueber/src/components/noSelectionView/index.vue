<template>
  <v-btn text class="title grey--text" @click="handleClick">
    Select a chatpartner.
  </v-btn>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('clicked')
    }
  }
}
</script>
