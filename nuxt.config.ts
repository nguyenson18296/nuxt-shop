// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },

  css: ['~/assets/css/main.css'],

  vue: {
    propsDestructure: true,
  },

  pages: true,

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      "Open Sans": [400, 700],
    }
  }
})