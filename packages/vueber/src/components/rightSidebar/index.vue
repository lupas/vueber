<template>
  <div class="mainContainer">
    <div class="mainUserData">
      <v-avatar size="120px">
        <v-img :src="chatpartnerAvatarPath" alt="User Avatar" />
      </v-avatar>
      <p class="usernameText">
        {{ chatpartner.username }}
      </p>
    </div>

    <div class="">
      <p>TODO: Interactive Buttons</p>
      <p>
        <router-link :to="`/meet/members/${chatpartner.id}`">
          Go To User Profile
        </router-link>
      </p>
      <p>
        <router-link
          :to="`/contact?modus=report&username=${chatpartner.username}`"
        >
          Report User
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatpartner: {
      type: Object,
      required: true
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.mainContainer {
  padding: 16px 8px 8px 8px;
  display: flex;
  flex-direction: column;
}

.mainUserData {
  text-align: center;
}

.usernameText {
  font-size: 20px;
  font-weight: 700;
  margin-top: 14px;
}
</style>
