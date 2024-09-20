<script setup lang="ts">
interface IReview {
  id: number;
  content: string;
  is_mine: boolean;
  created_at: string;
}

const route = useRoute()
const slug = route.params.slug[0];

const data = await useFetchBaseUrl<{ data: IReview[] }>(`/api/product-reviews/${slug}`);
const reviews = data.data.value ?? [] as IReview[];
</script>

<template>
  <div>
    User reviews
  </div>
</template>