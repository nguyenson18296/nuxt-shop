<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

interface IProduct {
  product_id: number;
  product_title: string;
  product_slug: string;
  product_thumbnail: string;
  product_price: string;
  product_discount_price: string;
  product_in_stock: number;
  product_images: string[];
}

definePageMeta({
  layout: "landing-page-section"
})

const { data } = await useFetch<{ data: IProduct[] }>('/api/products/best-selling', {
  baseURL: 'http://localhost:1996',
});

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout name="landing-page-section" section-title="Best Sellers" bg-section="#f7f7f7" bg-text="#f5f5f5">
    <swiper-slide v-for="product in products" :key="product.product_id">
      <ProductCarousel :imgSrc="product.product_thumbnail" :title="product.product_title"
        :slug="product.product_slug" :price="product.product_price" :discount-price="product.product_discount_price" :product-in-stock="product.product_in_stock"
        :product-images="product.product_images"
        />
    </swiper-slide>
  </NuxtLayout>
</template>
