<script setup lang="ts">
import dayjs from 'dayjs';

interface IPost {
  id: number;
  title: string;
  seo_title: string;
  slug: string;
  seo_description: string;
  content: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  cover_photo: string;
}

const route = useRoute()

const slug = route.params.slug[0];

const postDetail = ref<IPost>({} as IPost);

const { startLoading, stopLoading } = useLoading();

startLoading();

onMounted(() => {
  fetchData();
});

async function fetchData() {
  startLoading();
  const { data, execute, status } = useFetch<{
    data: IPost;
    success: boolean;
  }>(`/api/posts/${slug}`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    postDetail.value = data.value.data;
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch post: ', status);
  }
  stopLoading();
}

useServerSeoMeta({
  title: `Vue Shop - E-commerce - ${postDetail.value.seo_title}`,
  ogTitle: `Explore Vue Shop - E-commerce | ${postDetail.value.seo_title}`,
  description: postDetail.value.seo_description,
  ogDescription: postDetail.value.seo_description,
})

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs :title="postDetail.title"/>
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
