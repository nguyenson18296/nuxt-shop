<template>
  <div class="container">
    <div class="content flex flex-wrap lg:flex-nowrap items-start gap-4">
      <div class="sidebar flex-[0_0_15%]">
        <ProductFilterSidebar />
      </div>
      <div class="main-content flex-[0_0_85%]">
        <slot name="products-page-content" />
      </div>
    </div>
  </div>
</template>
