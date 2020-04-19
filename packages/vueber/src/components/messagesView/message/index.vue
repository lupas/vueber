<template>
  <div>
    <div v-if="showDateTime" class="sentDateColumn">
      <div class="text-center">
        <small>{{ message.sentDate | daymonthyeartime_1 }}</small>
      </div>
    </div>

    <div
      class="d-flex messageColumn"
      :class="{ 'flex-row-reverse': isOwnMessage, 'ml-auto': isOwnMessage }"
    >
      <avatar size="30px" :src="avatarPath" alt="Avatar" />

      <div
        class="chatBubble wrapLongWords"
        :class="dynBubbleClass"
        :style="dynBubbleStyle"
      >
        <!-- eslint-disable vue/no-v-html -->
        <span class="wrapLongWords" v-html="urlifiedMessage" />
      </div>

      <isReadFlag v-if="isOwnMessage" :is-read="message.isRead" />
    </div>
  </div>
</template>

<script>
import anchorme from 'anchorme'
import moment from 'moment'

export default {
  components: {
    isReadFlag: () => import('./isReadFlag'),
    avatar: () => import('./../../_elements/avatar'),
  },
  filters: {
    daymonthyeartime_1(datetime) {
      return moment(datetime).format('D MMM YYYY, HH:mm')
    },
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    selectedConversation: {
      type: Object,
      default: null,
    },
    currentUser: {
      type: Object,
      required: true,
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true,
    },
    showDateTime: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isOwnMessage() {
      return this.message.senderId === this.currentUser.id
    },
    dynBubbleStyle() {
      if (this.isOwnMessage) {
        return {
          background: '#3eaf7c',
          color: 'white',
        }
      }
      return {
        background: 'lightgrey',
      }
    },
    dynBubbleClass() {
      if (this.isOwnMessage) {
        return 'mr-3'
      }
      return 'ml-3'
    },
    avatarPath() {
      if (this.isOwnMessage) {
        if (this.currentUser.avatar) {
          return this.currentUser.avatar
        } else {
          const noAvatarImg = require('./../../../assets/noAvatar_xs.png')
          return noAvatarImg
        }
      }
      return this.chatpartnerAvatarPath
    },
    urlifiedMessage() {
      return anchorme(this.message.message, {
        attributes: [
          {
            name: 'target',
            value: '_blank',
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

.d-flex {
  display: flex;
}

.ml-auto {
  margin-left: auto;
}

.chatBubble {
  white-space: pre-line;
  border-radius: 15px;
  max-width: fit-content;
  padding: 6px 12px 6px 12px;
  margin-bottom: 0;
}

/* Wraps long words */
.wrapLongWords {
  overflow-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;
  -ms-word-wrap: break-word;
}

.messageColumn {
  padding: 20px 0 20px 0;
  max-width: 70%;
}

.mr-3 {
  margin-right: 12px;
}

.ml-3 {
  margin-left: 12px;
}
</style>
