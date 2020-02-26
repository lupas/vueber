<template>
  <div class="fullHeight">
    <VueberFire :current-user="currentUser" nuxt-fire> </VueberFire>
  </div>
</template>

<script>
import { VueberFire } from 'vueber-fire'

export default {
  components: { VueberFire },
  data: () => ({}),
  computed: {
    currentUser() {
      return {
        id: 'testId',
        username: 'TestUser'
      }
    }
  }
}
</script>

<style scoped>
.fullHeight {
  height: 100vh;
}
</style>
