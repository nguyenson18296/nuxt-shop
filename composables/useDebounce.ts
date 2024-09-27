import { ref } from 'vue';
import type { FunctionArgs } from '~/stores/types';

export function useDebounce<T extends FunctionArgs>(
  fn: T,
  delay = 200
) {
  const timeout = ref<number>();

  function debounce(...args: Parameters<T>) {
    window.clearTimeout(timeout.value);
    timeout.value = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  function cancel() {
    window.clearTimeout(timeout.value);
  }

  return { debounce, cancel };
}
