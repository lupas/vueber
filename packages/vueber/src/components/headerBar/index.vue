<template>
  <toolbarWrapper @goBackPressed="showConversations">
    <template v-slot:left-items>
      <avatar
        size="40px"
        :src="chatpartnerAvatarPath"
        alt="Chatpartner Avatar"
      />
      <span class="username">{{ chatpartner.username }}</span>
    </template>

    <template v-slot:right-items>
      <v-btn icon @click="showDetails">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>
  </toolbarWrapper>
</template>

<script>
export default {
  components: {
    avatar: () => import('../_elements/avatar'),
    toolbarWrapper: () => import('../_elements/toolbarWrapper')
  },
  props: {
    chatpartner: {
      type: Object,
      required: true
    },
    selectedConversation: {
      type: Object,
      required: true
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true
    }
  },
  computed: {
    additionalInfo() {
      return {
        conversationId: this.conversation.id
      }
    }
  },
  methods: {
    showConversations() {
      this.$emit('showConversationsClicked')
    },
    showDetails() {
      this.$emit('showDetailsClicked')
    }
  }
}
</script>

<style scoped>
.username {
  font-size: 17px;
  font-weight: bold;
  margin-left: 6px;
}

.showConversationsButton {
  display: none;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .showConversationsButton {
    display: initial;
  }
}
</style>
