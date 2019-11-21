<template>
  <div class="mainContainer">
    <v-text-field
      v-model="newMessage"
      outlined
      hide-details
      rounded
      dense
      background-color="grey lighten-4"
      placeholder="Type a message..."
      @blur="blurHandler"
      @focus="focusHandler"
      @keydown="inputHandler"
      @click:append="sendMessage()"
    >
      <template v-slot:append>
        <v-menu
          v-if="$vuetify.breakpoint.smAndUp"
          :close-on-content-click="false"
          offset-x
          left
        >
          <template v-slot:activator="{ on }">
            <v-icon class="grey--text" text icon v-on="on">
              mdi-emoticon-outline
            </v-icon>
          </template>
          <clientOnly>
            <picker title="Emoji's" emoji="kr" @select="addEmoji" />
          </clientOnly>
        </v-menu>
      </template>
      <template v-slot:append-outer>
        <v-icon
          :loading="buttonLoading"
          :disabled="sendButtonDisabled"
          text
          class="primary--text ml-2 pl-0 mr-3"
          @click="sendMessage()"
        >
          mdi-send
        </v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue'

export default {
  components: {
    Picker
  },
  props: {
    selectedConversation: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newMessage: '',
      buttonLoading: false,
      keyboardClosed: true,
      maxLengthPerMessage: 3000
    }
  },
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
