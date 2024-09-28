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

const pagination = ref({
  perPage: 10,
  currentPage: 1,
});
const products = ref<IListResponse<IProductItem>>({
  data: [],
  total: 0,
  page: 1,
  limit: 10,
  success: false,
});

const category = ref<ICategory>({} as ICategory);

onMounted(() => {
  Promise.all([
    fetchCategories(),
    fetchProductsByCategory()
  ]);
});

async function fetchCategories() {
  const { data, execute } = await useFetch<{
    data: ICategory;
    success: boolean;
  }>(`/api/categories/${slug}`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    key: `category-${slug}`,
  });

  await execute();

  if (data.value?.success) {
    category.value = data.value.data;
  }
}

async function fetchProductsByCategory() {
  const { data, execute } = await useFetch<IListResponse<IProductItem>>(`/api/products/category/${slug}`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    key: `products-${slug}`,
  });

  await execute();

  if (data.value?.success) {
    products.value = data.value;
  }
}

const onPageChange = (page: number) => {
  pagination.value.currentPage = page;
  fetchProductsByCategory();
};

const textRange = usePaginationRange(
  computed(() => pagination.value.currentPage),
  computed(() => products.value.limit),
  computed(() => products.value.total)
);

useSeoMeta({
  title: `Vue Shop - E-commerce - ${category.value.title} | Products`,
  ogTitle: `Vue Shop - E-commerce - ${category.value.title} | Products`,
  description: `Vue Shop - E-commerce - ${category.value.description}`,
  ogDescription: `Vue Shop - E-commerce - ${category.value.description}`
})

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Category" />
    <div class="container">
      <div class="category-content mb-[30px] flex items-start gap-4">
        <div class="flex-[0_0_15%]">
          <NuxtImg v-if="category.thumbnail" :src="category.thumbnail" :alt="category.title"
            class="border border-neutral-200 p-[5px] rounded-lg border-solid" width="185" height="185" />
        </div>
        <div>
          <h1 class="text-[#333] font-bold text-base leading-[26px] capitalize mt-0 mb-2.5 mx-0">{{ category.title }}
          </h1>
          <p class="text-neutral-500 text-sm">{{ category.description }}</p>
        </div>
      </div>
      <div class="w-full flex items-center justify-between border border-neutral-200 mt-0 mb-[15px] mx-0 p-[15px] rounded-lg border-solid">
        <div>
          Sort By: Price
        </div>
        <div>
          <Pagination
            :total="products.total"
            :perPage="products.limit"
            :currentPage="products.page"
            :onPageChange="onPageChange"
          />
        </div>
      </div>
      <div class="product-grid grid grid-cols-4 gap-4">
        <div v-for="product in products.data" :key="product.id">
          <ProductFeature :imgSrc="product.thumbnail" :title="product.title" :slug="product.slug"
            :productInStock="product.in_stock" :price="product.price" :discount-price="product.discount_price"
            :second-img-src="product.images?.[0] ?? ''" />
        </div>
      </div>
      <div class="w-full flex items-center justify-between border border-neutral-200 mt-0 mb-[15px] mx-0 p-[15px] rounded-lg border-solid">
        <div v-text="textRange" />
        <div>
          <Pagination
            :total="products.total"
            :perPage="products.limit"
            :currentPage="products.page"
            :onPageChange="onPageChange"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
