import {
  type Ref,
  onMounted,
  onUnmounted,
  reactive,
} from "vue";

import { debounce } from "~/utils/debounce";

interface IScrollPosition {
  inView: boolean;
  top: number;
  bottom: number;
}

export function useScroll(
  elementRef: Ref<HTMLElement | null>
): IScrollPosition {
  const scrollPosition = reactive<IScrollPosition>({
    inView: false,
    top: 0,
    bottom: 0,
  });

  const checkPosition = debounce(() => {
    const el = elementRef.value;
    if (el) {
      const rect = el.getBoundingClientRect();
      scrollPosition.inView = rect.top < window.innerHeight && rect.bottom > 0;
      scrollPosition.top = rect.top;
      scrollPosition.bottom = rect.bottom;
    }
  }, 200);

  onMounted(() => {
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });
    checkPosition(); // Initial check
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", checkPosition);
    window.removeEventListener("resize", checkPosition);
  });

  return scrollPosition;
}
