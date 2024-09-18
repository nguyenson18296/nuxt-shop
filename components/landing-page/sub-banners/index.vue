<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";
</script>

<template>
  <div class="w-full">
    <div class="container">
      <div class="flex items-center gap-[30px]">
        <div class="relative">
          <a href="#">
            <img
              src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/sub-banner-01.jpg"
              alt="sub-banner"
              class="rounded-lg"
            />
          </a>
          <div class="banner-content w-[44%] absolute left-[30px] right-auto top-[30px]">
            <h4 class="font-normal text-base leading-5 capitalize text-[#111] mt-0 mb-[5px] mx-0">
              New Arrivals
            </h4>
            <h1 class="min-w-max font-bold text-[28px] leading-[34px] capitalize text-[#111] mt-0 mb-2.5 mb-[15px] mx-0">
              Style Hat Cap
            </h1>
            <div class="banner-button">
              <a class="button black">
                Shop Now
              </a>
              <span class="bg-[#f27002] rounded-full w-[20px] h-[20px] flex items-center justify-center relative left-[-5px]">
                <PhCaretRight size="16" class="fill-white" />
              </span>
            </div>
          </div>
        </div>
        <div class="relative">
          <a href="#">
            <img
              src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/sub-banner-02.jpg"
              alt="sub-banner"
              class="rounded-lg"
            />
          </a>
          <div class="banner-content w-[44%] absolute left-[30px] right-auto top-[30px]">
            <h4 class="font-normal text-base leading-5 capitalize text-white mt-0 mb-[5px] mx-0">
              New Arrivals
            </h4>
            <h1 class="font-bold text-[28px] leading-[34px] capitalize text-white mt-0 mb-2.5 mb-[15px] mx-0">
              Daniel Wellington
            </h1>
            <div class="banner-button">
              <a class="button black">
                Shop Now
              </a>
              <span class="bg-white rounded-full w-[20px] h-[20px] flex items-center justify-center relative left-[-5px]">
                <PhCaretRight size="16" class="fill-black" />
              </span>
            </div>
          </div>
        </div>
        <div class="relative">
          <a href="#">
            <img
              src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/sub-banner-03.jpg"
              alt="sub-banner"
              class="rounded-lg"
            />
          </a>
          <div class="banner-content w-[44%] absolute left-[30px] right-auto top-[30px]">
            <h4 class="font-normal text-base leading-5 capitalize text-white mt-0 mb-[5px] mx-0">
              Collection-2020
            </h4>
            <h1 class="font-bold text-[28px] leading-[34px] capitalize text-white mt-0 mb-2.5 mb-[15px] mx-0">
              Diamond Ring
            </h1>
            <div class="banner-button">
              <a class="button black">
                Shop Now
              </a>
              <span class="bg-[#f27002] rounded-full w-[20px] h-[20px] flex items-center justify-center relative left-[-5px]">
                <PhCaretRight size="16" class="fill-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-button {
  display: flex;
  align-items: center;
}

.banner-button a.button.black {
  background: #111;
}

.banner-button a.button {
  display: inline-block;
  background: #f27002;
  right: -12px;
  left: auto;
  color: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  border-radius: 25px;
  transition: .4s ease-in-out;
  padding: 8px 15px;
}
</style>