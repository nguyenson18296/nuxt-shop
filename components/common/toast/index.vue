<script setup lang="ts">
import { PhCheckCircle, PhXCircle } from '@phosphor-icons/vue';

import { useToast } from '@/composables/useToast';

const { toastList, removeToast } = useToast();
</script>

<template>
  <transition name="v-enter-from">
    <div :id="toastList[0].id"
      class="fixed top-5 right-5 z-1000 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert" v-if="toastList.length > 0">
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        <PhCheckCircle v-if="toastList[0].type === 'success'" :size="32" color="#10e01d" weight="fill" />
        <PhXCircle v-else-if="toastList[0].type === 'error'" :size="32" color="#cb2020" weight="fill" />
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">
        {{ toastList[0].message }}
      </div>
      <button class="ml-2" type="button" data-dismiss-target="#toast-danger" aria-label="Close"
        @click="removeToast(toastList[0].id)">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  </transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>