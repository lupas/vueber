<template>
  <div>
    <input v-model="userNumber" type="number" min="1" max="5" />
    <button @click="loginUser">Login User</button>
    <VueberFire :current-user="currentUser" nuxt-fire @loginClicked="loginUser">
    </VueberFire>
  </div>
</template>

<script>
import { VueberFire } from 'vueber-fire'

export default {
  components: { VueberFire },
  data: () => ({
    currentUser: null,
    userNumber: 1
  }),
  methods: {
    loginUser() {
      const userNumber = this.userNumber
      this.currentUser = {
        id: `user${userNumber}`,
        username: `User ${userNumber}`,
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
