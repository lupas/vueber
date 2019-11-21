<template>
  <vueber
    :current-user="currentUser"
    :conversations="conversations"
    :messages="messages"
    :selected-conversation="selectedConversation"
    :has-more-conversations="hasMoreConversations"
    :has-more-messages="hasMoreMessages"
    @conversationSelected="changeConversation"
    @loadMoreConversations="loadNextConversations"
    @loadMoreMessages="loadMoreMessages"
    @messagePosted="postMessage"
  >
  </vueber>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { unwrapFirestoreDoc } from 'firewings'
import { loadMessages, getMessagesRef } from '@/assets/services/db/vueber-fire'

export default {
  props: {
    listenerLimit: {
      type: Number,
      default: 10
    },
    currentUser: {
      type: Object,
      require: true
    },
    initialConversationId: {
      type: String,
      default: null
    }
  },
  components: {
    vueber: () => import('vueber')
  },
  data: () => ({
    messages: [],
    messagesQueryCursor: null,
    hasMoreMessages: false,
    messagesListener: null
  }),
  computed: {
    ...mapState({
      conversations: (state) => state.fireInbox.conversations.data,
      hasMoreConversations: (state) => state.fireInbox.conversations.hasOlder,
      selectedConversation: (state) => state.fireInbox.conversations.selected
    })
  },
  watch: {
    selectedConversation() {
      this.unsubscribeMessagesListener()

      /* Reset everything */
      this.messages = []
      this.messagesQueryCursor = null
      this.hasMoreMessages = false

      if (this.selectedConversation != null) {
        this.startMessagesListener()
      }
    }
  },
  async mounted() {
    // If no coversations are loaded, load first batch
    if (this.conversations.length === 0) {
      try {
        await this.loadNextConversations()
      } catch (e) {
        console.error(e)
        this.$sentry.captureException(e)
      }
    }
    this.startConversationsListener()

    // If initialConversationId is provided, load the conversation.
    if (this.initialConversationId) {
      const conversation = this.conversations.find(
        (x) => x.id === this.initialConversationId
      )
      if (conversation) {
        this.changeConversation(conversation)
      }
    }
  },
  methods: {
    ...mapActions({
      startConversationsListener: 'fireInbox/startConversationsListener',
      loadNextConversations: 'fireInbox/loadNextConversations'
    }),
    ...mapMutations({
      SELECT_CONVERSATION: 'fireInbox/SELECT_CONVERSATION'
    }),
    changeConversation(conversation) {
      this.SELECT_CONVERSATION(conversation)
    },
    unsubscribeMessagesListener() {
      if (typeof this.messagesListener === 'function') {
        this.messagesListener() // unsubscribes the listener
        this.messagesListener = null
      }
    },
    async loadMoreMessages() {
      const { messages, query } = await loadMessages({
        conversationId: this.selectedConversation.id,
        listenerLimit: this.listenerLimit,
        messagesQueryCursor: this.messagesQueryCursor
      })

      // Disable the load-older-messages button
      this.hasMoreMessages = messages.length >= this.listenerLimit

      // Overwrite Query Cursor for getting even older messages
      this.messagesQueryCursor = query.docs[query.docs.length - 1]

      this.messages = this.messages.concat(messages)
    },
    startMessagesListener() {
      const ref = getMessagesRef({
        conversationId: this.selectedConversation.id,
        listenerLimit: this.listenerLimit
      })

      /* Careful: Starting a listener that needs to be stopped */
      this.messagesListener = ref.onSnapshot((snapshot) => {
        const unreadMessages = []

        for (const change of snapshot.docChanges()) {
          // Only if data comes from server
          if (!change.doc.metadata.hasPendingWrites) {
            if (change.type === 'added') {
              const addedMessage = unwrapFirestoreDoc(change.doc)
              addedMessage.sentDate = addedMessage.sentDate.toDate()
              if (
                !addedMessage.isRead &&
                addedMessage.senderId !== this.currentUser.id
              ) {
                unreadMessages.push(addedMessage)
              }
              this.messages.push(addedMessage)
            }

            if (change.type === 'modified') {
              const modifiedMessage = unwrapFirestoreDoc(change.doc)
              modifiedMessage.sentDate = modifiedMessage.sentDate.toDate()

              const outdatedMsgIndex = this.messages.findIndex(
                (el) => el.id === modifiedMessage.id
              )
              if (outdatedMsgIndex !== -1) {
                // In this case, the message is updated (e.g. being read)
                this.$set(this.messages, outdatedMsgIndex, modifiedMessage)
              } else {
                // In this case, the message is a newly sent message
                this.messages.push(modifiedMessage)
              }
            }

            if (change.type === 'removed') {
              // let removedMessage = unwrapFirestoreDoc(change.doc)
              // this.messages.splice(this.messages.findIndex(el => el.id === removedMessage.id), 1)
            }
          }
        }

        if (this.messagesQueryCursor === null) {
          /* Initially set the query cursor for loading archived messages */
          this.messagesQueryCursor = snapshot.docs[snapshot.docs.length - 1]
          /* Activate the load older posts button if necessary */
          this.hasMoreMessages = snapshot.docs.length >= this.listenerLimit
        }

        /* Mark messages as read */
        this.$store.dispatch('fireInbox/markMessagesAsRead', {
          unreadMessages,
          conversation: this.selectedConversation
        })
      })
    },
    async postMessage(message) {
      await this.$store.dispatch('fireInbox/postMessageToConversation', {
        message,
        conversationId: this.selectedConversation.id
      })
    }
  }
}
</script>
