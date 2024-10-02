<script setup lang="ts">
const props = defineProps({
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
    <Tabs :tab-lists="listTabs" :active-tab="activeTab" @change-tab="onChangeTab">
      <div class="tab-contents pt-2.5">
        <div v-show="activeTab === 0">
          <div v-html="description" />
        </div>
        <LazyUserReviews v-if="activeTab === 1" />
      </div>
    </Tabs>
  </article>
</template>
