<template>
  <div class="vueber mainContainer fullHeight" :class="responsiveClass">
    <div v-if="currentUser" class="leftSidebar">
      <leftSidebar
        :conversations="conversations"
        :selected-conversation="selectedConversation"
        :has-more-conversations="hasMoreConversations"
        @coversationChanged="changeConversation"
        @loadMoreConversations="loadMoreConversations"
      />
    </div>

    <div class="centralContainer fullHeight" :style="centralContainerStyle">
      <headerBar
        v-if="selectedConversation"
        class="headerBar"
        :selected-conversation="selectedConversation"
        :chatpartner="chatpartner"
        :chatpartner-avatar-path="chatpartnerAvatarPath"
        @showDetailsClicked="toggleDetails"
        @showConversationsClicked="toggleConversations"
      />

      <div v-if="selectedConversation" class="rightSubContainer">
        <div class="chatContainer">
          <messagesView
            :messages="messages"
            :selected-conversation="selectedConversation"
            :has-more-messages="hasMoreMessages"
            :chatpartner-avatar-path="chatpartnerAvatarPath"
            :current-user="currentUser"
            :loading="messagesLoading"
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

        <div v-if="showRightSidebar" class="rightSidebar">
          <rightSidebar
            :chatpartner-avatar-path="chatpartnerAvatarPath"
            :chatpartner="chatpartner"
            :user-actions="userActions"
            @backButtonPressed="toggleDetails"
          />
        </div>
      </div>

      <div v-else class="noSelectionView">
        <noSelectionView v-if="currentUser" @clicked="toggleConversations" />
        <loginView
          v-else
          @loginClicked="$emit('loginClicked')"
          @initializeClicked="$emit('initializeClicked', getDemoData())"
        />
      </div>
    </div>
  </div>
</template>

<script>
import leftSidebar from './leftSidebar/index'
import rightSidebar from './rightSidebar/index'
import messagesView from './messagesView/index'
import headerBar from './headerBar/index'
import inputFooter from './inputFooter/index'
import noSelectionView from './noSelectionView/index'
import loginView from './loginView/index'
import getDemoData from './../assets/demoData/getDemoData'

export default {
  components: {
    leftSidebar,
    rightSidebar,
    messagesView,
    headerBar,
    inputFooter,
    noSelectionView,
    loginView,
  },
  props: {
    conversations: {
      type: Array,
      default: () => [],
    },
    messages: {
      type: Array,
      default: () => [],
    },
    hasMoreConversations: {
      type: Boolean,
      required: true,
    },
    hasMoreMessages: {
      type: Boolean,
      default: false,
    },
    currentUser: {
      type: Object,
      default: null,
    },
    userActions: {
      type: Object,
      default: null,
    },
    messagesLoading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    getDemoData,
    showRightSidebar: false,
    onlyConversationsShown: false,
    selectedConversation: null,
  }),
  computed: {
    responsiveClass() {
      return {
        onlyConversationsShown: this.onlyConversationsShown,
        onlyDetailsShown: this.showRightSidebar,
      }
    },
    chatpartner() {
      if (this.selectedConversation) {
        return this.selectedConversation._chatpartner
      }
      return null
    },
    chatpartnerAvatarPath() {
      const noAvatarImg = require('./../assets/noAvatar_xs.png')
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
    centralContainerStyle() {
      if (this.currentUser) {
        return {
          width: `calc(100% - 350px)`,
        }
      }
      return 'width: 100%'
    },
  },
  mounted() {
    // If initialConversationId is provided, load the conversation.
    if (this.initialConversationId) {
      const conversation = this.conversations.data.find(
        (x) => x.id === this.initialConversationId
      )
      if (conversation) {
        this.changeConversation(conversation)
      }
    }
    // Makes sure that on mobile, the conversation view comes first
    if (!this.selectedConversation) {
      this.onlyConversationsShown = true
    }
  },
  methods: {
    changeConversation(conversation) {
      this.onlyConversationsShown = false
      this.selectedConversation = conversation
      // Mark conversation as read locally:
      if (conversation) {
        const index = this.conversations.findIndex(
          (el) => el.id === conversation.id
        )
        if (!this.conversations[index].lastMessage._ownMessage) {
          this.conversations[index].lastMessage.isRead = true
        }
      }
      this.$emit('conversationChanged', conversation)
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
    toggleConversations() {
      this.onlyConversationsShown = true // effect only in mobile
      this.$emit('conversationSelected', null)
    },
    toggleDetails() {
      this.showRightSidebar = !this.showRightSidebar
    },
  },
}
</script>

<style scoped>
/** REUSABLES */
.fullHeight {
  height: 100%;
}

/** CLASSES */

.vueber {
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  /** VARIABLES */
  --primary: #42b983;
  --selectedColor: rgba(0, 0, 0, 0.05);
}

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
  height: calc(100% - 57px);
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
  display: flex;
  flex-direction: column;
}

.inputFooter {
  padding-top: 8px;
  padding-bottom: 18px;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .leftSidebar {
    display: none;
  }
  .centralContainer {
    width: 100%;
  }

  /* If onlyConversationsShown on mobile */
  .onlyConversationsShown > .centralContainer {
    display: none;
  }

  .onlyConversationsShown > .leftSidebar {
    display: inherit;
    width: 100%;
  }

  /* If onlyDetailsShown on mobile */
  .onlyDetailsShown > .centralContainer > .rightSubContainer > .chatContainer,
  .onlyDetailsShown > .centralContainer > .headerBar {
    display: none;
  }

  .onlyDetailsShown > .rightSidebar {
    display: inherit;
    width: 100%;
  }

  .rightSidebar {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
  }
}
</style>
