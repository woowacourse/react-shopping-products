import { ToastService, type ToastInfo } from "@/components/Toast/ToastService";
import { useRef } from "react";

const useToast = () => {
  const toastService = ToastService.getInstance();
  const toastId = useRef(0);

  const addToast = ({ type, message }: Omit<ToastInfo, "id">) => {
    const id = String(toastId.current++);
    toastService.addToast(id, type, message);
  };

  return {
    addToast,
  };
};

export default useToast;
