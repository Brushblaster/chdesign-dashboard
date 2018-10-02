require('dotenv').config()
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        integrity:
          'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.materialdesignicons.com/2.2.43/css/materialdesignicons.min.css'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#2979FF',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: '@/plugins/vuetify' }, { src: '@/plugins/socket' }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  auth: {
    redirect: {
      callback: '/',
      login: '/',
      logout: '/',
      home: '/'
    },
    fullPathRedirect: true,
    strategies: {
      auth0: {
        client_id: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_CLIENT_DOMAIN,
        redirect_uri: process.env.NODE_ENV === 'production' ? `http://app.${process.env.PROD_DOMAIN}` : `http://${process.env.HOST}:${process.env.PORT}/`
      }
    }
  },

  env: {
    PROD_DOMAIN: process.env.PROD_DOMAIN//,
    // NODE_ENV: process.env.NODE_ENV
  },

  watch: ['db'],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
