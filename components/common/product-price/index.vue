<script setup lang="ts">
import { convertToCurrency } from '@/utils/convert-currency';

defineProps({
  classNames: {
    type: String,
    required: false,
    default: 'justify-center',
  },
  fontSize: {
    type: String,
    required: false,
    default: 'text-lg',
  },
  price: {
  type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
    required: false,
  },
})
</script>

<template>
  <div :class="classNames" class="price flex items-center gap-2">
    <template v-if="discount_price">
      <span class="font-bold text-gray-800 dark:text-gray-200"
        :class="fontSize"
      >
        {{ convertToCurrency(discount_price ?? 0) }}
      </span>
      <span class="font-bold text-gray-500 dark:text-gray-400"
        :class="[
          fontSize,
          { 'text-[#f27002] line-through': discount_price }
        ]"
      >
        {{ convertToCurrency(price) }}
      </span>
    </template>
    <template v-else>
      <span class="font-bold text-gray-500 dark:text-gray-400">
        {{ convertToCurrency(price) }}
      </span>
    </template>
  </div>
</template>
