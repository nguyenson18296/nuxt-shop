<script setup lang="ts">
import { ref, type Ref, type StyleValue } from 'vue';

const props = defineProps({
  src: String,
  alt: String,
  zoomFactor: {
    type: Number,
    default: 2,
  },
});

const imgStyles: Ref<StyleValue> = ref({
  transform: 'scale(1)',
  transformOrigin: 'center center',
});

const handleZoom = (event: MouseEvent) => {
  const { clientX, clientY } = event;
  const { left, top, width, height } = (event.target as HTMLImageElement)?.getBoundingClientRect();
  const x = (clientX - left) / width;
  const y = (clientY - top) / height;
  imgStyles.value = {
    transform: `scale(${props.zoomFactor})`,
    transformOrigin: `${x * 100}% ${y * 100}%`,
  };
};

const resetZoom = () => {
  imgStyles.value = {
    transform: 'scale(1)',
    transformOrigin: 'center center',
  };
};
</script>

<template>
  <div class="zoom-container">
    <img
      :src="src"
      :alt="alt"
      :style="imgStyles"
      @mousemove="handleZoom"
      @mouseleave="resetZoom"
    />
  </div>
</template>

<style scoped>
.zoom-container {
  overflow: hidden;
  cursor: zoom-in;
}
.zoom-container img {
  transition: transform 0.1s ease;
}
</style>
