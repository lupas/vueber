<template>
  <div v-if="userActions" class="userActions">
    <p v-if="userActions.goToProfileLink">
      <router-link :to="`${userActions.goToProfileLink}${chatpartner.id}`">
        Go to User Profile
      </router-link>
    </p>
    <p v-if="userActions.reportUserLink">
      <router-link :to="`${userActions.reportUserLink}${chatpartner.username}`">
        Report this User
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    chatpartner: {
      type: Object,
      required: true,
    },
    userActions: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.userActions {
  text-align: center;
}
</style>
