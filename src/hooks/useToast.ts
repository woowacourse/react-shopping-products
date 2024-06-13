import { ToastDispatchContext, ToastStateContext } from "@/provider/toastProvider";
import { useContext } from "react";

const useToast = () => {
  const toastList = useContext(ToastStateContext) || [];
  const setToastList = useContext(ToastDispatchContext);
  const TOAST_MAX_COUNT = 2;

  const onCloseToast = (id: number) => {
    const newToasts = toastList?.filter((toast) => toast.id !== id) || [];
    setToastList(newToasts);
  };

  const onAddToast = (message: string) => {
    const newId = Date.now() + toastList.length;

    if (toastList.length > TOAST_MAX_COUNT) {
      toastList.pop();
    }

    const newToasts = [{ id: newId, message }, ...toastList];
    setToastList(newToasts);
  };

  return { onCloseToast, onAddToast, toastList };
};

export default useToast;
