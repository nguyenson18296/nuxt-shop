<script setup lang="ts">
const isOpenDropdown = ref(false);

const toggleDropdown = () => {
  isOpenDropdown.value = !isOpenDropdown.value;
};

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('#dropdownDefaultButton')) {
    isOpenDropdown.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      @click="toggleDropdown"
    >
      <slot name="trigger" />
    </button>
      <div
        v-on-click-outside="closeDropdown"
        v-if="isOpenDropdown"
        id="dropdown" 
        class="absolute top-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <slot name="dropdown-content" />
    </div>
  </div>
</template>