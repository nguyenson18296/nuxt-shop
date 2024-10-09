<script setup lang="ts">
import dayjs from 'dayjs';

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
    key: `post-${slug}`,
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    postDetail.value = data.value.data;
    console.log('Post detail: ', postDetail.value);
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
    <div class="my-4 mx-8 container">
      <NuxtImg class="w-full h-[400px] object-cover"
        :src="postDetail.cover_photo" :alt="postDetail.title" />
    </div>
    <div class="container my-4">
      <div class="flex items-start justify-center">
        <div class="flex-[0_0_100%] md:flex-[0_0_50%]">
          <div class="card">
            <h2 class="blog-header text-3xl font-semibold text-left border-b-neutral-200 capitalize relative ml-0 mb-[15px] pb-2.5 border-b border-solid">
              {{ postDetail.title }}
            </h2>
            <div class="flex items-center justify-between mb-6">
              <p class="text-[#666] text-sm">
                {{ dayjs(postDetail.created_at).format('MMMM DD, YYYY') }}
              </p>
              <p>
                <span class="text-[#666]">By </span>
                <span class="text-[#666]">{{ postDetail?.user?.username }}</span>
              </p>
            </div>
            <p class="post-description" v-html="postDetail.content" />
          </div>
        </div>
      </div>
    </div>
</NuxtLayout>
</template>
