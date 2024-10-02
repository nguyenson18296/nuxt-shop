<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

interface IProduct {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  price: string;
  discount_price: string;
  in_stock: number;
  images: string[];
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
  <NuxtLayout name="landing-page-section" section-title="Best Sellers" bg-section="#f7f7f7" bg-text="#f5f5f5"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }">
    <swiper-slide v-for="product in products" :key="product.id" class="mb-[30px]">
      <ProductCarousel :id="product.id" :imgSrc="product.thumbnail" :title="product.title" :slug="product.slug"
        :price="product.price" :discount-price="product.discount_price" :product-in-stock="product.in_stock"
        :product-images="product.images" />
    </swiper-slide>
  </NuxtLayout>
</template>
