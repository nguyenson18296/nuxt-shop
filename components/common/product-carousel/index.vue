<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { PhShoppingCart, PhHeart, PhArrowsCounterClockwise, PhEye } from "@phosphor-icons/vue";

const props = defineProps({
  imgSrc: String,
  title: String,
  slug: String,
  price: String,
  discountPrice: String,
  productInStock: Number,
  productImages: Array<string>,
});
const percentage = ((props.productInStock ?? 0) / 100) > 1 ? '100%' : props.productInStock ?? 0;
const modules = [Navigation];
</script>

<template>
  <div class="px-[15px] h-[550px] py-0 block">
    <div class="mt-[1.07143rem] mx-0 my-2.5">
      <div
        class="card relative w-full transition-all duration-[0.4s] ease-[ease-in-out] p-0 bg-[#fff]"
      >
        <div class="wdgimg-bg" />
        <figure class="card-figure relative transition-all duration-[0.4s] pb-5">
          <div class="title-brand px-[15px] py-2.5">
            <div class="list-item-brand text-[#999]">
              Premium Top Quality
            </div>
            <div class="card-title">
              <h4 class="product-tile h-10 text-[#443e40] font-semibold text-sm">
                {{ title }}
              </h4>
            </div>
          </div>
          <a href="/{{ slug }}" class="block w-full h-[330px] flex items-center">
            <img :src="imgSrc" :alt="title" class="w-full h-auto object-cover" />
          </a>
          <div class="product-images absolute w-full h-[120px] bottom-0 mt-0 mb-2.5 mx-0 px-5 py-0">
            <swiper :slides-per-view="3" space-between="30" :pagination="{ clickable: true }" :modules="modules"
              :navigation="true">
              <swiper-slide v-for="(image, index) in productImages" :key="index"
                class="flex justify-center items-center">
                <div class="px-[5px] rounded-lg bg-white py-0 flex items-center">
                  <img :src="image" alt="product image" class="p-1" />
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </figure>
        <div class="card-body mt-4">
          <div class="relative">
            <product-price :price="+(price ?? 0)" :discount-price="+(discountPrice ?? 0)"
              class-names="pl-[15px] text-base leading-[18px] text-[#443e40]" />
            <div class="cart-btn absolute top-[-6px] right-[15px] left-[15px]">
              <a
                class="card-figcaption-button ml-auto mr-0 flex items-center justify-center h-9 leading-9 text-[13px] w-9 text-white bg-[#443e40] overflow-hidden transition-all duration-[0.4s] ease-[ease-in-out] font-semibold z-[1] relative mx-auto my-0 p-0 rounded-[25px] border-[none] border-transparent cursor-pointer">
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
                <div class="progress-bar h-2.5 rounded-[25px] bg-[#fed700]" :style="{ width: `${percentage}%` }"></div>
              </div>
            </div>
            <figcaption class="card-figcaption mt-4 flex items-center justify-center gap-2">
              <PhHeart title="Add to wishlist" :size="24" color="#888" class="cursor-pointer" />
              <PhArrowsCounterClockwise title="Compare" :size="24" color="#888" class="cursor-pointer" />
              <PhEye title="Quick view" :size="24" color="#888" class="cursor-pointer" />
            </figcaption>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-images {
  opacity: 0;
  transition: all .4s ease-in-out;
}

.product-tile {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.swiper-slide img {
  width: 100%;
  height: auto;
  max-height: 20.85714rem;
}

.card:hover {
  -webkit-opacity: 1;
  -moz-opacity: 1;
  -khtml-opacity: 1;
  opacity: 1;
  transform: scale(1);
  transition: opacity .3s ease 0s, visibility 0s ease 0s, transform .3s ease 0s;
  visibility: visible;
  box-shadow: 0 0 10px rgba(0, 0, 0, .15);
}

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

.card:hover .product-images {
  opacity: 1;
}

.card:hover .card-figcaption {
  opacity: 1;
  transition: all .4s ease-in-out;
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

.card-figcaption {
  padding: 3px 0 0 0;
  opacity: 0;
  transition: all .4s ease-in-out;
  height: 46px;
  border-top: 1px solid #e5e5e5;
  pointer-events: none;
}
</style>
