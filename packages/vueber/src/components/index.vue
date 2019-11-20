<template>
  <div class="mainContainer fullHeight">
    <div class="leftSidebar">
      <leftSidebar
        :conversations="conversations"
        :selected-conversation="selectedConversation"
        :has-more-conversations="hasMoreConversations"
        @coversationChanged="handleChangedConversation"
        @loadMoreConversations="loadMoreConversations"
      />
    </div>

    <div class="rightContainer fullHeight">
      <headerBar
        v-if="selectedConversation"
        :selected-conversation="selectedConversation"
        :chatpartner="chatpartner"
        :chatpartnerAvatarPath="chatpartnerAvatarPath"
        @showDetailsClicked="showRightSidebar = !showRightSidebar"
      />

      <div
        class="rightSubContainer"
        v-if="selectedConversation"
      >
        <div class="chatContainer">
          <messagesView
            :messages="messages"
            :selected-conversation="selectedConversation"
            :has-more-messages="hasMoreMessages"
            :chatpartnerAvatarPath="chatpartnerAvatarPath"
            :current-user="currentUser"
            @loadMoreMessages="loadMoreMessages"
            class="messagesView"
          />

          <inputFooter
            v-if="selectedConversation"
            :selected-conversation="selectedConversation"
            @keyboardClosed="scrollTo('bottom')"
            @messagePosted="messagePosted"
            class="inputFooter"
          />
        </div>

        <div
          v-if="showRightSidebar"
          class="rightSidebar"
        >
          <rightSidebar
            :chatpartnerAvatarPath="chatpartnerAvatarPath"
            :chatpartner="chatpartner"
          />
        </div>
      </div>

      <div
        v-else
        class="noSelectionView"
      >
        <noSelectionView />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    leftSidebar: () => import('./leftSidebar/index'),
    rightSidebar: () => import('./rightSidebar/index'),
    messagesView: () => import('./messagesView/index'),
    headerBar: () => import('./headerBar/index'),
    inputFooter: () => import('./inputFooter/index'),
    noSelectionView: () => import('./noSelectionView/index')
  },
  props: {
    conversations: {
      type: Array,
      default: () => []
    },
    messages: {
      type: Array,
      default: () => []
    },
    selectedConversation: {
      type: Object,
      default: null
    },
    hasMoreConversations: {
      type: Boolean,
      required: true
    },
    hasMoreMessages: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showRightSidebar: false
  }),
  computed: {
    chatpartner() {
      if (this.selectedConversation) {
        return this.selectedConversation._chatpartner
      }
      return null
    },
    chatpartnerAvatarPath() {
      const noAvatarImg =
        'https://firebasestorage.googleapis.com/v0/b/amiji-prd.appspot.com/o/_global%2FnoAvatarImg%2FnoAvatar_xs.png?alt=media&token=defd16ac-1bc7-41b1-8ee2-22fa717eb3bd'
      try {
        if (this.selectedConversation._chatpartner.avatarPath) {
          return this.selectedConversation._chatpartner.avatarPath
        } else {
          return noAvatarImg
        }
      } catch (e) {
        return noAvatarImg
      }
    }
  },
  methods: {
    handleChangedConversation(conversation) {
      this.$emit('conversationSelected', conversation)
    },
    loadMoreConversations() {
      this.$emit('loadMoreConversations')
    },
    loadMoreMessages() {
      this.$emit('loadMoreMessages')
    },
    messagePosted(message) {
      this.$emit('messagePosted', message)
    },
    scrollTo(value) {
      // TODO: To implement
    }
  }
}
</script>

<style scoped>
/** REUSABLES */
.fullHeight {
  height: 100%;
}

/** CLASSES */

.mainContainer {
  display: flex;
  flex-direction: row;
  background-color: white;
  overflow: hidden;
}

.rightSubContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.chatContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.messagesView {
  overflow-y: scroll;
  height: 100%;
}

.noSelectionView {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rightSidebar {
  overflow-y: scroll;
  height: 100%;
  width: 350px;
  border-left: solid #d3d3d380 1px;
}

.leftSidebar {
  overflow-y: scroll;
  height: 100%;
  width: 350px;
  border-right: solid #d3d3d380 1px;
}

.rightContainer {
  width: calc(100% - 350px);
  display: flex;
  flex-direction: column;
}

.inputFooter {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
