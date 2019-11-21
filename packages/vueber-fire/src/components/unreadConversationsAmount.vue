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
    limit: {
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
    unreadCoversations: []
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
      return this.unreadCoversations.length
    }
  },
  watch: {
    unreadConversationsAmount(newVal) {
      this.$emit('updated', newVal)
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
        .limit(this.limit)
        .onSnapshot((query) => {
          const unreadConversations = unwrapFirestoreDoc(query)
          const filteredConversations = unreadConversations.filter(
            (x) => x.lastMessage.senderId !== userId
          )

          this.unreadCoversations = filteredConversations
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
