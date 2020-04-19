<template>
  <div class="fullWidth">
    <div v-for="conversation in conversations" :key="conversation.id">
      <conversationTile
        :conversation="conversation"
        :selected-conversation="selectedConversation"
        @clicked="changeConversation"
      />
    </div>

    <div v-if="hasMoreConversations" class="loadMoreListItem">
      <btn small @click="loadNextConversations">
        Load more...
      </btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    conversationTile: () => import('./conversationTile'),
    btn: () => import('../_elements/btn'),
  },
  props: {
    conversations: {
      type: Array,
      default: () => [],
    },
    selectedConversation: {
      type: Object,
      default: null,
    },
    hasMoreConversations: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    changeConversation(conversation) {
      this.$emit('coversationChanged', conversation)
    },
    loadNextConversations() {
      this.$emit('loadMoreConversations')
    },
  },
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
