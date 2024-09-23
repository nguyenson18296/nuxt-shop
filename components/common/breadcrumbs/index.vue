<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="breadcrumbs flex justify-between w-full mt-0 mb-[30px] mx-0 px-2.5 py-5 bg-[#f5f5f5]">
    <div class="container">
      <h2 class="text-black font-bold text-base leading-5 capitalize m-0">
        {{ title }}
      </h2>
    </div>
  </div>
</template>
