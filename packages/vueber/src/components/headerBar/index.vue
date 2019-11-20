<template>
  <div class="toolbar iPhonexTopPadding">
    <div class="leftElements">
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

.leftElements {
  /* tbd */
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
</style>
