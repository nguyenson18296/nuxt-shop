import { ref, type Ref, onMounted, onUnmounted } from 'vue';

export function useElementHover(elementRef: Ref<HTMLElement | null>) {
  const isHovering = ref(false);

  function handleMouseEnter() {
    isHovering.value = true;
  }

  function handleMouseLeave() {
    isHovering.value = false;
  }

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mouseenter', handleMouseEnter);
      elementRef.value.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave);
    }
  });

  return { isHovering };
}
