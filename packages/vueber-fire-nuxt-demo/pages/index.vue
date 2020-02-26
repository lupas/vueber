<template>
  <div class="fullHeight">
    <VueberFire :current-user="currentUser" nuxt-fire @loginClicked="loginUser">
    </VueberFire>
  </div>
</template>

<script>
import { VueberFire } from 'vueber-fire'

export default {
  components: { VueberFire },
  data: () => ({
    currentUser: null
  }),
  methods: {
    loginUser() {
      this.currentUser = {
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
