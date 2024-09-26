<script setup lang="ts">
defineProps({
  description: {
    type: String,
    required: true,
  },
});

const activeTab = ref(0);

const listTabs = ['Description', 'Reviews'];

const onChangeTab = (index: number) => {
  activeTab.value = index;
};
</script>

<template>
  <article
    class="product-description border border-neutral-200 w-full mt-[30px] mb-[45px] mx-0 px-[25px] py-[15px] rounded-lg border-solid">
    <ul class="tabs flex items-center gap-2">
      <li
        class="tab cursor-pointer text-[#777] font-semibold text-base leading-5 tracking-[1px] capitalize z-[1] mt-0 mb-px mx-0 pt-2.5 pb-3 px-0"
        v-for="(tab, index) in listTabs" :key="index" :style="{
          color: activeTab === index ? '#222' : '#777',
          borderBottom: activeTab === index ? '2px solid #f27001' : 'none'
        }" @click="onChangeTab(index)">
        {{ tab }}
      </li>
    </ul>
    <div class="tab-contents pt-2.5" v-html="description" v-show="activeTab === 0" />
    <UserReviews v-show="activeTab === 1" />
  </article>
</template>
