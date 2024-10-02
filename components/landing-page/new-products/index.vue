<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import { useFetch } from 'nuxt/app';

definePageMeta({
  layout: "landing-page-section"
})

const { data } = await useFetch<{
  data: IProductItem[];
}>('/api/products/newest', {
  baseURL: 'http://localhost:1996',
  method: 'GET'
});

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout
    name="landing-page-section" 
    section-title="New Products" 
    bg-section="#fff" 
    bg-text="#fff" 
    number-of-slides="5"
    :breakpoints="{
      320: {
        slidesPerView: 1,
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
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductFeature
        :id="product.id"
        :imgSrc="product.thumbnail" 
        :title="product.title"
        :slug="product.slug"
        :productInStock="product.in_stock"
        :price="product.price"
        :discount-price="product.discount_price"
        :second-img-src="product.images?.[0] ?? ''"
      />
    </swiper-slide>
  </NuxtLayout>
</template>
