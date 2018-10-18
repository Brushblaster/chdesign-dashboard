require('dotenv').config()
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        name: 'theme-color',
        content: '#01888b'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        integrity: 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.materialdesignicons.com/2.2.43/css/materialdesignicons.min.css'
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
  plugins: [{
      src: '@/plugins/vuetify'
    },
    {
      src: '@/plugins/socket'
    },
    {
      src: '@/plugins/lodash'
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/component-cache',
    '@nuxtjs/pwa'
  ],

  manifest: {
    name: 'CH-Design-Dashboard',
    short_name: 'CH-Dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#01888b',
    description: 'Dashboard for managing all topics in CH-Design.',

  },

  icon: {
    iconSrc: '@/staic/v.png'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    /* baseURL: `${
			process.env.NODE_ENV === 'production'
				? `https://${process.env.PROD_DOMAIN}`
        : `http://${process.env.DEVE_DOMAIN}:${process.env.PORT}`
		}/api/`,

    redirectError: {
      // 401: '/login'
    }  */
    // See https://github.com/nuxt-community/axios-module#options
  },

  auth: {
    redirect: {
      callback: '/dashbaord',
      login: '/dashbaord',
      logout: '/',
      home: '/dashboard'
    },
    fullPathRedirect: true,
    strategies: {
      auth0: {
        client_id: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_CLIENT_DOMAIN,
        redirect_uri: process.env.NODE_ENV === 'production' ?
          `http://app.${process.env.PROD_DOMAIN}` :
          `http://${process.env.HOST}:${process.env.PORT}/`
      }
    }
  },

  env: {
    PROD_DOMAIN: process.env.PROD_DOMAIN //,
    // NODE_ENV: process.env.NODE_ENV
  },

  render: {
    http2: {
      push: true
    }
  },

  watch: ['db'],
  /*
   ** Build configuration
   */

  render: {
    http2: {
      push: true
    }
  },

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
  },
  serverMiddleware: [
    // API middleware
    '@/server/api/index.js'
  ]
}
