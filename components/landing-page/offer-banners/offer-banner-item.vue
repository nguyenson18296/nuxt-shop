<template>
  <div class="w-[380px] flex">
    <div class="offer-img width-[36.3%]">
      <a href="#">
        <img
          src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-03.jpg"
          :alt='title'
          class="border-r-neutral-200 border-r-4 border-double"
        >
      </a>
    </div>
    <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
      <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
        BIG RANGE OF
      </h2>
      <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
        {{ title }}
      </h1>
      <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
        Up To 25% OFF
        <span>
          <PhCaretRight />
        </span>
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue';
defineProps(['imgSrc', 'title'])

</script>
