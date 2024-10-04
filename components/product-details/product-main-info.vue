<script setup lang="ts">
import { PhStar, PhPen, PhCaretDown, PhFacebookLogo, PhEnvelope, PhPrinter, PhTwitterLogo, PhLinkedinLogo, PhPinterestLogo } from "@phosphor-icons/vue";

defineProps({
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: Array<string>,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: false,
  },
  in_stock: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['addToCart']);
const quantity = ref(1);
const toast = useNuxtApp().$toast;

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity;
};

const addToCart = () => {
  emit('addToCart', quantity.value);
  toast('Product added to cart', {
    type: 'success',
    duration: 3000,
  });
}
</script>

<template>
  <div class="product-view p-4">
    <div class="flex items-start gap-8">
      <div class="product-view-images flex-[0_0_40%]">
        <ProductImages :thumbnail="thumbnail" :images="images" />
      </div>
      <div class="product-details">
        <h1
          class="border-b-neutral-200 text-[#222] capitalize font-bold text-lg leading-6 mt-0 mb-3 mx-0 pb-3 border-b border-solid">
          {{ title }}
        </h1>
        <h2 class="brand font-normal text-sm leading-5 mb-4">
          OFS
        </h2>
        <ProductPrice class-names="justify-start" :price="price" :discount_price="discount_price" />
        <div
          class="product-rating flex items-center w-full border-b-neutral-200 mt-2.5 mb-[15px] mx-0 pt-0 pb-[15px] px-0 border-b border-solid">
          <div class="flex items-center gap-1">
            <PhStar v-for="(v, i) of 5" :key="i" size="16" color="#ffbf34" :weight="rating >= i + 1 ? 'fill' : 'light'"
              fill="#ffbf34" />
          </div>
          <div class="border-l-neutral-200 ml-5 pl-4 border-l border-solid">
            No reviews yet
          </div>
          <div class="flex items-center gap-1 border-l-neutral-200 ml-5 pl-4 border-l border-solid">
            <PhPen size="16" color="#000" />
            Write a Review
          </div>
        </div>
        <dl class="product-info w-full mb-[10px] pb-[15px] border-b-neutral-200 border-b border-solid">
          <div class="flex items-center">
            <dt class="font-bold flex-[0_0_140px]">
              SKU:
            </dt>
            <dd>
              TWB
            </dd>
          </div>
          <div class="flex items-center">
            <dt class="font-bold flex-[0_0_140px]">
              Weight:
            </dt>
            <dd>
              1.00 KGS
            </dd>
          </div>
          <div class="flex items-center">
            <dt class="font-bold flex-[0_0_140px]">
              Gift Wrapping:
            </dt>
            <dd>
              Options Available
            </dd>
          </div>
          <div class="flex items-center">
            <dt class="font-bold flex-[0_0_140px]">
              Shipping:
            </dt>
            <dd>
              Calculated at Checkout
            </dd>
          </div>
        </dl>
        <div class="product-options flex flex-col gap-2">
          <div class="flex items-center text-[#222] font-bold mb-[5px]">
            <label>
              Current Stock:&nbsp;
            </label>
            <span>
              {{ in_stock }} items
            </span>
          </div>
          <div class="flex items-center text-[#222] font-bold mb-[5px]">
            <label>
              Quantity:
            </label>
          </div>
          <div class="flex items-center text-[#222]">
            <QuantityInput :quantity="quantity" :product-id="id" @update:quantity="updateQuantity" />
            <div>
              <button
                class="ml-5 btn btn-primary bg-[#443e40] tracking-[1px] rounded-[25px] text-white font-semibold text-sm leading-[18px] px-[2.28571rem] py-[0.85714rem] disabled:bg-[#dcdcdc] disabled:cursor-not-allowed disabled:hover:bg-[#dcdcdc]"
                :disabled="in_stock === 0" @click="addToCart">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="mt-4">
            <button
              class="border border-neutral-200 text-[#666] font-semibold flex items-center rounded-lg px-[2.28571rem] py-[0.85714rem]">
              Add to Wishlist
              <span class="ml-1">
                <PhCaretDown size="20" />
              </span>
            </button>
          </div>
          <ul class="flex mt-4 gap-[5px] items-center">
            <li
              class="w-10 cursor-pointer h-10 flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhFacebookLogo :size="32" />
            </li>
            <li
              class="w-10 h-10 cursor-pointer flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhEnvelope :size="32" />
            </li>
            <li
              class="w-10 h-10 cursor-pointer flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhPrinter :size="32" />
            </li>
            <li
              class="w-10 h-10 cursor-pointer flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhTwitterLogo :size="32" />
            </li>
            <li
              class="w-10 h-10 cursor-pointer flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhLinkedinLogo :size="32" />
            </li>
            <li
              class="w-10 h-10 cursor-pointer flex items-center justify-center rounded-[50%] bg-[#f5f5f5] hover:bg-[#dcdcdc]">
              <PhPinterestLogo :size="32" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>