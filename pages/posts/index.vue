<script setup lang="ts">
interface IPost {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  cover_photo: string;
  created_at: string;
}

const { data } = await useFetch<{ data: IPost[] }>('/api/posts', {
  baseURL: 'http://localhost:1996',
  method: 'GET'
});

const posts = data.value?.data ?? [] as IPost[];
</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs />
    <div class="container pb-8">
      <SectionHeader title="Blog" bg-text="#fff" />
      <div class="grid grid-cols-2 gap-y-4 gap-x-8">
        <div class="grid-cols-6" v-for="post in posts" :key="post.id">
          <a :href="`/posts/${post.slug}`">
            <div class="card flex items-start gap-4">
            <figure class="flex-[0_0_50%]">
              <img
                :src="post.cover_photo" 
                :alt="post.title" 
                class="h-[200px] object-cover"
              />
            </figure>
            <div class="flex-[0_0_50%]">
              <h2 class="blog-header font-semibold text-left border-b-neutral-200 capitalize relative ml-0 mb-[15px] pb-2.5 border-b border-solid">
                {{ post.title }}
              </h2>
              <p class="text-[#666] mb-6 text-sm">
                {{ post.created_at }}
              </p>
              <p class="post-description">
                {{ post.short_description }}
              </p>
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.post-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  height: 65px;
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>