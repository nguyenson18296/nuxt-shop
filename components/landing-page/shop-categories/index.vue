<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import { PhCaretCircleRight } from '@phosphor-icons/vue';

import { useCategoriesStore, type ICategory } from '@/stores/categories';

const categoriesStore = useCategoriesStore();
const categories = ref<ICategory[]>([]);

definePageMeta({
  layout: "landing-page-section"
})

await useFetch<{
  data: ICategory[];
}>('/api/categories', {
  baseURL: 'http://localhost:1996',
  onResponse: ({ response }) => {
    if (!response.ok) {
      return console.error('Failed to fetch categories');
    }
    categories.value = response._data.data;
  }
});

categoriesStore.$patch({
  categories: categories.value,
});
</script>

<template>
  <NuxtLayout name="landing-page-section" section-title="Shop by Categories" bg-section="#f5f5f5" bg-text="#f5f5f5"
    number-of-slides="6">
    <swiper-slide v-for="category in categories" :key="category.id">
      <div class="px-[30px] py-[5px]">
        <div class="image group w-full relative overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-[50%]">
          <img :src="category.thumbnail" :alt="category.title"
            class="w-full h-full object-cover ease-in-out duration-[900ms] group-hover:scale-[1.2]">
        </div>
        <div class="flex flex-col items-center mt-[20px]">
          <h4 class="text-xl mt-[18px] font-normal min-w-max">
            {{ category.title }}
          </h4>
          <p class="text-sm text-[#666]">
            {{ category.product_count }} items
          </p>
          <PhCaretCircleRight size="32" class="mt-[6px]" />
        </div>
      </div>
    </swiper-slide>
  </NuxtLayout>
  <!-- <div class="w-full bg-[#f5f5f5] block align-top mb-[50px] pt-[50px] pb-[60px] px-0">
    <div class="container">
      <SectionHeader title="Shop by Categories" />
      <swiper :slides-per-view="5" :space-between="50" :modules="modules" :autoplay="{ delay: 2500 }"
        class="shop-categories-swiper">
        <swiper-slide v-for="category in categories" :key="category.id">
          <div class="px-[30px] py-[5px]">
            <div class="image group w-full relative overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-[50%]">
              <img :src="category.thumbnail" :alt="category.title" class="w-full h-full object-cover ease-in-out duration-[900ms] group-hover:scale-[1.2]">
            </div>
            <div class="flex flex-col items-center mt-[20px]">
              <h4 class="text-xl mt-[18px] font-normal min-w-max">
                {{ category.title }}
              </h4>
              <p class="text-sm text-[#666]">
                {{ category.product_count }} items
              </p>
              <PhCaretCircleRight size="32" class="mt-[6px]" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div> -->
</template>

<style scoped>
.shop-categories-heading:after {
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
