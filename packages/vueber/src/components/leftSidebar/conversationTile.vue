<template>
  <div
    class="listItem"
    :class="{ active: isActive }"
    @click="handeClick(conversation)"
  >
    <avatar
      class="listItemAvatar"
      size="40px"
      :src="avatarPath"
      alt="User Avatar"
    />

    <div class="listItemContent">
      <p class="listItemTitle">
        {{ conversation._chatpartner.username }} -
        <small>{{ conversation.lastMessage.sentDate | daymonthyear_1 }}</small>
      </p>
      <p class="listItemSubtitle ellipseLongText">
        <span v-if="conversation.lastMessage._ownMessage"> You: </span>
        <span>{{ conversation.lastMessage.message }}</span>
      </p>
    </div>

    <div class="listItemReadFlag">
      <icon
        v-if="
          !conversation.lastMessage.isRead &&
            !conversation.lastMessage._ownMessage
        "
        color="red"
        :icon="mdiNewBox"
        size="16"
      />

      <icon
        v-if="
          conversation.lastMessage._ownMessage &&
            conversation.lastMessage.isRead
        "
        color="success"
        :icon="mdiCheck"
        size="16"
      />

      <icon
        v-if="
          conversation.lastMessage._ownMessage &&
            !conversation.lastMessage.isRead
        "
        color="grey"
        :icon="mdiChartBubble"
        size="16"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mdiNewBox, mdiCheck, mdiChartBubble } from '@mdi/js'

export default {
  components: {
    avatar: () => import('../_elements/avatar'),
    icon: () => import('../_elements/icon')
  },
  filters: {
    daymonthyear_1(datetime) {
      return moment(datetime).format('D MMM YYYY')
    }
  },
  props: {
    conversation: {
      type: Object,
      required: true
    },
    selectedConversation: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    mdiNewBox,
    mdiCheck,
    mdiChartBubble
  }),
  computed: {
    avatarPath() {
      const noAvatarImg =
        'https://firebasestorage.googleapis.com/v0/b/amiji-prd.appspot.com/o/_global%2FnoAvatarImg%2FnoAvatar_xs.png?alt=media&token=defd16ac-1bc7-41b1-8ee2-22fa717eb3bd'
      try {
        if (this.conversation._chatpartner.avatarPath) {
          return this.conversation._chatpartner.avatarPath
        } else {
          return noAvatarImg
        }
      } catch (e) {
        return noAvatarImg
      }
    },
    isActive() {
      return (
        this.selectedConversation &&
        this.conversation.id === this.selectedConversation.id
      )
    }
  },
  methods: {
    handeClick(conversation) {
      this.$emit('clicked', conversation)
    }
  }
}
</script>

<style scoped>
.listItem {
  height: 61px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.active.listItem {
  background-color: rgba(0, 0, 0, 0.05);
}

.listItemAvatar {
  margin-right: 16px;
}

.listItemContent {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.listItemTitle {
  margin: 0;
  font-size: 1rem;
}

.listItemSubtitle {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.54);
  margin: 0;
}

.listItemReadFlag {
  margin-left: auto;
  min-width: 25px;
  max-width: 25px;
  text-align: center;
}

/* Wraps long words */
.ellipseLongText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
