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
      <swiper :slidesPerView="3" :spaceBetween="30" :pagination="{
        clickable: true,
      }" :modules="modules" :autoplay="{
        delay: 2500,
      }" class="mySwiper">
        <swiper-slide v-for="category in categories" :key="category.id">
          <OfferBannerItem :imgSrc="category.thumbnail" :title="category.title" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
