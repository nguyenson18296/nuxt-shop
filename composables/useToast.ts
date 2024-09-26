import { ref } from "vue";

interface IToast {
  id: string;
  message: string;
  duration: number;
}

const toastList = ref<IToast[]>([]);

export const useToast = () => {
  function addToast(message: string, duration: number) {
    const id = Math.random().toString(36).substr(2, 9);
    toastList.value.push({ id, message, duration });

    setTimeout(() => {
      toastList.value = toastList.value.filter((toast) => toast.id !== id);
    }, duration);
  }

  function removeToast(id: string) {
    toastList.value = toastList.value.filter((toast) => toast.id !== id);
  }

  return { toastList, addToast, removeToast };
};
