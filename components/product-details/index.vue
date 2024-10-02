<script setup lang="ts">
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: Array<string>,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  in_stock: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: false,
  },
})

const emit = defineEmits(['addToCart']);

const quantity = ref(1);

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity;
};

const addToCart = () => {
  emit('addToCart', quantity.value);
}

</script>

<template>
  <div class="container">
    <product-main-info
      :thumbnail="thumbnail"
      :images="images"
      :title="title"
      :price="price"
      :discount_price="discount_price"
      :in_stock="in_stock"
      :id="id"
      @addToCart="addToCart"
    />
    <ProductDescription :description="description" />
    <RelatedProducts :number-of-slides="5" />
  </div>
</template>

<style scoped>
.btn-primary:enabled {
  transition: all .15s ease;
}

.btn-primary:hover:enabled {
  background-color: #f27002;
}
</style>
