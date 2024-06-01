import { ToastDispatchContext, ToastStateContext } from "@/provider/toastProvider";
import { useContext } from "react";

const useToast = () => {
  const toastList = useContext(ToastStateContext) || [];
  const setToastList = useContext(ToastDispatchContext);

  const onCloseToast = (id: number) => {
    const newToasts = toastList?.filter((toast) => toast.id !== id) || [];
    setToastList(newToasts);
  };

  const onAddToast = (message: string) => {
    const newId = Date.now() + toastList.length;
    const newToasts = [...toastList, { id: newId, message }];
    setToastList(newToasts);
  };

  return { onCloseToast, onAddToast, toastList };
};

export default useToast;
