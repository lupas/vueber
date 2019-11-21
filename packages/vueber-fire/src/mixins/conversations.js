export default {
  data: () => ({
    conversations: {
      selected: null,
      listener: null,
      queryCursor: null,
      hasOlder: false,
      data: []
    }
  }),
  computed: {
    selectedConversation() {
      // Needed for watcher in messages
      return this.conversations.selected
    }
  },
  /**  ACTIONS */
  methods: {
    startConversationsListener() {
      if (this.conversations.listener) {
        // don't start if already started
        return
      }
      const userId = this.currentUser.id
      /* Careful: Starting a listener that needs to be stopped */
      this.conversations.listener = this.baseRef
        .where(`participantsArray`, 'array-contains', userId)
        .orderBy('lastMessage.sentDate', 'desc')
        .limit(1)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // Only if data comes from server
            if (!change.doc.metadata.hasPendingWrites) {
              const conversation = this._parseConversation(change.doc, userId)
              const index = this._checkIfConversationAlreadyExists(
                this.conversations.data,
                conversation
              )
              if (change.type === 'added' || change.type === 'modified') {
                if (index !== -1) {
                  // ...if item already exists in array
                  this.REPLACE_CONVERSATION({ index, conversation })
                } else {
                  this.ADD_CONVERSATION(conversation)
                }
              }

              if (change.type === 'removed') {
                if (index !== -1) {
                  // this.DELETE_CONVERSATION(conversation)
                  // TODO: Somehow filter between really deleted data & data just outside of the 5 queried elements
                }
              }
              this.SORT_CONVERSATIONS()
            }
          })
        })
    },

    stopConversationsListener() {
      try {
        this.conversationsListener()
      } catch (e) {
        // NOT AN ERROR: ignore
      }
      this.conversationsListener = null
    },

    /** --------------------------------------------------------------------------------------------------------- **/
    /** ---------------------------------------------- LOAD Actions --------------------------------------------- **/
    /** ----------------------------------(load from Firestore and save in Vuex)--------------------------------- **/

    async loadNextConversations() {
      const userId = this.currentUser.id

      let ref = this.baseRef
        .where(`participantsArray`, 'array-contains', userId)
        .orderBy('lastMessage.sentDate', 'desc')
        .limit(5)

      if (this.conversations.queryCursor) {
        ref = ref.startAfter(this.conversations.queryCursor)
      }

      const query = await ref.get()

      const oldConversationsArray = []
      query.forEach((doc) => {
        oldConversationsArray.push(this._parseConversation(doc, userId))
      })

      // Disable the load-older-posts button
      const hasOlderConvos = oldConversationsArray.length >= 5
      this.SET_HAS_OLDER_CONVERSATIONS(hasOlderConvos)

      // Overwrite Query Cursor for getting even older conversations
      // TODO: FIX
      // eslint-disable-next-line
      this.conversations.queryCursor = query.docs[query.docs.length - 1]

      this.MERGE_CONVERSATIONS(oldConversationsArray)
      this.SORT_CONVERSATIONS()
    },

    /** --------------------------------------------------------------------------------------------------------- **/
    /** ----------------------------------------------- POST Actions -------------------------------------------- **/
    /** ----------------------------------------(post update to Firestore)--------------------------------------- **/

    async postMessageToConversation(payload) {
      const newMessage = {
        hasPendingNotification: true,
        senderId: this.currentUser.id,
        senderName: this.currentUser.username,
        message: payload.message,
        sentDate: this.fireStoreObj.FieldValue.serverTimestamp(),
        isRead: false,
        isWelcomeMessage: false
      }

      const batch = this.fireStore.batch()
      const conversationRef = this.baseRef.doc(payload.conversationId)
      const messageRef = conversationRef.collection('messages').doc()

      batch.set(messageRef, newMessage)
      batch.update(conversationRef, {
        lastMessage: newMessage
      })
      try {
        await batch.commit()
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async markMessagesAsRead({ unreadMessages, conversation }) {
      const batch = this.$fireStore.batch()

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

      await batch.commit()
    },

    // HELPERS

    _checkIfConversationAlreadyExists(
      existingConversations,
      conversationToFind
    ) {
      return existingConversations.findIndex(
        (el) => el.id === conversationToFind.id
      )
    },

    _parseConversation(doc, currentUserId) {
      const conversation = doc.data()

      conversation.id = doc.id
      conversation.path = doc.ref.path

      conversation.lastMessage.sentDate = conversation.lastMessage.sentDate.toDate()

      delete conversation.participants[currentUserId]

      let chatpartner
      for (const i in conversation.participants) {
        chatpartner = conversation.participants[i]
        break
      }

      conversation._chatpartner = chatpartner
      conversation.lastMessage._ownMessage =
        conversation.lastMessage.senderId === currentUserId
      return conversation
    },

    /** MUTATIONS */
    // Unread Conversations
    SET_UNREAD_CONVERSATIONS(conversations) {
      this.unreadConversations.data = conversations
    },

    // Conversations
    SELECT_CONVERSATION(conversation) {
      this.conversations.selected = conversation
      // Mark conversation as read locally:
      if (conversation) {
        const index = this.conversations.data.findIndex(
          (el) => el.id === conversation.id
        )
        if (!this.conversations.data[index].lastMessage._ownMessage) {
          this.conversations.data[index].lastMessage.isRead = true
        }
      }
    },
    SET_HAS_OLDER_CONVERSATIONS(value) {
      this.conversations.hasOlder = value
    },
    MERGE_CONVERSATIONS(conversationsToAdd) {
      // adds them at the end of the array
      this.conversations.data = this.conversations.data.concat(
        conversationsToAdd
      )
    },
    ADD_CONVERSATION(conversation) {
      this.conversations.data.push(conversation)
    },
    REPLACE_CONVERSATION({ index, conversation }) {
      this.conversations.data.splice(index, 1, conversation)
    },
    DELETE_CONVERSATION({ index }) {
      this.conversations.data.splice(index, 1)
    },
    SORT_CONVERSATIONS() {
      this.conversations.data.sort((a, b) => {
        return b.lastMessage.sentDate - a.lastMessage.sentDate
      })
    }
  }
}
