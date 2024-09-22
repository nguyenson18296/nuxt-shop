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
  discount_price: string;
}

definePageMeta({
  layout: "landing-page-section"
})

const { data } = await useFetch<{
  data: IProduct[];
}>('/api/products/random?limit=10', {
  baseURL: 'http://localhost:1996',
  method: 'GET',
});

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout
    name="landing-page-section"
    section-title="Related Products"
    bg-section="#fff"
    bg-text="#fff"
    number-of-slides="6"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductFeature :img-src="product.thumbnail" :second-img-src="product.images?.[0] ?? ''" :title="product.title" :slug="product.slug" :product-in-stock="product.in_stock" :price="product.price" :discount-price="product.discount_price" />
    </swiper-slide>
  </NuxtLayout>
</template>
