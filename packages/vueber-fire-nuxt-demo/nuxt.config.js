export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuefire'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyBPbKMVLeY1x_1sgikvuP5cyfUd6iFs0l0',
          authDomain: 'vueber-fire-nuxt-demo.firebaseapp.com',
          databaseURL: 'https://vueber-fire-nuxt-demo.firebaseio.com',
          projectId: 'vueber-fire-nuxt-demo',
          storageBucket: 'vueber-fire-nuxt-demo.appspot.com',
          messagingSenderId: '499279429791',
          appId: '1:499279429791:web:e0ef9deb856d8ed2c1a2aa',
        },
        services: {
          firestore: true,
        },
      },
    ],
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vueber/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
