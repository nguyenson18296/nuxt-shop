// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["~/assets/css/main.css"],

  vue: {
    propsDestructure: true,
  },

  pages: true,

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: [
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
  ],
  googleFonts: {
    families: {
      "Open Sans": [400, 700],
    },
  },

  runtimeConfig: {
    public: {
      baseURL: "http://localhost:1996",
    },
  },
});
