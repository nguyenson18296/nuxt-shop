<script setup lang="ts">
import { PhCalendarBlank, PhUser, PhMagnifyingGlass } from "@phosphor-icons/vue";
import dayjs from 'dayjs';

defineProps({
  imgSrc: String,
  title: String,
  slug: String,
  shortDescription: String,
  created_at: String,
  author: String
});
</script>

<template>
  <div class="px-[15px] py-0">
    <div class="blog-content w-full min-h-[480px] text-left border border-neutral-200 mt-0 mb-[5px] mx-0 p-2.5 rounded-lg border-solid">
      <div class="image overflow-hidden w-full relative rounded-lg">
        <figure class="relative">
          <a href="/{{ slug }}" class="relative">
            <img
              :src="imgSrc"
              :alt="title"
              class="blog-image w-full h-auto object-cover ease-in-out duration-[900ms]"
            />
            <div class="glass-icon opacity-0 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-white w-10 text-center transition-all duration-[0.4s] ease-[ease-in-out] delay-[0s] p-2 rounded-[50%] border-2 border-solid border-white">
              <PhMagnifyingGlass size="18" />
            </div>
            <div class="blog-hover">

            </div>
          </a>
        </figure>
      </div>
      <div class="px-[15px]">
        <div class="blog-caption mt-5 mb-2.5 mx-0">
        <a href="/{{ slug }}" class="whitespace-normal overflow-hidden text-[#333] w-full no-underline font-semibold text-sm leading-4 capitalize text-ellipsis mt-5 mb-2.5 mx-0">
          {{ title }}
        </a>
      </div>
      <p class="blog-description text-[#777] font-normal text-sm leading-[22px] w-full mt-0 mb-2.5 mx-0">
        {{ shortDescription }}
      </p>
      <div class="flex items-center">
        <div class="flex items-center gap-2 border-r-neutral-200 ml-0 mr-2.5 mt-0 mb-2 pl-0 pr-[15px] py-0 border-r border-solid">
          <PhUser />
          <span>
            {{ author }}
          </span>
        </div>
        <div class="flex items-center gap-1 text-sm mt-0 mb-2 mx-0">
          <PhCalendarBlank />
          <span class="min-w-max">
            {{ dayjs(created_at).format('DD MMMM YYYY') }}
          </span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-content:hover .blog-image {
  transform: scale(1.1);
}

.blog-content:hover .glass-icon {
  opacity: 1;
}

.blog-hover {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all .2s ease-in-out 0s;
  -moz-transition: all .2s ease-in-out 0s;
  -webkit-transition: all .2s ease-in-out 0s;
  -khtml-transition: all 0.2s ease-in-out 0s;
  -o-transition: all .2s ease-in-out 0s;
  width: 100%;
}

.blog-content:hover .blog-hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
