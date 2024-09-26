<template>
  <div>
    <NuxtLoadingIndicator :duration="10000" />
    <Loading />
    <Header />
      <Toast />
      <slot />
    <Footer />
  </div>
</template>
