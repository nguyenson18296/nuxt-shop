<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Checkout Success"/>
    <div
      class="flex flex-col items-center justify-center text-center"
      style="height: 400px"
    >
      <NuxtImg
        src="/img/check.png"
        alt="Checkout Success"
        width="150"
        height="150"
      />
      <h1 class="text-[#333] text-2xl font-bold mt-5">
        Your order has been placed successfully
      </h1>
      <p class="text-[#666] mt-2">
        Thank you for shopping with us. We will send you an email confirmation shortly.
      </p>
      <NuxtLink href="/">
        <button
          class="bg-[#f27002] text-white px-4 py-2 rounded-lg mt-5"
        >
          Continue Shopping
        </button>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>