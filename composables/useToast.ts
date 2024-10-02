import { ref } from "vue";

interface IToast {
  type?: "success" | "error";
  id: string;
  message: string;
  duration: number;
}

const toastList = ref<IToast[]>([]);

export const useToast = () => {
  const toastType = ref<"success" | "error">("success");
  function addToast(
    message: string,
    duration: number,
    type: "success" | "error" = "success"
  ) {
    const id = crypto.randomUUID();
    toastType.value = type;
    toastList.value.push({ type: toastType.value, id, message, duration });

    setTimeout(() => {
      toastList.value = toastList.value.filter((toast) => toast.id !== id);
    }, duration);
  }

  function removeToast(id: string) {
    toastList.value = toastList.value.filter((toast) => toast.id !== id);
    toastType.value = "success";
  }

  return { toastList, addToast, removeToast };
};
