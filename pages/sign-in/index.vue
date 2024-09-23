<script setup lang="ts">
import { storeToRefs } from 'pinia';

const router = useRouter();

const { authenticated } = storeToRefs(useAuthStore());

watch(authenticated, (newValue, oldValue) => {
  if (newValue) {
    router.push('/');
  }
}, { immediate: false });

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Sign In"/>
    <LoginForm />
  </NuxtLayout>
</template>
