module.exports = {
  title: 'vueber',
  description: 'Messenger & Chat framework for Vue.js.',
  themeConfig: {
    heroImage: '/logo.svg',
    logo: '/logo.svg',
    repo: 'lupas/vueber',
    sidebar: [
      {
        title: '💬 vueber',
        sidebarDepth: 3,
        children: [
          '/vueber/introduction/',
          '/vueber/getting-started/',
          '/vueber/props/',
          '/vueber/usage/',
          '/vueber/demo/'
        ]
      },
      {
        title: '🔥 vueber-fire',
        sidebarDepth: 3,
        children: [
          '/vueber-fire/introduction/',
          '/vueber-fire/getting-started/',
          '/vueber-fire/props/',
          '/vueber-fire/usage/',
          '/vueber-fire/demo/'
        ]
      },
      {
        title: 'Demo',
        sidebarDepth: 1,
        children: [
          '/demo/simple/'
        ]
      }
    ],
    sidebarDepth: 2,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/vueber/introduction/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
