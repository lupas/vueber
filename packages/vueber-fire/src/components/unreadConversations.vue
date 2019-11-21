<template>
  <div></div>
</template>

<script>
import { unwrapFirestoreDoc } from 'firewings'
export default {
  props: {
    currentUserId: {
      type: String,
      required: true
    },
    listenerLimit: {
      type: Number,
      default: 99
    },
    collection: {
      type: String,
      default: 'conversations'
    },
    firestoreInstance: {
      type: Object,
      default: null
    },
    nuxtFire: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    listener: null,
    unreadConversations: []
  }),
  computed: {
    fireStore() {
      if (this.nuxtFire) {
        return this.$fireStore
      }
      return this.firestoreInstance
    },
    baseRef() {
      return this.fireStore.collection(this.collection)
    },
    unreadConversationsAmount() {
      return this.unreadConversations.length
    }
  },
  watch: {
    unreadConversationsAmount() {
      this.$emit('updated', this.unreadConversations)
    }
  },
  mounted() {
    this.startListener()
  },
  destroyed() {
    this.stopListener()
  },
  methods: {
    startListener() {
      const userId = this.currentUserId
      /* Careful: Starting a listener that needs to be stopped */
      this.listener = this.baseRef
        .where(`participantsArray`, 'array-contains', userId)
        .where('lastMessage.isRead', '==', false)
        .orderBy('lastMessage.sentDate', 'desc')
        .limit(this.listenerLimit)
        .onSnapshot((query) => {
          const unreadConversations = unwrapFirestoreDoc(query)
          const filteredConversations = unreadConversations.filter(
            (x) => x.lastMessage.senderId !== userId
          )

          this.unreadConversations = filteredConversations
        })
    },

    stopListener() {
      try {
        this.listener() // unsubscribes the listener
      } catch (e) {
        // NOT AN ERROR: ignore
      }
      this.listener = null
    }
  }
}
</script>
