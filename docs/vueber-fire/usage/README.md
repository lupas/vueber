# Usage

Import and add the VueberFire component wherever you want:

```html
<template>
  <div class="containerHeight">
    <VueberFire :current-user="currentUser" nuxt-fire> </VueberFire>
  </div>
</template>
```

```js
<script>
import { VueberFire } from 'vueber-fire'

export default {
  components: { VueberFire },
  data: () => ({}),
  computed: {
    currentUser() {
      return null
    }
  }
}
</script>
```

The minimum props required are:

- currentUser
- ...
