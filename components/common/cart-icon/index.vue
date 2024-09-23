<script setup lang="ts">
import { PhShoppingCart } from '@phosphor-icons/vue';
import { storeToRefs } from 'pinia'

const store = useCartStore();

const { cart } = storeToRefs(store);

store.fetchCart();

const cartLength = computed(() => cart.value?.length ?? 0);
</script>

<template>
  <Dropdown
    dropdownButtonId="cart-dropdown"
  >
    <template #trigger>
      <div class="relative">
        <PhShoppingCart :size="30" color="white" class="cursor-pointer hover:fill-[#f27002]" />
        <div
          class="cart-length absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#f27002] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {{ cartLength }}
        </div>
      </div>
    </template>
    <template #dropdown-content>
      <PreviewCartDropdown :products="cart.map(item => item.product)" />
    </template>
  </Dropdown>
</template>
