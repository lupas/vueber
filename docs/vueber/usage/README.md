# Usage

Add the vueber component anywhere in your application like so:

```vue
<template>
  <vueber
    :current-user="ooo"
    :conversations="ooo"
    :messages="ooo"
    :selected-conversation="ooo"
    :has-more-conversations="ooo"
    :has-more-messages="ooo"
    :user-actions="ooo"
    @conversationSelected="ooo"
    @loadMoreConversations="ooo"
    @loadMoreMessages="ooo"
    @messagePosted="ooo"
  />
</template>

<script>
export default {
  components: {
    vueber: () => import('vueber')
  }
}
</script>
```
