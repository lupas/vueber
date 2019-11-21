<template>
  <v-row>
    <v-col cols="12">
      <div class="text-center">
        <small>{{ message.sentDate | daymonthyeartime_1 }}</small>
      </div>
    </v-col>

    <v-col
      cols="12"
      sm="10"
      md="7"
      class="d-flex"
      :class="{ 'flex-row-reverse': isOwnMessage, 'ml-auto': isOwnMessage }"
    >
      <avatar :avatar-path="avatarPath" />

      <div
        class="chatBubble wrapLongWords px-3 py-2 mb-0"
        :class="dynBubbleClass"
      >
        <!-- eslint-disable vue/no-v-html -->
        <span class="wrapLongWords" v-html="urlifiedMessage" />
      </div>

      <isReadFlag v-if="isOwnMessage" :is-read="message.isRead" />
    </v-col>
  </v-row>
</template>

<script>
import anchorme from 'anchorme'

export default {
  components: {
    isReadFlag: () => import('./isReadFlag'),
    avatar: () => import('./avatar')
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    selectedConversation: {
      type: Object,
      default: null
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
  computed: {
    isOwnMessage() {
      return this.message.senderId === this.currentUser.id
    },
    dynBubbleClass() {
      if (this.isOwnMessage) {
        return 'blue white--text mr-3'
      }
      return 'grey lighten-3 ml-3'
    },
    avatarPath() {
      if (this.isOwnMessage) {
        return this.currentUser.avatar
      }
      return this.chatpartnerAvatarPath
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
  }
}
</script>

<style scoped>
.chatBubble {
  white-space: pre-line;
  border-radius: 15px;
  max-width: fit-content;
}

/* Wraps long words */
.wrapLongWords {
  overflow-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;
  -ms-word-wrap: break-word;
}
</style>
