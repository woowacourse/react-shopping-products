import { useContext } from "react";
import { ToastContext } from "../context/ToastContext/ToastContext";

const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return toastContext;
};

export default useToast;
