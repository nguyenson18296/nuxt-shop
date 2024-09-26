<script setup lang="ts">
import { PhCaretCircleDown, PhCaretCircleUp } from '@phosphor-icons/vue'; 

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:quantity']);

const quantity = ref(props.quantity);

const increment = () => {
  quantity.value += 1;
}

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
}

watch(quantity, (newValue) => {
  emit('update:quantity', newValue, props.productId);
});
</script>

<template>
  <div class="flex items-center gap-1">
    <button @click="decrement">
      <PhCaretCircleDown size="20" />
    </button>
    <input type="number" v-model="quantity" class="text-sm font-bold h-auto text-center w-10 p-0 border-0" />
    <button @click="increment">
      <PhCaretCircleUp size="20" />
    </button>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>