<template>
  <swiper 
    :spaceBetween="30" 
    :effect="'fade'" 
    :navigation="true" 
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 2500,
    }"
    :modules="modules" 
    class="mySwiper"
  >
    <swiper-slide><img src="/img/banner-01.jpg" class="rounded-lg" /></swiper-slide>
    <swiper-slide>
      <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/images/stencil/original/carousel/9/slider-04.jpg?c=1" class="rounded-lg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://cdn11.bigcommerce.com/s-gl0yzafqud/images/stencil/original/carousel/8/slider-03.jpg?c=1" class="rounded-lg" />
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectFade, Navigation],
    };
  },
};
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

@media (min-width: 1024) {
  .swiper-slide img {
    max-height: 42.85714rem;
  }
}
.swiper-slide img {
  display: block;
  width: 100%;
}

.swiper-button-next, .swiper-button-prev {
  width: 44px;
  height: 44px;
  background-size: 44px 44px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-color: #fff;
}

.swiper-button-next::after {
  display: block;
  font-size: 24px;
  color: black;
}

.swiper-button-prev::after {
  display: block;
  font-size: 24px;
  color: black;
}
</style>