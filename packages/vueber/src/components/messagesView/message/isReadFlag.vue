<template>
  <div class="isReadFlag">
    <!-- IS READ -->
    <icon v-if="isRead" :icon="mdiCheck" color="#4caf50" size="16" />
    <!-- IS NOT READ -->
    <icon v-else :icon="mdiChartBubble" size="16" />
  </div>
</template>

<script>
import { mdiCheck, mdiChartBubble } from '@mdi/js'

export default {
  components: {
    icon: () => import('../../_elements/icon')
  },
  props: {
    isRead: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    mdiCheck,
    mdiChartBubble
  })
}
</script>

<style scoped>
.isReadFlag {
  margin: auto 6px 0px 6px;
}
</style>
