<script setup lang="ts">
import { PhShoppingCart } from "@phosphor-icons/vue";

const props = defineProps({
  imgSrc: String,
  secondImgSrc: String,
  title: String,
  slug: String,
  price: String,
  discountPrice: String,
  productInStock: Number,
});
const percentage = ((props.productInStock ?? 0) / 100) > 1 ? '100%' : props.productInStock ?? 0;

</script>

<template>
  <div class="py-0 px-[15px] h-[420px]">
    <div class="card mt-[1.07143rem] mx-0 my-2.5 w-full bg-white transition-all duration-[0.4s] ease-[ease-in-out]">
      <div class="wdgimg-bg" />
      <figure class="card-figure relative bg-white">
        <div class="title-brand px-[15px] py-2.5">
          <p class="brand text-[#999] text-sm mb-[0.21429rem] m-0">
            Premium Quality
          </p>
          <h4 class="card-title text-sm text-ellipsis h-[60px] whitespace-pre-wrap overflow-hidden font-semibold">
            <NuxtLink
              class="text-[#443e40] hover:text-[#fbb03b]"
              :href="`/product/${slug}`"
            >
              {{ title }}
            </NuxtLink>
          </h4>
        </div>
        <!-- <a> -->
        <div class="card-img-container relative max-w-full w-full">
          <NuxtImg
            :src="imgSrc"
            :alt="title"
            class="min-h-[190px] max-h-[270px] image-1 w-full max-h-full object-contain m-auto"
            :class="{ hoverable: secondImgSrc }"
          />
          <NuxtImg
            v-if="secondImgSrc"
            :src="secondImgSrc"
            :alt="title"
            class="card-img-container image-2 wdg-thumb min-h-[190px] max-h-[200px] w-full max-h-full object-contain m-auto"
          />
          <div v-if="productInStock === 0" class="sold-out text-center absolute h-20 w-20 leading-[70px] z-[1] opacity-90 text-white text-[13px] m-auto p-[5px] rounded-[50%] inset-0 bg-[#443e40]">
            Sold out
          </div>
        </div>
        <!-- </a> -->
      </figure>
      <div class="card-body mt-4">
          <div class="relative">
            <span class="font-semibold pl-[15px] text-base leading-[18px] text-[#443e40]">
              {{ discountPrice }}
            </span>
            <div class="cart-btn absolute top-[-6px] right-[15px] left-[15px]">
              <a class="card-figcaption-button ml-auto mr-0 flex items-center justify-center h-9 leading-9 text-[13px] w-9 text-white bg-[#443e40] overflow-hidden transition-all duration-[0.4s] ease-[ease-in-out] font-semibold z-[1] relative mx-auto my-0 p-0 rounded-[25px] border-[none] border-transparent cursor-pointer">
                <PhShoppingCart size="24" class="shopping-cart-icon" />
                <span class="add-to-cart-btn">
                  Add to Cart
                </span>
              </a>
            </div>
            <div class="px-[15px] mt-1 italic text-[13px]">
              Available in stock: {{ productInStock }}
            </div>
            <div class="px-[15px]">
              <div class="progress h-2.5 w-full mt-[5px] mb-0 mx-0 rounded-[25px] bg-[#f5f5f5]">
                <div class="progress-bar h-2.5 rounded-[25px] bg-[#fed700]" 
                  :style="{ width: `${percentage}%`  }"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.card:hover .wdgimg-bg {
  -webkit-opacity: 1;
    -moz-opacity: 1;
    -khtml-opacity: 1;
    opacity: 1;
    transform: scale(1);
    transition: opacity .3s ease 0s,visibility 0s ease 0s,transform .3s ease 0s;
    visibility: visible;
}

.card .wdgimg-bg {
  background: #fff;
    -ms-box-shadow: 0 0 10px rgba(0,0,0,.15);
    -o-box-shadow: 0 0 10px rgba(0,0,0,.15);
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    position: absolute;
    border-radius: 8px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin-bottom: 0;
    -webkit-opacity: 0;
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
    transform: scale(.98);
    transition: all .3s ease 0s;
    z-index: -1;
    margin-bottom: -45px;
    visibility: hidden;
}

.card:hover .image-2 {
  display: block;
  transform: scale(1);
  transition: display .3s ease-in;
  visibility: visible;
}

.card .image-2 {
  display: none;
}

.card .image-1 {
  display: block;
}

.card:hover .image-1.hoverable {
  display: none;
}

.card:hover .card-img-container .wdg-thumb {
  opacity: 1;
}

.swiper-slide img {
  width: 100%;
  height: auto;
  max-height: 270px;
}

.add-to-cart-btn {
  display: none;
}

.shopping-cart-icon {
  display: block;
}

.cart-btn .card-figcaption-button:hover .add-to-cart-btn {
  display: block;
}

.cart-btn .card-figcaption-button:hover .shopping-cart-icon {
  display: none;
}

.cart-btn .card-figcaption-button:hover {
  width: 100%;
}

.card-figcaption-button:hover {
  background: #f27002;
  color: #fff;
  transition: .5s ease-in-out;
  opacity: 1;
  -moz-opacity: 1;
  -khtml-opacity: 1;
  -webkit-opacity: 1;
  bottom: 0;
}
</style>
