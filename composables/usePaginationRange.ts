import type { ComputedRef } from "vue";

export function usePaginationRange(
  currentPage: ComputedRef<number>,
  perPage: ComputedRef<number>,
  total: ComputedRef<number>
) {
  return computed(() => {
    const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(currentPage.value * perPage.value, total.value);

  const textRange = `Showing ${start} - ${end} of ${total.value} items`;
    return textRange;
  });
}
