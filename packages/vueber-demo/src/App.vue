<template>
  <div class="fullHeight">
    <vueber
      :current-user="currentUser"
      :conversations="loadedConversations"
      :messages="loadedMessages"
      :has-more-conversations="hasMoreConversations"
      :has-more-messages="hasMoreMessages"
      :user-actions="userActions"
      @conversationChanged="handleSelectedConversation"
      @loadMoreConversations="loadNextConversations"
      @loadMoreMessages="loadMoreMessages"
      @messagePosted="postMessage"
      @conversationSelected="handleSelectedConversation"
    />
  </div>
</template>

<script>
import {
  getInitialConversations,
  getInitialUsers,
  getInitialMessages,
} from './initialData'

export default {
  name: 'App',
  components: {
    vueber: () => import('vueber'),
  },
  data: () => ({
    // SETTINGS
    userActions: {},
    // CURRENT SELECTION
    currentUsersId: 'user1',
    currentConversationId: null,
    loadedConversations: [],
    hasMoreConversations: true,
    hasMoreMessages: false,
    // DATABASE:
    users: getInitialUsers(),
    conversations: getInitialConversations(),
    messages: getInitialMessages(),
  }),
  computed: {
    currentUser() {
      return this.users.find((x) => x.id === this.currentUsersId)
    },
    loadedMessages() {
      return this.messages.filter(
        (x) => x.conversationId === this.currentConversationId
      )
    },
  },
  mounted() {
    this.loadedConversations = this.conversations
  },
  methods: {
    handleSelectedConversation(conversation) {
      this.currentConversationId = conversation.id
    },
    loadNextConversations() {
      //
    },
    loadMoreMessages() {
      //
    },
    postMessage(message) {
      this.messages.push({
        hasPendingNotification: true,
        isRead: false,
        message,
        senderId: this.currentUser.id,
        senderName: this.currentUser.username,
        sentDate: new Date(),
        id: 'sadasds',
        conversationId: 'conversation1',
      })
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.fullHeight {
  height: 100vh;
}
</style>
