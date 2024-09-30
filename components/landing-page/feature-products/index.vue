<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
const config = useRuntimeConfig()

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
}>('/products/random?limit=10', {
  baseURL: 'http://localhost:1996/api',
  method: 'GET'
})

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout name="landing-page-section" section-title="Featured Products" bg-section="#fff" bg-text="#fff"
    number-of-slides="5" :breakpoints="{
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
    }">
    <swiper-slide v-for="product in products" :key="product.id">
      <ProductFeature :img-src="product.thumbnail" :second-img-src="product.images?.[0] ?? ''" :title="product.title"
        :slug="product.slug" :product-in-stock="product.in_stock" :price="product.price"
        :discount-price="product.discount_price" />
    </swiper-slide>
  </NuxtLayout>
</template>