<template>
  <div ref="messagesView">
    <v-row v-if="selectedConversation" class="fill-height">
      <v-col v-if="hasMoreMessages" cols="12" class="text-center mb-4">
        <v-btn text class="grey--text" small @click="loadMoreMessages">
          Load older messages
        </v-btn>
      </v-col>

      <v-col class="iphonexVerticalPadding">
        <v-col v-for="item in sortedMessages" :key="item.id" cols="12">
          <message
            :message="item"
            :selected-conversation="selectedConversation"
            :current-user="currentUser"
            :chatpartner-avatar-path="chatpartnerAvatarPath"
          />
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import anchorme from 'anchorme'

export default {
  components: {
    message: () => import('./message/index')
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
      const messages = this.messages
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
  watch: {
    messages: {
      handler() {
        if (this.loadMoreClicked) {
          this.scrollTo('top')
          this.loadMoreClicked = false
        }
        this.scrollTo('bottom')
      }
    }
  },
  methods: {
    loadMoreMessages() {
      this.loadMoreClicked = true
      this.$emit('loadMoreMessages')
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
