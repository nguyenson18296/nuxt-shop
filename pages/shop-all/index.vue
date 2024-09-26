<script setup lang="ts">
const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

useServerSeoMeta({
  title: `Vue Shop - E-commerce - Shop All`,
  ogTitle: `Vue Shop - E-commerce - Shop All`,
  description: `Vue Shop - E-commerce - Shop All`,
  ogDescription: `Vue Shop - E-commerce - Shop All`,
})

const spliceCategories = computed(() => {
  return categories.value.slice(0, 5);
});

const pagination = ref({
  perPage: 10,
  currentPage: 1,
});

const products = ref<IListResponse<IProductItem>>({
  data: [],
  success: false,
  limit: 0,
  total: 0,
  page: 0,
});

onMounted(() => {
  fetchProducts();
});

async function fetchProducts() {
  const { data, execute } = useFetch<IListResponse<IProductItem>>(`/api/products`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    params: {
      limit: pagination.value.perPage,
      page: pagination.value.currentPage,
    },
    key: `products-${pagination.value.currentPage}`,
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    products.value = data.value;
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch products: ', status);
  }
}

const onPageChange = (page: number) => {
  pagination.value.currentPage = page;
  fetchProducts();
};

const ranges = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.perPage + 1;
  const end = Math.min(pagination.value.currentPage * pagination.value.perPage, products.value.total);

  return `Showing ${start} - ${end} of ${products.value.total} items`;
});

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Shop All" />
    <div class="container">
      <div class="category-content mb-[30px] flex items-start gap-4">
        <div class="flex-[0_0_15%]">
          <NuxtImg
            src="https://cdn11.bigcommerce.com/s-gl0yzafqud/images/stencil/original/f/category-img-06__05690.original.jpg"
            alt="shop-all-img" class="border border-neutral-200 p-[5px] rounded-lg border-solid" width="185"
            height="185" />
        </div>
        <div>
          <h1 class="text-[#333] font-bold text-base leading-[26px] capitalize mt-0 mb-2.5 mx-0">
            Shop All
          </h1>
          <p class="text-neutral-500 text-sm">
            Phasellus consectetur rutrum feugiat. Proin id semper urna. Maecenas eget felis augue. Integer purus nibh,
            congue eu porttitor quis, accumsan nec mauris. Vivamus sit amet mi ac leo vehicula ultrices et a est. Proin
            rhoncus facilisis risus, nec commodo elit. Aenean ac nisi nisl.
          </p>
          <ul class="flex mt-[10px] items-start gap-4">
            <li v-for="category in spliceCategories" :key="category.id"
              class="flex flex-col justify-center items-center w-[105px]">
              <div class="img mb-[10px]">
                <NuxtLink :to="`/category/${category.slug}`">
                  <NuxtImg :src="category.thumbnail" :alt="category.title" with="93" height="93"
                    class="border border-neutral-200 p-[5px] rounded-lg border-solid w-[93px] h-[93px]" />
                </NuxtLink>
              </div>
              <NuxtLink :to="`/category/${category.slug}`" class="font-normal text-[13px] text-[#666] leading-[22px]">{{
              category.title }}</NuxtLink>
            </li>
          </ul>
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
      <div class="product-grid grid grid-cols-5 gap-4">
        <div v-for="product in products.data" :key="product.id">
          <ProductFeature :imgSrc="product.thumbnail" :title="product.title" :slug="product.slug"
            :productInStock="product.in_stock" :price="product.price" :discount-price="product.discount_price"
            :second-img-src="product.images?.[0] ?? ''" />
        </div>
      </div>
      <div class="w-full flex items-center justify-between border border-neutral-200 mt-0 mb-[15px] mx-0 p-[15px] rounded-lg border-solid">
        <div v-text="ranges" />
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