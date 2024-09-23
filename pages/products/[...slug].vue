<script setup lang="ts">
import type { IProductItem } from '@/stores/types';

const route = useRoute()

const slug = route.params.slug[0];
const token = useCookie('token')

const { data } = await useFetch<{
  data: IProductItem;
}>(`/api/products/${slug}`, {
  baseURL: 'http://localhost:1996',
  method: 'GET',
});
const product = data.value?.data ?? {} as IProductItem;

const { addProductToCart } = useCartStore();

const addToCart = async (quantity: number) => {
  const form = {
    product_id: product.id,
    quantity,
  }
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
    console.log('Product added to cart');
    addProductToCart(product, quantity);
  }
}

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs :title="product.title" />
    <div class="container">
      <ProductDetails :id="product?.id" :title="product.title" :slug="product.slug" :thumbnail="product.thumbnail"
        :description="product.description" :price="product.price" :discount_price="product.discount_price" :images="product.images"
        :in_stock="product.in_stock"
        @add-to-cart="addToCart"
      />
    </div>
  </NuxtLayout>
</template>
