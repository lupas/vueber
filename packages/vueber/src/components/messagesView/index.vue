<template>
  <div ref="messagesView" class="messagesView">
    <div v-if="!loading">
      <div v-if="hasMoreMessages" class="loadMoreMessagesColumn">
        <btn class="marginx-auto" @click="loadMoreMessages">
          Load older messages
        </btn>
      </div>

      <message
        v-for="(item, index) in sortedMessages"
        :key="item.id"
        :message="item"
        :selected-conversation="selectedConversation"
        :current-user="currentUser"
        :chatpartner-avatar-path="chatpartnerAvatarPath"
        :show-date-time="shallShowDateTime(index)"
      />
    </div>
    <div v-else class="loadingView">
      <div>LOADING</div>
    </div>
  </div>
</template>

<script>
import anchorme from 'anchorme'

export default {
  components: {
    message: () => import('./message/index'),
    btn: () => import('../_elements/btn')
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    selectedConversation: {
      type: Object,
      default: null
    },
    hasMoreMessages: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      required: true
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    listenerLimit: 10,
    loadMoreClicked: false
  }),
  computed: {
    messagesLength() {
      return this.messages.length
    },
    sortedMessages() {
      const messages = [...this.messages]
      messages.sort((a, b) => {
        return a.sentDate - b.sentDate
      })
      return messages
    },
    urlifiedMessage() {
      return anchorme(this.message.message, {
        attributes: [
          {
            name: 'target',
            value: '_blank'
          }
        ]
      })
    }
  },
  updated() {
    if (this.loadMoreClicked) {
      this.scrollTo('top')
      this.loadMoreClicked = false
      return
    }
    this.$nextTick(() => {
      this.scrollTo('bottom')
    })
  },
  methods: {
    loadMoreMessages() {
      this.loadMoreClicked = true
      this.$emit('loadMoreMessages')
    },
    shallShowDateTime(index) {
      /* Don't show Date Time if last message is newer than X minutes */
      if (index === 0) {
        return true
      } else {
        const timeGapInMin = 15 // iof longer no message than X minutes
        const timeGapMiliSec = timeGapInMin * 60 * 1000 //
        const timeSinceLastMessage =
          Date.parse(this.sortedMessages[index].sentDate) -
          Date.parse(this.sortedMessages[index - 1].sentDate)
        return timeSinceLastMessage > timeGapMiliSec
      }
    },
    scrollTo(value) {
      const container = this.$refs.messagesView

      if (value === 'top') {
        container.scrollTop = 0
      }
      if (value === 'bottom') {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.messagesView {
  padding: 20px 20px 20px 20px;
}
.loadMoreMessagesColumn {
  text-align: center;
  margin: 0 0 20px 0;
}

.marginx-auto {
  margin-left: auto;
  margin-right: auto;
}

.loadingView {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
