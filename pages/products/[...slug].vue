<script setup lang="ts">
import type { IProductItem } from '@/stores/types';

const route = useRoute()

const slug = route.params.slug[0];
const token = useCookie('token')

const product = ref<IProductItem>({} as IProductItem);

const { startLoading, stopLoading } = useLoading();

startLoading();

onMounted(() => {
  fetchData();
});

async function fetchData() {
  const { data, execute, status } = useFetch<{
    data: IProductItem;
    success: boolean;
  }>(`/api/products/${slug}`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    // key: `product-${slug}`,
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    product.value = data.value.data;
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch product: ', status);
  }
  stopLoading();
}
// await useFetch<{
//   data: IProductItem;
// }>(`/api/products/${slug}`, {
//   baseURL: 'http://localhost:1996',
//   method: 'GET',
//   onResponse: ({ response }) => {
//     if (!response.ok) {
//       return console.error('Failed to fetch product');
//     }
//     product.value = response._data.data;
//   }
// });

useSeoMeta({
  title: `Vue Shop - E-commerce - ${product.value.title} | Detail`,
  ogTitle: `Vue Shop - E-commerce - ${product.value.title} | Detail`,
  description: product.value.short_description,
  ogDescription: product.value.short_description,
})

const { addProductToCart } = useCartStore();

const addToCart = async (quantity: number) => {
  const form = {
    product_id: product.value.id,
    quantity,
  }
  console.log('form', form)
  const { data } = await useFetch<{
    success: boolean;
  }>('/api/cart/add', {
    baseURL: 'http://localhost:1996',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token.value}`
    },
    body: JSON.stringify(form)
  });
  if (data.value?.success) {
    addProductToCart(toRaw(product), quantity);
  }
}

console.log('product', product.value);

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs :title="product.title" />
    <div class="container">
      <ProductDetails :id="product?.id" :title="product.title" :slug="product.slug" :thumbnail="product.thumbnail"
        :description="product.description" :price="+product.price" :discount_price="+product.discount_price" :images="product.images"
        :in_stock="product.in_stock"
        @add-to-cart="addToCart"
      />
    </div>
  </NuxtLayout>
</template>
