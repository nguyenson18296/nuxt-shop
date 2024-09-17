<script setup lang="ts">
import OfferBanners from '@/components/landing-page/offer-banners/index.vue';

const appConfig = useAppConfig();
</script>

<template>
  <div>
    <Header />
    <section>
      <Hero />
    </section>
    <section>
      <OfferBanners />
    </section>
    <section>
      <ShopCategories />
    </section>
  </div>
</template>
