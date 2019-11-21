<template>
  <v-avatar size="36px">
    <v-img
      :max-height="36"
      :max-width="36"
      :src="avatarPath"
      aspect-ratio="1"
      alt="User Avatar"
    />
  </v-avatar>
</template>

<script>
export default {
  props: {
    avatarPath: {
      type: String,
      required: true
    }
  }
}
</script>
