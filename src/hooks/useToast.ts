import { ToastDispatchContext, ToastStateContext } from "@/provider/toastProvider";
import { useContext, useEffect } from "react";

const useToast = () => {
  const toastList = useContext(ToastStateContext) || [];
  const setToastList = useContext(ToastDispatchContext);

  const onCloseToast = (id: number) => {
    const newToasts = toastList?.filter((toast) => toast.id !== id) || [];
    setToastList(newToasts);
  };

  const onAddToast = (message: string) => {
    const newId = Date.now() + toastList.length;

    if (toastList.length > 2) {
      toastList.pop();
    }

    console.log("message", message);

    const newToasts = [{ id: newId, message }, ...toastList];
    setToastList(newToasts);
  };

  useEffect(() => {
    console.log("toast", toastList);
  }, [toastList]);

  return { onCloseToast, onAddToast, toastList };
};

export default useToast;
