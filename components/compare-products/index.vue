<script setup lang="ts">
import { storeToRefs } from 'pinia';

const { compareProducts } = storeToRefs(useProductStore());

</script>

<template>
  <div class="container">
    <SectionHeader title="Compare Products" bgText="#fff" />
    <div class="compare-page px-[15px] py-0" v-if="compareProducts.length > 0">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th v-for="product in compareProducts" :key="product.id" class="pt-8 pb-[1.28571rem] px-4 w-1/5">
              <article class="product-compare flex flex-col items-center">
                <figure class="relative">
                  <NuxtImg :src="product.thumbnail" alt="product" />
                </figure>
                <div class="card-body pt-4">
                  <div class="text-[#666] mb-[0.21429rem]">
                    OFS
                  </div>
                  <h4 class="product-title text-sm text-ellipsis overflow-hidden font-normal">
                    <NuxtLink :to="`/product/${product.slug}`" class="font-semibold">
                      {{ product.title }}
                    </NuxtLink>
                  </h4>
                  <h4>
                    {{ product.price }}
                  </h4>
                </div>
              </article>
            </th>
          </tr>
          <tr class="border-t-neutral-200 border-t border-solid">
            <th class="text-center w-1/5">
              <h4 class="font-semibold text-[#666]">
                Description
              </h4>
            </th>
            <td v-for="product in compareProducts" :key="product.id" class="py-2 pb-[1.28571rem] px-4"
              :class="(product.description?.length ?? 0) > 0 ? 'product-description' : ''">
              {{ product.description }}
            </td>
          </tr>
          <tr class="border-t-neutral-200 border-t border-solid">
            <th class="text-center w-1/5">
              <h4 class="font-semibold text-[#666]">
                Rating
              </h4>
            </th>
            <td v-for="product in compareProducts" :key="product.id" class="pt-8 pb-[1.28571rem] px-4">
              No Reviews
            </td>
          </tr>
          <tr class="border-t-neutral-200 border-t border-solid">
            <th class="text-center w-1/5">
              <h4 class="font-semibold text-[#666]">
                Availability
              </h4>
            </th>
            <td v-for="product in compareProducts" :key="product.id" class="pt-8 pb-[1.28571rem] px-4">
              N/A
            </td>
          </tr>
          <tr class="border-t-neutral-200 border-t border-solid">
            <th class="text-center w-1/5">
              <h4 class="font-semibold text-[#666]">
                Other Details
              </h4>
            </th>
            <td v-for="product in compareProducts" :key="product.id" class="pt-8 pb-[1.28571rem] px-4">
              N/A
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="h-[300px] flex items-center justify-center text-2xl font-bold">
      No products to compare
    </div>
  </div>
</template>

<style scoped>
.product-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  height: 130px;
}
</style>
