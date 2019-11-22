<template>
  <div class="ctx">
    <v-popover offset="10" placement="top-left" :disabled="!shown">
      <slot name="activator" :showMenu="showMenu" />
      <template slot="popover">
        <picker title="Emoji's" emoji="blush" @select="addEmoji" />
      </template>
    </v-popover>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue'
import { VPopover } from 'v-tooltip'

export default {
  components: {
    Picker,
    VPopover
  },
  data: () => ({
    shown: false
  }),
  methods: {
    addEmoji() {
      // TODO
    },
    showMenu() {
      this.shown = true
    }
  }
}
</script>

<style>
.tooltip {
  left: -160px !important;
}
</style>
