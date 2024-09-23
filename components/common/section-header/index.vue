<script setup lang="ts">
const { bgText = 'bg-[#f5f5f5]' } = defineProps(['title', 'bgText']);

const textClassNames = computed(() => {
  return `pl-0 pr-[25px] py-0 relative z-[2] ${bgText}`;
});
</script>

<template>
  <div
    class="section-heading relative mb-[30px] text-[#222] font-bold text-[22px] leading-[34px] relative capitalize w-full tracking-[0.8px] text-left z-[1] m-0 px-0 py-1.5">
    <span :class="textClassNames"
    :style="{ background: bgText }"
    >
      {{ title }}
    </span>
  </div>
</template>

<style scoped>
.section-heading:after {
  background: #eee;
  content: "";
  bottom: 0;
  top: 3px;
  width: 100%;
  height: 3px;
  position: absolute;
  left: 0;
  right: auto;
  margin: auto;
  transition: all .4s ease-in-out;
}
</style>
