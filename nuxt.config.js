export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'map-scratcher',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vee-validate.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  serverMiddleware: [
    { path: "/api", handler: "~/api/index.js" },
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
        },
        user: {
          property: 'user',
          // autoFetch: false
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'get' },
          user: false
          // user: { url: '/api/auth/user', method: 'get', propertyName: false },
        }
      }
    }
  },
  router: {
    // middleware: ['auth']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
