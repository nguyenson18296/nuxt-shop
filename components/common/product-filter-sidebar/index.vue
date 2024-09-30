<script setup lang="ts">
import { PhPlus, PhMinus, PhStar } from '@phosphor-icons/vue';
import { Form, Field, useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const schema =
  zod.object({
    min_price: zod.number().optional().or(zod.literal('')),
    max_price: zod.number().optional().or(zod.literal('')),
  }).refine((data) => {
    // Only check the prices if both are provided
    if (!!data.min_price || !!data.max_price) {
      return (data.min_price ?? 0) < (data.max_price ?? 0);
    }
    return true; // If one of them is not provided, skip this check
  }, {
    message: 'Min price must be less than Max price',
    path: ['max_price'], // You can choose which field to associate the error with
});

const typedSchema = toTypedSchema(schema);
type TPrice = zod.infer<typeof schema>;
const { handleSubmit, errors } = useForm({
  validationSchema: typedSchema,
});

const productStore = useProductStore();

const isDisabledButton = ref(false);
const expandedSections = ref<string[]>([]);

const onExpandSection = (section: string) => {
  if (expandedSections.value.includes(section)) {
    expandedSections.value = expandedSections.value.filter((item) => item !== section);
  } else {
    expandedSections.value = [...expandedSections.value, section];
  }
};

const onSubmit = (values: TPrice) => {
  productStore.setParams({
    min_price: values.min_price?.toString() ?? '',
    max_price: values.max_price?.toString() ?? '',
  });
};

const onReset = () => {
  productStore.setParams({
    min_price: '',
    max_price: '',
  });
};

const minPrice = ref<number>(0);
const maxPrice = ref<number>(0);

watch(errors, (value) => {
  isDisabledButton.value = Object.keys(value).length > 0;
}); // TODO: not working yet

</script>

<template>
  <div
    class="product-filter-sidebar border border-neutral-200 w-full h-full mt-0 mb-[30px] mx-0 p-[5px] rounded-lg border-solid">
    <h5
      class="sidebar-heading text-white font-medium leading-6 uppercase relative w-full tracking-[0.6px] m-0 px-[15px] py-2.5 rounded-[5px] border-[none] bg-[#443e40]">
      refine by
    </h5>
    <Form :validation-schema="typedSchema" @submit="onSubmit">
        <div class="nav-list p-2.5">
      <div class="accordion-block px-0 py-2">
        <div class="accordion-navigation cursor-pointer">
          <div
            class="flex items-center justify-between"
            @click="onExpandSection('price_range')"
          >
            <h5 class="font-bold text-sm leading-7 w-full text-black relative capitalize px-0 py-0.5">
              Price
            </h5>
            <PhPlus fill="#999999" size="16" />
          </div>
          <div class="content" v-if="expandedSections.includes('price_range')">
            <div class="flex items flex-col gap-1">
              <Field v-model.number="minPrice" name="min_price" type="number" class="w-full border border-gray-300 rounded-md p-2 h-[30px] text-sm"
                placeholder="Min" />
              <ErrorMessage class="text-[#cc4749] text-sm" name="min_price" />
              <Field v-model.number="maxPrice" name="max_price" type="number" class="w-full border border-gray-300 rounded-md p-2 h-[30px] text-sm text-[#666]"
                placeholder="Max" />
              <ErrorMessage class="text-[#cc4749] text-sm" name="max_price" />
            </div>
          </div>
        </div>
        <div class="accordion-navigation mt-2 cursor-pointer">
          <div
            class="flex items-center justify-between"
            @click="onExpandSection('ratings')"
          >
            <h5 class="font-bold text-sm leading-7 w-full text-black relative capitalize px-0 py-0.5">
              Rating
            </h5>
            <PhPlus fill="#999999" size="16" />
          </div>
          <div class="flex flex-col" v-if="expandedSections.includes('ratings')">
            <ul class="rating-lists">
              <li v-for="(_item, idx) of 5" :key="idx"
                class="flex items-center justify-center gap-2 cursor-pointer hover:bg-[#efefef]">
                <PhStar v-for="(_star, starIdx) of 5" size="20" color="#ffbf34"
                  :weight="idx >= starIdx ? 'fill' : 'regular'" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-1">
      <button
      class="button-action font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#f27002] disabled:cursor-not-allowed disabled:bg-[#f27002] disabled:opacity-50"
      type="submit"
      :disabled="isDisabledButton"
    >
      Apply
    </button>
    <button
    class="button-primary font-semibold text-white text-sm leading-[18px] tracking-[1px] normal-case w-auto relative transition-[0.5s] duration-[ease-in-out] m-0 px-5 py-2.5 rounded-[25px] border-[none] bg-[#443e40]"
      type="reset"
      @click="onReset"
    >
      Reset
    </button>
    </div>
    </Form>
  </div>
</template>
