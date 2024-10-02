<script setup lang="ts">
import { PhList } from '@phosphor-icons/vue';

const categoriesStore = useCategoriesStore();

const { categories } = storeToRefs(categoriesStore);
</script>

<template>
  <Dropdown
    dropdown-button-id="shop-by-category-dropdown"
    content-class-names="w-[250px] mt-[10px] top-[50px] rounded-lg"
  >
    <template #trigger>
      <div
        class="tt-header-content bg-[#443e40] rounded-lg float-left h-[54px] px-2.5 py-[15px] w-[250px] flex items-center">
        <nav class="w-full text-center mx-auto my-0 p-0">
          <div
            class="flex items-center gap-2 text-white cursor-pointer float-left relative text-left uppercase w-full rounded-lg">
            <PhList :size="32" />
            <span class="">
              shop by categories
            </span>
          </div>
        </nav>
      </div>
    </template>
    <template #dropdown-content>
      <ul class="bg-[#443e40]">
        <li class="cursor-pointer" v-for="category in categories" :key="category.id">
          <NuxtLink
            class="w-full text-white block font-normal text-sm leading-[31px] relative text-left capitalize px-5 py-2.5"
            :href="`/category/${category.slug}`"
          >
            {{ category.title }}
          </NuxtLink>
        </li>
        <li class="cursor-pointer">
          <NuxtLink
            class="w-full text-white block font-normal text-sm leading-[31px] relative text-left capitalize px-5 py-2.5"
            href="/shop-all"
          >
            Shop all
          </NuxtLink>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>