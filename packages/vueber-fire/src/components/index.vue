<template>
  <vueber
    :current-user="currentUser"
    :conversations="conversations.data"
    :messages="messages.data"
    :selected-conversation="conversations.selected"
    :has-more-conversations="conversations.hasOlder"
    :has-more-messages="messages.hasMore"
    @conversationSelected="changeConversation"
    @loadMoreConversations="loadNextConversations"
    @loadMoreMessages="loadMoreMessages"
    @messagePosted="postMessage"
  />
</template>

<script>
import messagesMixin from '../mixins/messages.js'
import conversationsMixin from '../mixins/conversations.js'

export default {
  components: {
    vueber: () => import('vueber')
  },
  mixins: [messagesMixin, conversationsMixin],
  props: {
    listenerLimit: {
      type: Number,
      default: 10
    },
    currentUser: {
      type: Object,
      required: true
    },
    initialConversationId: {
      type: String,
      default: null
    },
    conversationsRef: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    // If no coversations are loaded, load first batch
    if (this.conversations.data.length === 0) {
      try {
        await this.loadNextConversations()
      } catch (e) {
        console.error(e)
      }
    }

    // Start the conversations listener
    this.startConversationsListener()

    // If initialConversationId is provided, load the conversation.
    if (this.initialConversationId) {
      const conversation = this.conversations.data.find(
        (x) => x.id === this.initialConversationId
      )
      if (conversation) {
        this.changeConversation(conversation)
      }
    }
  },
  methods: {
    changeConversation(conversation) {
      this.SELECT_CONVERSATION(conversation)
    }
  }
}
</script>
