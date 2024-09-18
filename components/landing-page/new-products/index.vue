<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

interface IProduct {
  product_id: number;
  product_title: string;
  product_slug: string;
  product_thumbnail: string;
  product_in_stock: number;
  product_price: string;
  product_discount_price: string;
  product_images: string[];
}

definePageMeta({
  layout: "landing-page-section"
})

const { data } = await useFetchBaseUrl<IProduct>('/api/products/newest');

const products = data.value?.data || [];
console.log('products', products)
</script>

<template>
  <NuxtLayout name="landing-page-section" section-title="New Products" bg-section="#fff" bg-text="#fff" number-of-slides="5">
    <swiper-slide v-for="product in products" :key="product.product_id">
      <ProductFeature
        :imgSrc="product.product_thumbnail" 
        :title="product.product_title"
        :slug="product.product_slug"
        :productInStock="product.product_in_stock"
        :price="product.product_price"
        :discount-price="product.product_discount_price"
        :second-img-src="product.product_images?.[0] ?? ''"
      />
    </swiper-slide>
  </NuxtLayout>
</template>
