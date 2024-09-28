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
  <NuxtLayout name="landing-page-section" section-title="New Products" bg-section="#fff" bg-text="#fff" number-of-slides="5">
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductFeature
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
