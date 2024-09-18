<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sectionTitle: {
      type: String,
      required: true,
    },
    bgSection: {
      type: String,
      required: true,
    },
    bgText: {
      type: String,
      required: true,
    },
    numberOfSlides: {
      type: Number,
      default: 3,
    },
  },
  setup() {
    return {
      modules: [],
    };
  },
}
</script>

<template>
  <div class="w-full mb-[30px] pt-10 pb-2.5 px-0" :style="{ backgroundColor: bgSection }">
    <div class="container">
      <SectionHeader :title="sectionTitle" :bgText="bgText" />
      <swiper :slidesPerView="numberOfSlides" :spaceBetween="30" :pagination="{
        clickable: true,
      }" :modules="modules" :autoplay="{
        delay: 2500,
      }" class="mySwiper pb-[45px]">
        <slot />
      </swiper>
    </div>
  </div>
</template>