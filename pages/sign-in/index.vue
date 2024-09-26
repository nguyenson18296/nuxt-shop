<script setup lang="ts">
import { storeToRefs } from 'pinia';

const router = useRouter();

const { authenticated } = storeToRefs(useAuthStore());

watch(authenticated, (newValue, oldValue) => {
  if (newValue) {
    router.push('/');
  }
}, { immediate: false });

useSeoMeta({
  title: 'Vue Shop - E-commerce - Login',
  ogTitle: 'Vue Shop - E-commerce - Login',
  description: 'Vue Shop - E-commerce - Login',
  ogDescription: 'Vue Shop - E-commerce - Login',
})

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Sign In"/>
    <LoginForm />
  </NuxtLayout>
</template>
