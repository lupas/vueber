<template>
  <div class="mainContainer">
    <mobileHeader
      class="mobileHeader"
      @backButtonPressed="handleBackButtonPress"
    />
    <div class="mainUserData">
      <v-avatar size="120px">
        <v-img :src="chatpartnerAvatarPath" alt="User Avatar" />
      </v-avatar>
      <p class="usernameText">
        {{ chatpartner.username }}
      </p>
    </div>

    <div class="userActions">
      <p>
        <router-link :to="`/meet/members/${chatpartner.id}`">
          Go to User Profile
        </router-link>
      </p>
      <p>
        <router-link
          :to="`/contact?modus=report&username=${chatpartner.username}`"
        >
          Report this User
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    mobileHeader: () => import('./mobileHeader.vue')
  },
  props: {
    chatpartner: {
      type: Object,
      required: true
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true
    }
  },
  methods: {
    handleBackButtonPress() {
      this.$emit('backButtonPressed')
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

.mobileHeader {
  display: none;
}
/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .mobileHeader {
    display: initial;
  }
}

.userActions {
  text-align: center;
}
</style>
