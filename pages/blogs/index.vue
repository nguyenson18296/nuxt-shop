<script setup lang="ts">

useServerSeoMeta({
  title: 'Vue Shop - E-commerce - Blog Posts | Your Source for the Latest News',
  ogTitle: 'Explore Vue Shop - E-commerce | Latest Blog Posts and Trends',
  description: 'Discover the latest insights, tips, and updates on Vue Shop - E-commerce, your go-to source for everything e-commerce-related. Stay informed with our blog posts on current trends and strategies.',
  ogDescription: 'Read the latest blog posts on Vue Shop - E-commerce. Stay ahead in the e-commerce industry with tips, trends, and expert insights.',
})

const posts = ref<IPost[]>([]);
const canFetchMore = ref(true);
const currentPage = ref(1);

const { startLoading, stopLoading } = useLoading();

startLoading();

onMounted(() => {
  fetchData();
});

async function fetchData() {
  startLoading();
  const { data, execute, status } = useFetch<{
    data: IPost[];
    success: boolean;
  }>('/api/posts', {
    baseURL: 'http://localhost:1996',
    params: {
      page: currentPage.value,
    },
    method: 'GET',
    key: `posts-${currentPage.value}`,
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    if (data.value.data.length < 10) {
      canFetchMore.value = false;
    }
    posts.value = posts.value.concat(data.value.data);
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch posts:', status);
  }
  stopLoading();
}

const fetchMorePosts = () => {
  currentPage.value += 1;
  fetchData();
};

const trendingPosts = computed(() => {
  return posts.value.filter((post) => post.post_type === 'second_headline');
});
const trendingRightPosts = computed(() => {
  return posts.value.filter((post) => post.post_type === 'first_headline');
});
const headlinePost = computed(() => {
  return posts.value.find((post) => post.post_type === 'headline');
});

</script>

<template>
  <NuxtLayout name="page-wrapper">
    <Breadcrumbs title="Blogs" />
    <div class="container pb-8">
      <SectionHeader title="Blogs" bg-text="#fff" />
      <div class="mb-[30px] flex items-start gap-4">
        <div class="news-trending flex-[0_0_25%] flex flex-col gap-4">
          <article v-for="(post, index) in trendingPosts" :key="post.id" class="p-2" :class="{
            'border-b border-solid border-b-neutral-200': index !== trendingPosts.length - 1
          }">
            <NuxtLink :href="`/posts/${post.slug}`" class="flex items-start gap-2">
              <NuxtImg :src="post.cover_photo" :alt="post.title" width="120" height="80" />
              <div>
                <h2 class="blog-header font-semibold text-left capitalize relative ml-0 mb-[15px] pb-2.5">
                  {{ post.title }}
                </h2>
              </div>
            </NuxtLink>
          </article>
        </div>
        <div class="flex-[0_0_70%] flex items-start gap-4">
          <div class="heading-post flex-[0_0_60%]">
            <article v-if="headlinePost" class="flex flex-col items">
              <NuxtLink :href="`/posts/${headlinePost.slug}`" class="flex flex-col">
                <NuxtImg :src="headlinePost.cover_photo" :alt="headlinePost.title" width="100%" height="400" />
                <h2 class="blog-header mt-4 font-semibold text-left capitalize relative ml-0">
                  {{ headlinePost.title }}
                </h2>
                <p>
                  {{ headlinePost.short_description }}
                </p>
              </NuxtLink>
            </article>
          </div>
          <div class="news-trending-right flex flex-col gap-8">
            <article v-for="(post, index) in trendingRightPosts" :key="post.id" class="p-2"
              :class="{ 'border-b border-solid border-b-neutral-200': index !== trendingRightPosts.length - 1 }">
              <NuxtLink :href="`/posts/${post.slug}`" class="flex flex-col items-start gap-2">
                <NuxtImg :src="post.cover_photo" :alt="post.title" width="258" height="172" />
                <div>
                  <h2
                    class="blog-header font-semibold text-left capitalize relative ml-0 mb-[15px] pb-2.5 max-w-[258px]">
                    {{ post.title }}
                  </h2>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
      <PostsList :posts="posts" :can-fetch-more="canFetchMore" @fetch-more-posts="fetchMorePosts" />
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