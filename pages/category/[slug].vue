<script setup lang="ts">
import type { IProductItem } from '@/stores/types';

interface ICategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
}

const route = useRoute();
const slug = route.params.slug;

const products = ref<IProductItem[]>([]);

const { data } = useFetch<{
  data: ICategory;
}>(`/api/categories/${slug}`, {
  baseURL: 'http://localhost:1996',
  method: 'GET'
});

await useFetch<{
  data: IProductItem[];
  success: boolean;
}>(`/api/products/category/${slug}`, {
  baseURL: 'http://localhost:1996',
  method: 'GET',
  onResponse: ({ response }) => {
    products.value = response._data.data;
    if (!response.ok) {
      console.error('Failed to fetch products');
    }
  }
});

const category = data.value?.data ?? {} as ICategory;
// const productItems = products.value?.data ?? [];

console.log('slug', slug);
console.log('products', products);
</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Category" />
    <div class="container">
      <div class="category-content mb-[30px] flex items-start gap-4">
        <div class="flex-[0_0_15%]">
          <NuxtImg
            v-if="category.thumbnail"
            :src="category.thumbnail"
            :alt="category.title"
            class="border border-neutral-200 p-[5px] rounded-lg border-solid"
            width="185"
            height="185"
          />
        </div>
        <div>
          <h1 class="text-[#333] font-bold text-base leading-[26px] capitalize mt-0 mb-2.5 mx-0">{{ category.title }}</h1>
          <p class="text-neutral-500 text-sm">{{ category.description }}</p>
        </div>
      </div>
      <div class="product-grid grid grid-cols-4 gap-4">
        <div v-for="product in products" :key="product.id">
          <ProductFeature
            :imgSrc="product.thumbnail" 
            :title="product.title"
            :slug="product.slug"
            :productInStock="product.in_stock"
            :price="product.price"
            :discount-price="product.discount_price"
            :second-img-src="product.images?.[0] ?? ''"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
