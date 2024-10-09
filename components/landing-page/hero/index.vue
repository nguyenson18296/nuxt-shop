<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
</script>

<template>
  <div class="container">
    <div class="flex flex-wrap md:flex-nowrap">
      <div
        :class="twMerge(
          'w-full md:w-[80%] xl:w-[64%] rounded-lg',
          'px-0 mr-0 mt-[15px] mb-[30px] md:px-[30px] py-0'
        )"
      >
        <BannersSlider />
      </div>
      <div class="top-banner w-full md:w-[18%] overflow-hidden mt-[15px] flex flex-col gap-4">
        <div class="relative">
          <img class="w-full lg:w-[300px] h-auto rounded-lg" src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/top-banner-01.jpg" alt="right-img-shop-now">
          <div class="content text-white absolute w-[44%] left-[10%] right-auto top-[48%]">
            <h2 class="text-base font-normal">New Sale</h2>
            <h1 class="font-bold text-xl">
              Backpack
            </h1>
          </div>
        </div>
        <div class="relative">
          <img class="w-full lg:w-[300px] h-auto rounded-lg" src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/top-banner-02.jpg" alt="right-img-shop-now">
          <div class="content text-white absolute w-[44%] left-[10%] right-auto top-[10%]">
            <h2 class="text-base font-normal">New Arrivals</h2>
            <h1 class="font-bold text-xl">
              Styles Shoes
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
