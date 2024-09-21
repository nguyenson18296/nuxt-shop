<script setup lang="ts">
import dayjs from 'dayjs';

interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  cover_photo: string;
}

const route = useRoute()

const slug = route.params.slug[0];

const { data } = useFetch<{ data: IPost }>(`/api/posts/${slug}`, {
  baseURL: 'http://localhost:1996',
  method: 'GET'
});

const postDetail = data.value?.data ?? {} as IPost;
console.log('postDetail', postDetail);
</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs />
    <div class="my-4 mx-8">
      <img :src="postDetail.cover_photo" :alt="postDetail.title" />
    </div>
    <div class="container my-4">
      <div class="flex items-start justify-center">
        <div class="flex-[0_0_50%]">
          <div class="card">
            <h2 class="blog-header text-3xl font-semibold text-left border-b-neutral-200 capitalize relative ml-0 mb-[15px] pb-2.5 border-b border-solid">
              {{ postDetail.title }}
            </h2>
            <p class="text-[#666] mb-6 text-sm">
              {{ dayjs(postDetail.created_at).format('MMMM DD, YYYY') }}
            </p>
            <p class="post-description" v-html="postDetail.content" />
          </div>
        </div>
      </div>
    </div>
</NuxtLayout>
</template>
