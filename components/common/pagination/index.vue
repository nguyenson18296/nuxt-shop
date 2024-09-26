<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});

const rangePages = ref<number[]>([]);

// onMounted(() => {
//   rangePages.value = Array.from({ length: props.total / props.perPage }, (_, i) => i + 1);
// });

console.log('total', props.total);
console.log('perPage', props.perPage);

watch([() => props.total, () => props.perPage], ([total, perPage], [oldTotal, oldPerPage]) => {
  if (total !== oldTotal || perPage !== oldPerPage) {
    console.log('Updated total or perPage:', total, perPage);
    rangePages.value = Array.from({ length: Math.ceil(total / perPage) }, (_, i) => i + 1);
  }
}, {
  immediate: true // Ensures this runs on initial setup as well
});

// const rangePages = Array.from({ length: props.total / props.perPage }, (_, i) => i + 1);
const totalPages = computed(() => Math.ceil(props.total / props.perPage));
</script>

<template>
  <div class="pagination">
    <ul class="pagination-list flex gap-2">
      <li class="pagination-item">
        <NuxtImg src="/img/chevron-left.svg" alt="chevron-left" width="16" />
      </li>
      <li v-for="page in rangePages" :key="page" class="pagination-item"
        :class="page === currentPage ? 'bg-[#443e40] border-[#443e40] !text-white' : ''" @click="onPageChange(page)">
        {{ page }}
      </li>
      <li class="pagination-item">
        <NuxtImg src="/img/chevron-right.svg" alt="chevron-right" width="16" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  -khtml-border-radius: 50%;
  text-align: center;
  border: 1px solid #ddd;
  line-height: 24px;
}

.pagination-item:hover {
  background: #f27002;
  border-color: #f27002;
  cursor: pointer;
  color: #fff;
}
</style>