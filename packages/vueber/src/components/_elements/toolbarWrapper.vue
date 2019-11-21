<template>
  <div class="toolbar" :style="dynStyleToolbar">
    <div class="leftItems">
      <v-btn
        class="showConversationsButton"
        small
        icon
        text
        @click="handleGoBack"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <slot name="left-items" />
    </div>

    <div class="spacer"></div>

    <div class="rightItems">
      <slot name="right-items" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dynStyleToolbar() {
      return {
        'border-bottom': !this.flat ? 'solid #d3d3d380 1px' : null
      }
    }
  },
  methods: {
    handleGoBack() {
      this.$emit('goBackPressed')
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  height: 60px;
  padding: 8px 8px 8px 16px;
}

.leftItems {
  display: flex;
  align-items: center;
}

.spacer {
  -webkit-box-flex: 1 !important;
  flex-grow: 1 !important;
}

.showBackButton {
  display: none;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .showBackButton {
    display: initial;
  }
}
</style>
