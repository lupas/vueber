# Getting Started

## Requirements

Make sure you are using the newest Version of Vue.js installed in your project.

If using Nuxt, add vueber to build.transpile in nuxt.config.js:

```js
build: {
    transpile: [/^vueber/],
}
```

## Install

Install Vueber and Vueber-Fire via NPM or Yarn.

```js
yarn add vueber # OR npm i vueber
yarn add vueber-fire # OR npm i vueber-fire

// for now (will be fixed)
yarn add @nuxtjs/firebase
yarn add anchorme
yarn add emoji-mart-vue
yarn add firewings

yarn add firebase
yarn add @nuxtjs/firebase

// If you run into core-js issues:
yarn add core-js@2
```

## Install More

### Install and configure Vuefire

```js
// For Nuxt
plugins: ['@/plugins/vuefire'],

// Plugin
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
```
