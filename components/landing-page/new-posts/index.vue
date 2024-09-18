<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

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
})

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  template: 'landing-page-section',
  async setup() {
    const { data } = await useFetchBaseUrl<IPost>('/api/posts');

    return {
      modules: [Autoplay],
      posts: data.value?.data || [],
    }
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
  >
    <swiper-slide v-for="post in posts" :key="post.id">
      <PostCarousel :img-src="post.cover_photo" :title="post.title" :slug="post.slug"
        :short-description="post.seo_description" :created_at="post.created_at" :author="post.user.username" />
    </swiper-slide>
  </NuxtLayout>
</template>
