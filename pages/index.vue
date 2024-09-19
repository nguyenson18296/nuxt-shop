<script setup lang="ts">
const appConfig = useAppConfig();

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
  </NuxtLayout>
</template>
