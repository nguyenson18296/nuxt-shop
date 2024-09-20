export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('on-click-outside', {
    beforeMount(el: any, binding: any) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: any) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  })
})
