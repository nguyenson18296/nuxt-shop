import { ref, onUnmounted, watch } from 'vue';

export function useIntersectionObserver(
  elementRef: Ref<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) {
  const isIntersecting = ref(false);

  if (process.client) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
      ...options
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          isIntersecting.value = entry.isIntersecting;
          callback(entries, observer);
        });
      },
      observerOptions
    );

    watch(
      elementRef,
      (newEl, prevEl) => {
        if (prevEl) {
          observer.unobserve(prevEl);
        }
        if (newEl) {
          observer.observe(newEl);
        }
      },
      { immediate: true }
    );

    onUnmounted(() => {
      if (elementRef.value) {
        observer.unobserve(elementRef.value);
      }
      observer.disconnect();
    });
  }

  return { isIntersecting };
}