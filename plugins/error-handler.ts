export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, vm, info) => {
    console.error(err, vm, info);
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error(error, instance, info);
  })
})
