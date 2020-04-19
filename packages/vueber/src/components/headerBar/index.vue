<template>
  <toolbarWrapper @goBackPressed="showConversations">
    <template v-slot:left-items>
      <avatar
        size="40px"
        :src="chatpartnerAvatarPath"
        alt="Chatpartner Avatar"
      />
      <span class="username">{{ chatpartner.username }}</span>
    </template>

    <template v-slot:right-items>
      <btn @click="showDetails">
        <icon :icon="mdiInformationOutline" size="24" />
      </btn>
    </template>
  </toolbarWrapper>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'

export default {
  components: {
    avatar: () => import('../_elements/avatar'),
    toolbarWrapper: () => import('../_elements/toolbarWrapper'),
    icon: () => import('../_elements/icon'),
    btn: () => import('../_elements/btn'),
  },
  props: {
    chatpartner: {
      type: Object,
      required: true,
    },
    selectedConversation: {
      type: Object,
      required: true,
    },
    chatpartnerAvatarPath: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    mdiInformationOutline,
  }),
  computed: {
    additionalInfo() {
      return {
        conversationId: this.conversation.id,
      }
    },
  },
  methods: {
    showConversations() {
      this.$emit('showConversationsClicked')
    },
    showDetails() {
      this.$emit('showDetailsClicked')
    },
  },
}
</script>

<style scoped>
.username {
  font-size: 17px;
  font-weight: bold;
  margin-left: 6px;
}
</style>
