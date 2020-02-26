<template>
  <p>
    Not logged in.
    <btn @click="$emit('loginClicked')">Login</btn>
  </p>
</template>

<script>
import btn from './../_elements/btn'

export default {
  components: {
    btn
  }
}
</script>
