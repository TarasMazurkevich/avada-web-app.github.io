
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' },
      { rel: 'stylesheet', media: 'all', href: 'https://kit-free.fontawesome.com/releases/latest/css/free.min.css' }
    ],
    scripts: [
      { crossorigin: 'anonymous', href: 'https://kit.fontawesome.com/92aca317b8.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vuelidate' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],
  /*
  ** Firebase config
  */
  firebase: {
    config: {
      apiKey: 'AIzaSyCxnkku69JKLIs53ijY3CjQP8a_XCC4guc',
      authDomain: 'avada-web-app.firebaseapp.com',
      databaseURL: 'https://avada-web-app.firebaseio.com',
      projectId: 'avada-web-app',
      storageBucket: 'avada-web-app.appspot.com',
      messagingSenderId: '851484904313',
      appId: '1:851484904313:web:302d8be9c92f36be65fda8'
    },
    services: {
      auth: true,
      firestore: true,
      storage: true
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, ctx) {
    // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
