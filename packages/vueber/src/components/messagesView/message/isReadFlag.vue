<template>
  <div class="caption mr-1">
    <!-- IS READ -->
    <v-tooltip v-if="isRead" left>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="success" small>mdi-check</v-icon>
      </template>
      <span>Message has been read.</span>
    </v-tooltip>
    <!-- IS NOT READ -->
    <v-tooltip v-else left>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="grey" small>
          mdi-chart-bubble
        </v-icon>
      </template>
      <span>Message has not been read.</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    isRead: {
      type: Boolean,
      default: false
    }
  }
}
</script>
