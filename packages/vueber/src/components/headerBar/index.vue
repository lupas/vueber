<template>
  <div class="toolbar iPhonexTopPadding">
    <div>
      <v-btn
        class="showConverdsationsButton"
        small
        icon
        text
        @click="showConversations"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-avatar size="40px">
        <v-img :src="chatpartnerAvatarPath" alt="User Avatar" />
      </v-avatar>
      <span class="username">{{ chatpartner.username }}</span>
    </div>

    <div class="spacer"></div>

    <div>
      <v-btn icon @click="handleShowDetails">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
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
    handleShowDetails() {
      this.$emit('showDetailsClicked')
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  height: 60px;
  padding: 8px 8px 8px 16px;
  border-bottom: solid #d3d3d380 1px;
}

.spacer {
  -webkit-box-flex: 1 !important;
  flex-grow: 1 !important;
}

.username {
  font-size: 17px;
  font-weight: bold;
  margin-left: 6px;
}

.showConverdsationsButton {
  display: none;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .showConverdsationsButton {
    display: initial;
  }
}
</style>
