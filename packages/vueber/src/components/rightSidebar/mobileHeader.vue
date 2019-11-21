<template>
  <div class="toolbar iPhonexTopPadding">
    <v-btn class="showBackButton" small icon text @click="backButtonPressed">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    backButtonPressed() {
      this.$emit('backButtonPressed')
    }
  }
}
</script>

<style scoped>
.toolbar {
  height: 57px;
  padding: 8px 8px 8px 16px;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .showBackButton {
    display: initial;
  }
}
</style>
