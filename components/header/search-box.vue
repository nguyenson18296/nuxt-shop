<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

const searchTerm = ref('');
const isOpenDropdown = ref(false);

const searchedProducts = ref<IProductItem[]>([]);

const { debounce, cancel } = useDebounce((value) => {
  if (value.length > 0) {
    isOpenDropdown.value = true;
  } else {
    isOpenDropdown.value = false;
  }
  searchTerm.value = value;
  fetchSearchData();
}, 500);

watch(searchTerm, (newValue) => {
  debounce(newValue);
});

async function fetchSearchData() {
  const { data, execute } = useFetch<{
    success: boolean;
    data: any;
  }>('http://localhost:1996/api/products', {
    method: 'GET',
    params: {
      search: searchTerm.value
    }
  })
  
  // Execute the fetch and await its completion
  if (searchTerm.value.length === 0) {
    searchedProducts.value = [];
    return;
  }

  await execute();

  if (data.value?.success) {
    searchedProducts.value = data.value.data;
  }
}

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('#dropdown')) {
    isOpenDropdown.value = false;
  }
};

const onFocus = () => {
  if (searchedProducts.value.length > 0) {
    isOpenDropdown.value = true;
  }
}

onUnmounted(() => {
  cancel();
})

console.log('searchTerm', searchTerm.value);
</script>

<template>
  <div id="dropdown" class="search-bar relative w-[40%] px-[15px] py-0">
    <div class="w-full relative">
      <input
        v-model="searchTerm"
        @click="onFocus"
        placeholder="Search products..."
        class="w-full px-4 text-sm h-[50px] text-[#666] rounded-lg border-[none] bg-white"
      />
      <div class="search-icon absolute top-0 right-0 bottom-0 flex items-center justify-center">
        <button
          class="flex items-center gap-2 bg-[#443e40] text-white tracking-[1px] h-11 normal-case float-left w-auto relative transition-[0.5s] duration-[ease-in-out] mx-[5px] my-[3px] px-5 py-3.5 rounded-lg border-[none]">
          <span>
            Search
          </span>
          <PhMagnifyingGlass :size="24" />
        </button>
      </div>
    </div>
    <div v-on-click-outside="closeDropdown" v-if="isOpenDropdown" id="dropdown"
      class="absolute top-14 right-0 z-10 bg-white w-full min-h-[100px] max-h-[500px] overflow-y-auto divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="suggest_search" v-if="searchedProducts.length > 0">
        <li v-for="product in searchedProducts" :key="product.id" class="p-[10px] border-b-[#eee] border-b border-solid">
          <NuxtLink :to="`/products/${product.slug}`" class="flex items-start gap-2">
            <div class="item-img flex-[0_0_60px]">
              <img
                :src="product.thumbnail"
                width="60"
                height="60"
                class="w-[60px] h-[60px]"
              />
            </div>
            <div class="item-info">
              <h3 class="product-title">
                {{ product.title }}
              </h3>
             <ProductPrice
              :price="+product.price"
              :discount_price="+(product.discount_price ?? 0)"
              class-names="justify-content-start"
              font-size="text-sm"
             />
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="flex items-center justify-center h-[100px]">
        <div class="p-[10px]">
          <p class="text-center text-[#666]">
            No products found with keyword "{{ searchTerm }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
}
</style>