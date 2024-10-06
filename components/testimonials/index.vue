<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/pagination';

const modules = [Pagination];

</script>

<template>
  <div class="bg-[#f7f7f7]">
    <div class="container">
      <div class="flex flex-wrap">
        <div
          :class="twMerge(
            'md:pl-0 md:pr-[30px] md:pt-10 md:pb-[30px] flex-[0_0_100%] lg:flex-[0_0_55%]',
            'p-0 py-2'
          )"
        >
          <swiper :direction="'vertical'" :modules="modules" :pagination="{
            clickable: true,
          }">
            <swiper-slide>
              <div class="flex flex-wrap items-start gap-2">
                <div class="flex items-center gap-5">
                  <NuxtImg src="https://pub-static.fotor.com/assets/ai-avatar/styles/fotorWeb/srmjoeg2h6kk.jpg"
                    alt="avatar" width="100" height="100" class="rounded-[50%] !w-[100px] h-[100px]" />
                  <div>
                    <h3 class="font-bold text-lg">
                      John Doe
                    </h3>
                    <p class="text-[#666]">
                      CEO, Company
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-[#666] bg-white p-[15px] w-[400px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua.
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="flex items-start gap-2">
                <div class="flex items-center gap-5">
                  <NuxtImg src="https://pub-static.fotor.com/assets/ai-avatar/styles/9fnbdd0ui900.jpg"
                    alt="avatar" width="100" height="100" class="rounded-[50%] !w-[100px] h-[100px]" />
                  <div>
                    <h3 class="font-bold text-lg">
                      John Doe
                    </h3>
                    <p class="text-[#666]">
                      CEO, Company
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-[#666] bg-white p-[15px] w-[400px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua.
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="flex items-start gap-2">
                <div class="flex items-center gap-5">
                  <NuxtImg src="https://pub-static.fotor.com/assets/ai-avatar/styles/fotorWeb/nyyxe0da3w3n.jpg"
                    alt="avatar" width="100" height="100" class="rounded-[50%] !w-[100px] h-[100px]" />
                  <div>
                    <h3 class="font-bold text-lg">
                      John Doe
                    </h3>
                    <p class="text-[#666]">
                      CEO, Company
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-[#666] bg-white p-[15px] w-[400px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua.
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          :class="twMerge(
            'border-l-[#00000014] md:border-l md:border-solid',
            'py-4 md:pl-[30px] md:pr-0 md:pt-[30px]'
          )"
        >
          <h5 class="text-[#111] cursor-pointer text-lg font-semibold leading-[22px] capitalize mt-0 mb-5 mx-0">
            download app
          </h5>
          <div class="mt-2 flex gap-2 border-l-[#00000014] border-l border-solid">
            <NuxtImg src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/01.png" alt="app"
              width="150" height="150" />
            <NuxtImg src="https://cdn11.bigcommerce.com/s-gl0yzafqud/product_images/uploaded_images/02.png" alt="app"
              width="150" height="150" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.swiper {
  height: 150px;
  margin-left: inherit;
}
</style>