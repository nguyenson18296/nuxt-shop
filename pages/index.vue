<script setup lang="ts">
const appConfig = useAppConfig();
const { start } = useLoadingIndicator({
  duration: 2000
});

definePageMeta({
  title: 'Home',
  description: 'Home page',
})

start();
</script>

<template>
    <NuxtLayout name="page-wrapper">
    <section>
      <Hero />
    </section>
    <section>
      <OfferBanners />
    </section>
    <section>
      <ShopCategories />
    </section>
    <section>
      <SubBanners />
      <FeatureProducts />
    </section>
    <section>
      <BestSellerProducts />
    </section>
    <section>
      <SubBannersNewProducts />
      <NewProducts />
    </section>
    <section>
      <NewPosts />
    </section>
    <section id="testimonials">
      <Testimonials />
    </section>
  </NuxtLayout>
</template>
