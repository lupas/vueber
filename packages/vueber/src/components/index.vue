<template>
  <div
    class="mainContainer fullHeight"
    :class="{ onlyConversationsShown: onlyConversationsShown }"
  >
    <div class="leftSidebar">
      <leftSidebar
        :conversations="conversations"
        :selected-conversation="selectedConversation"
        :has-more-conversations="hasMoreConversations"
        @coversationChanged="handleChangedConversation"
        @loadMoreConversations="loadMoreConversations"
      />
    </div>

    <div class="centralContainer fullHeight">
      <headerBar
        v-if="selectedConversation"
        :selected-conversation="selectedConversation"
        :chatpartner="chatpartner"
        :chatpartner-avatar-path="chatpartnerAvatarPath"
        @showDetailsClicked="showRightSidebar = !showRightSidebar"
        @showConversationsClicked="showOnlyConversations"
      />

      <div v-if="selectedConversation" class="rightSubContainer">
        <div class="chatContainer">
          <messagesView
            :messages="messages"
            :selected-conversation="selectedConversation"
            :has-more-messages="hasMoreMessages"
            :chatpartner-avatar-path="chatpartnerAvatarPath"
            :current-user="currentUser"
            class="messagesView"
            @loadMoreMessages="loadMoreMessages"
          />

          <inputFooter
            v-if="selectedConversation"
            :selected-conversation="selectedConversation"
            class="inputFooter"
            @keyboardClosed="scrollTo('bottom')"
            @messagePosted="messagePosted"
          />
        </div>

        <div v-if="showOnlyConversations" class="rightSidebar">
          <rightSidebar
            :chatpartner-avatar-path="chatpartnerAvatarPath"
            :chatpartner="chatpartner"
          />
        </div>
      </div>

      <div v-else class="noSelectionView">
        <noSelectionView @clicked="showOnlyConversations" />
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
    showRightSidebar: false,
    onlyConversationsShown: false
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
    },
    mainContainerWidth() {
      console.log(this.$refs.mainContainer.clientWidth)
      return this.$refs.mainContainer.clientWidth
    }
  },
  methods: {
    handleChangedConversation(conversation) {
      this.onlyConversationsShown = false
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
    scrollTo() {
      // TODO: To implement
    },
    showOnlyConversations() {
      this.onlyConversationsShown = true
      this.$emit('conversationSelected', null)
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

.centralContainer {
  width: calc(100% - 350px);
  display: flex;
  flex-direction: column;
}

.inputFooter {
  padding-top: 8px;
  padding-bottom: 8px;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .leftSidebar,
  .rightSidebar {
    display: none;
  }
  .centralContainer {
    width: 100%;
  }

  .onlyConversationsShown > .centralContainer {
    display: none;
  }

  .onlyConversationsShown > .leftSidebar {
    display: inherit;
    width: 100%;
  }
}
</style>
