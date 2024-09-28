<script setup lang="ts">
import { ref } from 'vue';
import { PhCaretDown, PhCheck } from '@phosphor-icons/vue';

interface IDropdownMethod {
  close: () => void;
}

defineProps({
  options: {
    type: Array<IOption>,
    required: true,
  },
  selectedOption: {
    type: Object as PropType<IOption>,
    required: true,
  }
})

const emits = defineEmits(['select'])

const dropdownRef = ref<IDropdownMethod | null>(null);

const onSelect = (option: IOption) => {
  emits('select', option);
  if (dropdownRef.value) {
    dropdownRef.value.close();
  }
}
</script>

<template>
  <Dropdown ref="dropdownRef" dropdown-button-id="select-dropdown-id">
    <template #trigger>
      <div
        class="relative h-[34px] w-[225px] inline-flex items-center justify-between cursor-pointer relative select-none border border-solid border-slate-300 rounded-md px-2">
        <span class="text-[#333] text-sm min-w-max py-2">Sort by: {{ selectedOption.label }}</span>
        <PhCaretDown :size="20" class="cursor-pointer hover:fill-[#f27002]" />
      </div>
    </template>
    <template #dropdown-content>
      <ul class="select-list w-full p-1">
        <li v-for="option in options" :key="option.value"
          class="select-item text-sm flex items-center gap-1 cursor-pointer font-normal whitespace-nowrap relative overflow-hidden flex items-center text-slate-700 transition-all duration-[0.2s] rounded pl-1 pr-3 py-2 border-0 border-none hover:bg-[#f1f5f9] bg:text-[#1e293b]"
          @click="onSelect(option)"
        >
          <PhCheck size="14" v-if="selectedOption?.value === option.value"/>
          <span :class="selectedOption?.value !== option.value ? 'pl-5' : ''">
            {{ option.label }}
          </span>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>