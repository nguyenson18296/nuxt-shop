<script setup lang="ts">
const props = defineProps({
  thumbnail: {
    type: String,
    required: true,
  },
  images: Array<string>,
});

const mainImage = ref(props.thumbnail);

const onImageChange = (image: string) => {
  mainImage.value = image;
};
</script>

<template>
  <div class="product-images mb-12">
    <figure class="border border-neutral-200 overflow-hidden rounded-lg border-solid min-h-[400px] flex items-center justify-center">
      <ZoomableImage :src="mainImage" alt="Product thumbnail" />
    </figure>
    <ul class="flex items-center gap-4 mt-5">
      <li
        v-for="image in images" 
        :key="image" 
        class="border border-neutral-200 w-full overflow-hidden rounded-lg border-solid"
        :style="{ borderColor: image === mainImage ? '#777' : '#f3f4f6' }"
        @click="onImageChange(image)"
      >
        <img :src="image" alt="Product image" class="h-[120px] w-[95px]">
      </li>
    </ul>
  </div>
</template>
