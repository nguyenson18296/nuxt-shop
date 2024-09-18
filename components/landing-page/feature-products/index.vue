<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

interface IProduct {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  images: string[];
  in_stock: number;
  price: string;
}

definePageMeta({
  layout: "landing-page-section"
})

const { data } = await useFetchBaseUrl<IProduct>('/api/products/random?limit=10');

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout
    name="landing-page-section"
    section-title="Featured Products"
    bg-section="#fff"
    bg-text="#fff"
    number-of-slides="5"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductFeature :img-src="product.thumbnail" :second-img-src="product.images?.[0] ?? ''" :title="product.title" :slug="product.slug" :product-in-stock="product.in_stock" :price="product.price" />
    </swiper-slide>
  </NuxtLayout>
</template>