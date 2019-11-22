import { unwrapFirestoreDoc } from 'firewings'

export default {
  data: () => ({
    messages: {
      data: [],
      queryCursor: null,
      hasMore: false,
      listener: null
    }
  }),
  methods: {
    changeListener(conversation) {
      this.unsubscribeMessagesListener()

      /* Reset everything */
      this.messages.data = []
      this.messages.queryCursor = null
      this.messages.hasMore = false

      if (conversation != null) {
        this.startMessagesListener()
      }
    },
    getMessagesRef() {
      return this.baseRef
        .doc(this.conversations.selected.id)
        .collection('messages')
        .orderBy('sentDate', 'desc')
        .limit(this.listenerLimit)
    },
    unsubscribeMessagesListener() {
      if (typeof this.messages.listener === 'function') {
        this.messages.listener() // unsubscribes the listener
        this.messages.listener = null
      }
    },
    async loadMessages() {
      let ref = this.getMessagesRef({
        conversationId: this.conversations.selected.id,
        listenerLimit: this.listenerLimit
      })
      ref = ref.startAfter(this.messages.queryCursor)

      try {
        const query = await ref.get()
        const messages = []
        for (const doc of query.docs) {
          const message = doc.data()
          message.id = doc.id
          message.path = doc.ref.path
          message.sentDate = message.sentDate.toDate()
          messages.push(message)
        }
        return { messages, query }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async loadMoreMessages() {
      const { messages, query } = await this.loadMessages()

      // Disable the load-older-messages button
      this.messages.hasMore = messages.length >= this.listenerLimit

      // Overwrite Query Cursor for getting even older messages
      this.messages.queryCursor = query.docs[query.docs.length - 1]

      this.messages.data = this.messages.data.concat(messages)
    },
    startMessagesListener() {
      const ref = this.getMessagesRef({
        conversationId: this.conversations.selected.id,
        listenerLimit: this.listenerLimit
      })

      /* Careful: Starting a listener that needs to be stopped */
      this.messages.listener = ref.onSnapshot((snapshot) => {
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
              this.messages.data.push(addedMessage)
            }

            if (change.type === 'modified') {
              const modifiedMessage = unwrapFirestoreDoc(change.doc)
              modifiedMessage.sentDate = modifiedMessage.sentDate.toDate()

              const outdatedMsgIndex = this.messages.data.findIndex(
                (el) => el.id === modifiedMessage.id
              )
              if (outdatedMsgIndex !== -1) {
                // In this case, the message is updated (e.g. being read)
                this.$set(this.messages.data, outdatedMsgIndex, modifiedMessage)
              } else {
                // In this case, the message is a newly sent message
                this.messages.data.push(modifiedMessage)
              }
            }

            if (change.type === 'removed') {
              // let removedMessage = unwrapFirestoreDoc(change.doc)
              // this.messages.data.splice(this.messages.data.findIndex(el => el.id === removedMessage.id), 1)
            }
          }
        }

        if (this.messages.queryCursor === null) {
          /* Initially set the query cursor for loading archived messages */
          this.messages.queryCursor = snapshot.docs[snapshot.docs.length - 1]
          /* Activate the load older posts button if necessary */
          this.messages.hasMore = snapshot.docs.length >= this.listenerLimit
        }

        /* Mark messages as read */
        this.markMessagesAsRead({
          unreadMessages,
          conversation: this.conversations.selected
        })
      })
    },
    async postMessage(message) {
      await this.postMessageToConversation({
        message,
        conversationId: this.conversations.selected.id
      })
    }
  }
}
