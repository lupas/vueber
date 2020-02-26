<template>
  <vueber
    :current-user="currentUser"
    :conversations="conversations"
    :messages="messages"
    :messages-loading="messagesLoading"
    :has-more-conversations="hasOlderConversations"
    :has-more-messages="hasMoreMessages"
    :user-actions="userActions"
    @loginClicked="$emit('loginClicked')"
    @loadMoreConversations="loadNextConversations"
    @loadMoreMessages="loadMoreMessages"
    @messagePosted="handleMessagePosted"
    @conversationChanged="handleConversationChanged"
  />
</template>

<script>
import { serializeConversation, serializeMessage } from './../helpers/index'

export default {
  components: {
    vueber: () => import('vueber')
  },
  props: {
    conversationsLimit: {
      type: Number,
      default: 5
    },
    messagesLimit: {
      type: Number,
      default: 15
    },
    currentUser: {
      type: Object,
      default: null
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
      type: Boolean
    },
    userActions: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    // Conversations
    conversations: [],
    hasOlderConversations: true,
    selectedConversation: null,
    currentConversationsLimit: 1,
    // Messages
    messages: [],
    hasMoreMessages: true,
    currentMessagesLimit: 1,
    messagesLoading: false
  }),
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
  watch: {
    currentUser: {
      immediate: true,
      handler(user) {
        if (user) {
          // Load Initial Conversations
          this.bindConversations()
        }
      }
    },
    selectedConversation: {
      immediate: true,
      handler(conversation) {
        if (conversation) {
          this.resetMessageLimit()
          this.bindMessages()
        }
      }
    },
    currentConversationsLimit() {
      if (this.currentUser) {
        this.bindConversations()
      }
    },
    currentMessagesLimit() {
      this.bindMessages()
    },
    messages() {
      this.messagesLoading = false
    }
  },
  beforeMount() {
    // Set initial limits
    this.currentConversationsLimit = this.conversationsLimit
    this.resetMessageLimit()
  },
  methods: {
    /*************************************************************** */
    /***************************** Bindings ************************ */
    /*************************************************************** */
    bindConversations() {
      this.$bind(
        'conversations',
        this.baseRef
          .where(`participantsArray`, 'array-contains', this.currentUser.id)
          .orderBy('lastMessage.sentDate', 'desc')
          .limit(this.currentConversationsLimit),
        { serialize: serializeConversation(this.currentUser.id), wait: true }
      )
    },
    bindMessages() {
      if (this.selectedConversation) {
        this.$bind(
          'messages',
          this.baseRef
            .doc(this.selectedConversation.id)
            .collection('messages')
            .orderBy('sentDate', 'desc')
            .limit(this.currentMessagesLimit),
          { serialize: serializeMessage, wait: true }
        )
      }
    },
    /*************************************************************** */
    /**************************** LOCAL FUNCTIONS ****************** */
    /*************************************************************** */
    handleConversationChanged(conversation) {
      this.messagesLoading = true
      this.selectedConversation = conversation
    },
    loadNextConversations() {
      this.currentConversationsLimit += this.conversationsLimit
    },
    async handleMessagePosted(message) {
      try {
        await this.postMessageToConversation({ message })
      } catch (e) {
        console.error(e)
        alert(e)
      }
    },
    loadMoreMessages() {
      this.currentMessagesLimit += this.messagesLimit
    },
    resetMessageLimit() {
      this.currentMessagesLimit = this.messagesLimit
    },
    /*************************************************************** */
    /***************************** ACTIONS ************************* */
    /*************************************************************** */

    async postMessageToConversation({ message }) {
      const newMessage = {
        hasPendingNotification: true,
        senderId: this.currentUser.id,
        senderName: this.currentUser.username,
        message,
        sentDate: this.fireStoreObj.FieldValue.serverTimestamp(),
        isRead: false
      }

      const batch = this.fireStore.batch()
      const conversationRef = this.baseRef.doc(this.selectedConversation.id)
      const messageRef = conversationRef.collection('messages').doc()

      batch.set(messageRef, newMessage)
      // batch.update(conversationRef, {
      //   lastMessage: newMessage
      // })
      try {
        await batch.commit()
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async markMessagesAsRead({ unreadMessages, conversation }) {
      const batch = this.fireStore.batch()

      for (const message of unreadMessages) {
        const messageRef = this.$fireStore.doc(message.path)
        batch.update(messageRef, {
          isRead: true
        })
      }

      if (unreadMessages.length > 0) {
        const conversationRef = this.$fireStore.doc(conversation.path)
        batch.update(conversationRef, {
          'lastMessage.isRead': true
        })
      }
      try {
        await batch.commit()
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}
</script>
