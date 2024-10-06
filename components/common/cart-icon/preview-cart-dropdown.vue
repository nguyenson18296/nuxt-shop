<script setup lang="ts">
import type { IProductItem } from '@/stores/types';

const { cartTotal, cartTotalDiscount } = useCartStore();

defineProps({
  products: {
    type: Array<IProductItem>,
    required: true,
  },
})
</script>

<template>
  <div class="preview-cart max-h-[496px] w-[300px] overflow-y-auto px-[15px] py-[5px] bg-[white]">
    <ul class="preview-cart-list py-2">
      <li class="flex items-center hover:bg-[#cccccc]" v-for="product in products" :key="product.id">
        <NuxtImg :src="product.thumbnail" :alt="product.title" class="w-[50px] h-[50px] rounded-[5px]" />
        <div class="flex flex-col ml-[10px]">
          <NuxtLink :to="`/products/${product.slug}`">
            <span class="product-title text-[#666] text-[13px] font-normal">
              {{ product.title }}
            </span>
          </NuxtLink>
          <product-price class-names="justify-start" font-size="text-sm" :price="+product.price"
            :discount_price="+(product.discount_price || 0)" />
        </div>
      </li>
    </ul>
    <div
      class="preview-cart-action max-w-[120rem] w-full border-t-neutral-200 block mx-auto my-0 px-0 py-6 border-t border-solid">
      <div
        class="total-price text-center w-full border-b-neutral-200 text-base font-bold text-[#111] mt-0 mb-5 mx-0 pt-0 pb-[19px] px-0 border-b border-solid">
        Total:
        <ProductPrice :price="cartTotal" :discount_price="cartTotalDiscount" />
      </div>
      <div class="flex items-center gap-2">
        <button
          class="button-action font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#f27002]">
          <NuxtLink href="/cart">
            View Cart
          </NuxtLink>
        </button>
        <button
          class="button-primary font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#443e40]">
          <NuxtLink href="/checkout">
            Checkout
          </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
