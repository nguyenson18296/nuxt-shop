<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import OfferBannerItem from './offer-banner-item.vue';

interface ICategory {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  orders: number;
}

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const { data } = await useFetch<ICategory[]>('/api/categories', {
      baseURL: 'http://localhost:1996',
    });
    const categories = ref<ICategory[]>(data.value || []);

    return {
      modules: [Autoplay],
      categories: categories.value,
    }
  }
}
</script>

<template>
  <div class="w-full mb-[30px]">
    <div class="container">
      <swiper :slidesPerView="4" :loop="true" :spaceBetween="30" :pagination="{
        clickable: true,
      }" :modules="modules" :autoplay="{
        delay: 2500,
      }" class="mySwiper">
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-01.jpg"
                  alt='Smart Phones' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                BIG RANGE OF
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Smart Phones
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-01.jpg"
                  alt='Smart Phones' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                BIG RANGE OF
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Smart Phones
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-05.jpg"
                  alt='Smart Phones' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                Wireless Headphone
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Smart Phones
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-02.jpg"
                  alt='Smart Phones' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                BIG RANGE OF
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Game Console
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-04.jpg"
                  alt='Office Computer' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                BIG RANGE OF
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Office Computer
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-[380px] flex">
            <div class="offer-img width-[36.3%]">
              <a href="#">
                <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/offer-img-05.jpg"
                  alt='Wireless Headphone' class="border-r-neutral-200 border-r-4 border-double">
              </a>
            </div>
            <div class="offer-content w-[63.7%] text-left pl-[15px] pr-0 pt-5 pb-0">
              <h2 class="text-[#b00e23] uppercase font-semibold text-xs leading-[18px]">
                BIG RANGE OF
              </h2>
              <h1 class="text-[#111] font-bold text-lg leading-6 mx-0 my-[5px]">
                Wireless Headphone
              </h1>
              <h3 class="offer-title flex items-center text-[#7d54f2] font-normal text-[13px] leading-6">
                Up To 25% OFF
                <span>
                  <PhCaretRight />
                </span>
              </h3>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
