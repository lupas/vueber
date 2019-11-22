<template>
  <vueber
    :current-user="currentUser"
    :conversations="conversations.data"
    :messages="messages.data"
    :has-more-conversations="conversations.hasOlder"
    :has-more-messages="messages.hasMore"
    :user-actions="userActions"
    @loadMoreConversations="loadNextConversations"
    @loadMoreMessages="loadMoreMessages"
    @messagePosted="postMessage"
    @conversationChanged="handleConversationChanged"
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
    collection: {
      type: String,
      default: 'conversations'
    },
    firestoreInstance: {
      type: Object,
      default: null
    },
    firestoreObject: {
      type: Object,
      default: null
    },
    nuxtFire: {
      type: Boolean,
      default: false
    },
    userActions: {
      type: Object,
      default: null
    }
  },
  computed: {
    fireStore() {
      if (this.nuxtFire) {
        return this.$fireStore
      }
      return this.firestoreInstance
    },
    fireStoreObj() {
      if (this.nuxtFire) {
        return this.$fireStoreObj
      }
      return this.firestoreObject
    },
    baseRef() {
      return this.fireStore.collection(this.collection)
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
  }
}
</script>
