import { useToast } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const { addToast } = useToast();

  nuxtApp.provide('toast', addToast);
})
