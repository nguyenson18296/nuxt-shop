<script setup lang="ts">
const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const onCloseModal = (event: MouseEvent) => {
  event.stopPropagation();
  if ((event.target as HTMLElement).closest(`#${props.modalId}`)) {
    return emit('close');
  }
};
</script>

<template>
  <div :id="modalId" tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-screen"
    v-if="isOpen"
    style="background-color: rgba(0, 0, 0, 0.7);"
  >
    <div 
      class="relative p-4 max-w-[calc(100vw_-_200px)] w-full max-h-full absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
      v-on-click-outside="onCloseModal"
    >
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal" @click="onCloseModal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span @click="onCloseModal" class="sr-only">Close modal</span>
        </button>
          <slot name="product-main-info"></slot>
      </div>
    </div>
  </div>
</template>
