<script setup lang="ts">
interface IProduct {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  images: string[];
  in_stock: number;
  price: string;
  discount_price: string;
  description: string;
}

const route = useRoute()

const slug = route.params.slug[0];

const { data } = await useFetchBaseUrl<IProduct>(`/api/products/${slug}`);
const product = data.value?.data ?? {} as IProduct;

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs />
    <div class="container">
      <ProductDetails :id="product?.id" :title="product.title" :slug="product.slug" :thumbnail="product.thumbnail"
        :description="product.description" :price="product.price" :discount_price="product.discount_price" :images="product.images" />
    </div>
  </NuxtLayout>
</template>
