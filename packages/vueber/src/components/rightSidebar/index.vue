<template>
  <div>
    <mobileHeader
      class="mobileHeader"
      @backButtonPressed="handleBackButtonPress"
    />
    <div class="mainContainer">
      <div class="mainUserData">
        <avatar
          size="120px"
          :src="chatpartnerAvatarPath"
          alt="Chatpartner Avatar"
        />
        <p class="usernameText">
          {{ chatpartner.username }}
        </p>
      </div>

      <userActions :user-actions="userActions" :chatpartner="chatpartner" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    mobileHeader: () => import('./mobileHeader'),
    avatar: () => import('../_elements/avatar'),
    userActions: () => import('./userActions')
  },
  props: {
    chatpartner: {
      type: Object,
      required: true
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true
    },
    userActions: {
      type: Object,
      default: null
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
    display: flex;
  }
}
</style>
