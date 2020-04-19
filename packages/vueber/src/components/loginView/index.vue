<template>
  <div>
    <p>
      Not logged in.
    </p>
    <p>
      <btn @click="$emit('loginClicked')">Login</btn>
    </p>
    <p>
      <btn @click="$emit('initializeClicked')">Initialize</btn>
    </p>
  </div>
</template>

<script>
import btn from './../_elements/btn'

export default {
  components: {
    btn,
  },
}
</script>
