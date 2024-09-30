<script setup lang="ts">
const props = defineProps({

  dropdownButtonId: {
    type: String,
    required: true,
  },
  contentClassNames: {
    type: String,
    default: '',
  },
})

const isOpenDropdown = ref(false);

const toggleDropdown = () => {
  isOpenDropdown.value = !isOpenDropdown.value;
};

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest(`#${props.dropdownButtonId}`)) {
    isOpenDropdown.value = false;
  }
};

const close = () => {
  isOpenDropdown.value = false;
};

defineExpose({
  close,
});
</script>

<template>
  <div class="relative">
    <button :id="dropdownButtonId" data-dropdown-toggle="dropdown" @click="toggleDropdown">
      <slot name="trigger" />
    </button>
    <transition name="p-connected-overlay">
    <div v-on-click-outside="closeDropdown" v-if="isOpenDropdown" id="dropdown"
      class="absolute w-full min-w-max top-10 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      :class="contentClassNames">
        <slot name="dropdown-content" />
    </div>
    </transition>
  </div>
</template>

<style scoped>
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}
</style>