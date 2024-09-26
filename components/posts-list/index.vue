<script setup lang="ts">
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
    <div class="grid grid-cols-2 gap-y-4 gap-x-8">
      <div class="grid-cols-6" v-for="post in posts" :key="post.id">
        <a :href="`/posts/${post.slug}`">
          <div class="card flex items-start gap-4">
            <figure class="flex-[0_0_50%]">
              <img :src="post.cover_photo" :alt="post.title" class="h-[200px] object-cover" />
            </figure>
            <div class="flex-[0_0_50%]">
              <h2
                class="blog-header font-semibold text-left border-b-neutral-200 capitalize relative ml-0 mb-[15px] pb-2.5 border-b border-solid">
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
    <div class="posts-bottom opacity-0" ref="bottomEl" />
  </ClientOnly>
</template>
