<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';

interface IPost {
  id: number;
  title: string;
  seo_description: string;
  cover_photo: string;
  slug: string;
  created_at: string;
  user: {
    username: string;
  };
}

definePageMeta({
  layout: "landing-page-section"
});

const posts = ref<IPost[]>([]);

onMounted(async () => {
  await fetchPosts();
});

async function fetchPosts() {
  const { data, execute, status } = useFetch<{
    data: IPost[];
    success: boolean;
  }>(`/api/posts`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    key: 'posts',
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    posts.value = data.value.data;
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch reviews: ', status);
  }
}
</script>

<template>
  <NuxtLayout
    name="landing-page-section"
    section-title="Latest Posts"
    bg-section="#fff"
    bg-text="#fff"
    number-of-slides="4"
    class-names="!pt-0"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide v-for="post in posts" :key="post.id">
      <PostCarousel :img-src="post.cover_photo" :title="post.title" :slug="post.slug"
        :short-description="post.seo_description" :created_at="post.created_at" :author="post.user.username" />
    </swiper-slide>
  </NuxtLayout>
</template>
