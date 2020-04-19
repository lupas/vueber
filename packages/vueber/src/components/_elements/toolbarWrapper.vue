<template>
  <div class="toolbar" :style="dynStyleToolbar">
    <div class="leftItems">
      <div class="backButton">
        <btn @click="handleGoBack">
          <icon :icon="mdiChevronLeft" size="24" />
        </btn>
      </div>
      <slot name="left-items" />
    </div>

    <div class="spacer"></div>

    <div class="rightItems">
      <slot name="right-items" />
    </div>
  </div>
</template>

<script>
import { mdiChevronLeft } from '@mdi/js'

export default {
  components: {
    btn: () => import('./btn'),
    icon: () => import('./icon'),
  },
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    mdiChevronLeft,
  }),
  computed: {
    dynStyleToolbar() {
      return {
        'border-bottom': !this.flat ? 'solid #d3d3d380 1px' : null,
      }
    },
  },
  methods: {
    handleGoBack() {
      this.$emit('goBackPressed')
    },
  },
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

.backButton {
  display: none;
}

/* On devices smaller than 930 px width */
@media only screen and (max-width: 930px) {
  .backButton {
    display: initial;
    margin-right: 10px;
  }
}
</style>
