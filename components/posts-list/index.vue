<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps({
  posts: {
    type: Array as PropType<IPost[]>,
    required: true,
  },
  canFetchMore: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
})

const isVisible = ref(false);
const bottomEl = ref<HTMLDivElement | null>(null);

const emit = defineEmits(["fetchMorePosts"]);

useIntersectionObserver(bottomEl, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting;
});

watchEffect(() => {
  if (isVisible.value && props.canFetchMore) {
    emit("fetchMorePosts");
  }
});

</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
      <div class="grid-cols-6" v-for="post in posts" :key="post.id">
          <div class="card flex items-start gap-4">
            <figure class="flex-[0_0_50%] md:flex-[0_0_40%]">
              <NuxtLink :to="`/blogs/${post.slug}`">
                <NuxtImg :src="post.cover_photo" :alt="post.title" class="h-[200px] w-[300px] object-cover" />
              </NuxtLink>
            </figure>
            <div class="flex-[0_0_50%]">
              <NuxtLink :to="`/blogs/${post.slug}`">
                <h2
                  class="blog-header font-semibold text-left border-b-neutral-200 capitalize relative ml-0 mb-[15px] pb-2.5 border-b border-solid">
                  {{ post.title }}
                </h2>
              </NuxtLink>
              <p class="text-[#666] mb-6 text-sm">
                {{ dayjs(post.created_at).format('MMMM DD, YYYY') }}
              </p>
              <p class="post-description">
                {{ post.short_description }}
              </p>
              <p>
                <span class="text-[#666]">By </span>
                <span class="text-[#666]">{{ post.user.username }}</span>
              </p>
            </div>
          </div>
      </div>
    </div>
    <div class="posts-bottom opacity-0" ref="bottomEl" />
  </ClientOnly>
</template>
