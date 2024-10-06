<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

defineProps({
  numberOfSlides: {
    type: Number,
    required: false,
    default: 6,
  },
})

definePageMeta({
  layout: "landing-page-section",
})

const { data } = await useFetch<{
  data: IProductItem[];
}>('/api/products/random?limit=10', {
  baseURL: 'http://localhost:1996',
  method: 'GET',
});

const products = data.value?.data || [];
</script>

<template>
  <NuxtLayout name="landing-page-section" section-title="Related Products" bg-section="#fff" bg-text="#fff"
    :number-of-slides="numberOfSlides" :breakpoints="{
      320: {
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
      <ProductFeature :id="product.id" :img-src="product.thumbnail" :second-img-src="product.images?.[0] ?? ''"
        :title="product.title" :slug="product.slug ?? ''" :product-in-stock="product.in_stock" :price="product.price"
        :discount-price="product.discount_price" :rating="product.rating" :description="product.description ?? ''" />
    </swiper-slide>
  </NuxtLayout>
</template>
