<template>
  <div>
    <v-list>
      <div v-for="conversation in conversations" :key="conversation.id">
        <conversationTile
          :conversation="conversation"
          :current-conversation="currentConversation"
          @clicked="changeConversation"
        />
      </div>

      <v-list-item v-if="hasMoreConversations">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" class="text-center">
            <v-btn text class="grey--text" small @click="loadNextConversations">
              Load more...
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
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

<style scoped></style>
