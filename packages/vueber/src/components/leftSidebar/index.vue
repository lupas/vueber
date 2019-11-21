<template>
  <div class="fullWidth">
    <div v-for="conversation in conversations" :key="conversation.id">
      <conversationTile
        :conversation="conversation"
        :current-conversation="currentConversation"
        @clicked="changeConversation"
      />
    </div>

    <div v-if="hasMoreConversations" class="loadMoreListItem">
      <v-btn text class=" grey--text" small @click="loadNextConversations">
        Load more...
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    conversationTile: () => import('./conversationTile')
  },
  props: {
    conversations: {
      type: Array,
      default: () => []
    },
    currentConversation: {
      type: Object,
      default: null
    },
    hasMoreConversations: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeConversation(conversation) {
      this.$emit('coversationChanged', conversation)
    },
    loadNextConversations() {
      this.$emit('loadMoreConversations')
    }
  }
}
</script>

<style scoped>
.loadMoreListItem {
  min-height: 61px;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}

.fullWidth {
  width: 100%;
}
</style>
