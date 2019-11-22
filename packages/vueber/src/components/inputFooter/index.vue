<template>
  <div class="mainContainer">
    <textField
      v-model="newMessage"
      @blur="blurHandler"
      @focus="focusHandler"
      @keydown="inputHandler"
      @click:append="sendMessage()"
    >
      <template v-slot:append>
        <emojiPicker @emojiSelected="addEmoji">
          <template v-slot:activator="{ showMenu }">
            <btn @click="showMenu">
              <icon :icon="mdiEmoticonOutline" size="24" />
            </btn>
          </template>
        </emojiPicker>
      </template>
      <template v-slot:append-outer>
        <btn
          class="primary--text ml-2 pl-0 mr-3"
          :disabled="sendButtonDisabled"
          :loading="buttonLoading"
          @click="sendMessage()"
        >
          <icon
            :icon="mdiSend"
            color="#42b983"
            size="24"
            :disabled="sendButtonDisabled"
          />
        </btn>
      </template>
    </textField>
  </div>
</template>

<script>
import { mdiEmoticonOutline, mdiSend } from '@mdi/js'

export default {
  components: {
    icon: () => import('../_elements/icon'),
    btn: () => import('../_elements/btn'),
    textField: () => import('../_elements/textField'),
    emojiPicker: () => import('.//emojiPicker')
  },
  props: {
    selectedConversation: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    mdiSend,
    mdiEmoticonOutline,
    newMessage: '',
    buttonLoading: false,
    keyboardClosed: true,
    maxLengthPerMessage: 3000
  }),
  computed: {
    sendButtonDisabled() {
      return (
        this.newMessage.length > this.maxLengthPerMessage ||
        this.newMessage.length < 1
      )
    }
  },
  methods: {
    blurHandler() {
      // TODO: To implement properly
      // On mobile devices, keyboard closes -> does not push messages down again
      if (this.GLOBAL_isMobile) {
        this.$emit('keyboardClosed')
      }
      this.keyboardClosed = true
    },
    focusHandler() {
      // TODO: To implement properly
      // On mobile devices, keyboard opens -> automatically pushes messages up, do nothing
      this.keyboardClosed = false
    },
    async sendMessage() {
      if (this.buttonLoading) {
        // Enter Button has been quicked rapidly, so message would be sent twice
        return
      }
      this.buttonLoading = true
      try {
        this.$emit('messagePosted', this.newMessage)
      } catch (e) {
        console.error(e)
      } finally {
        this.buttonLoading = false
      }
      this.newMessage = ''
    },
    inputHandler(input) {
      if (input.keyCode === 13 && !input.shiftKey && !this.sendButtonDisabled) {
        input.preventDefault()
        this.sendMessage()
        return
      }
      if (input.keyCode === 13 && input.shiftKey) {
        // Shift+Enter, for now do nothing
      }
    },
    addEmoji(emoji) {
      this.newMessage = this.newMessage.concat(emoji.native)
    }
  }
}
</script>

<style scoped>
.mainContainer {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
