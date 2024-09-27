<script setup lang="ts">
const emits = defineEmits(['changeTab']);

defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
  tabLists: {
    type: Array<String>,
    required: true,
  },
});

const onChangeTab = (index: number) => {
  emits('changeTab', index);
};
</script>

<template>
  <div class="">
    <ul class="tabs flex items-center gap-2">
      <li
        class="tab cursor-pointer text-[#777] font-semibold text-base leading-5 tracking-[1px] capitalize z-[1] mt-0 mb-px mx-0 pt-2.5 pb-3 px-0"
        v-for="(tab, index) in tabLists" :key="index" :style="{
          color: activeTab === index ? '#222' : '#777',
          borderBottom: activeTab === index ? '2px solid #f27001' : 'none'
        }" @click="onChangeTab(index)">
        {{ tab }}
      </li>
    </ul>
    <div class="tab-panel">
      <slot></slot>
    </div>
  </div>
</template>