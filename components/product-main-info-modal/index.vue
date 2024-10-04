<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: false,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: Array<string>,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: false,
  },
  in_stock: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <modal
    modal-id="product-main-info-modal"
    :is-open="isOpen"
    @close="() => $emit('update:isOpen', false)"
  >
    <template #product-main-info>
      <product-main-info
        :thumbnail="thumbnail"
        :images="images"
        :title="title"
        :price="price"
        :discount_price="discount_price"
        :in_stock="in_stock"
        :id="id"
        :rating="rating"
      />
    </template>
  </modal>
</template>
