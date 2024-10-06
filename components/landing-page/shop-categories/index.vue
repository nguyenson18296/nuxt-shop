<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { SwiperSlide } from 'swiper/vue';
import { PhCaretCircleRight } from '@phosphor-icons/vue';

import { useCategoriesStore } from '@/stores/categories';

const categoriesStore = useCategoriesStore();

const { categories } = storeToRefs(categoriesStore);
</script>

<template>
  <NuxtLayout
    name="landing-page-section" 
    section-title="Shop by Categories"
    bg-section="#f5f5f5" bg-text="#f5f5f5"
    number-of-slides="6"
    :breakpoints="{
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide v-for="category in categories" :key="category.id">
      <div class="px-[30px] py-[5px]">
        <div :class='twMerge(
          "image group w-full relative overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-[50%]",
          "w-[192px] h-[192px]"
        )'>
          <NuxtLink :to="`/category/${category.slug}`">
            <NuxtImg
              :src="category.thumbnail" 
              :alt="category.title" 
              class="!w-[192px] h-[192px] object-cover ease-in-out duration-[900ms] group-hover:scale-[1.2]"
            />
          </NuxtLink>
        </div>
        <div class="flex flex-col items-center mt-[20px]">
          <NuxtLink :to="`/category/${category.slug}`">
            <h4 class="text-xl mt-[18px] font-normal min-w-max">
              {{ category.title }}
            </h4>
          </NuxtLink>
          <p class="text-sm text-[#666]">
            {{ category.product_count }} items
          </p>
          <PhCaretCircleRight :size="24" weight="fill" />
        </div>
      </div>
    </swiper-slide>
  </NuxtLayout>
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
