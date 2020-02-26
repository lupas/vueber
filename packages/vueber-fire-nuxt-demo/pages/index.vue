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
        id: 'user0',
        username: 'TestUser',
        avatar: null
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
