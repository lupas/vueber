<template>
  <v-list-item
    :value="currentConversation && conversation.id === currentConversation.id"
    @click="handeClick(conversation)"
  >
    <v-list-item-avatar>
      <v-img :src="avatarPath" alt="User Avatar" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{ conversation._chatpartner.username }} -
        <small>{{ conversation.lastMessage.sentDate | daymonthyear_1 }}</small>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span v-if="conversation.lastMessage._ownMessage"> You: </span>
        {{ conversation.lastMessage.message }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-tooltip
        v-if="
          !conversation.lastMessage.isRead &&
            !conversation.lastMessage._ownMessage
        "
        right
      >
        <template v-slot:activator="{ on }">
          <v-icon color="red" v-on="on">
            mdi-new-box
          </v-icon>
        </template>
        <span>New message.</span>
      </v-tooltip>
      <v-tooltip
        v-if="
          conversation.lastMessage._ownMessage &&
            conversation.lastMessage.isRead
        "
        right
      >
        <template v-slot:activator="{ on }">
          <v-icon color="success" small v-on="on">
            mdi-check
          </v-icon>
        </template>
        <span>Message has been read.</span>
      </v-tooltip>
      <v-tooltip
        v-if="
          conversation.lastMessage._ownMessage &&
            !conversation.lastMessage.isRead
        "
        right
      >
        <template v-slot:activator="{ on }">
          <v-icon color="grey" small v-on="on">
            mdi-chart-bubble
          </v-icon>
        </template>
        <span>Message has not been read.</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      required: true
    },
    currentConversation: {
      type: Object,
      default: null
    }
  },
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
    }
  },
  methods: {
    handeClick(conversation) {
      this.$emit('clicked', conversation)
    }
  }
}
</script>
