import { useContext } from "react";
import { ToastContext } from "../context/ToastContext/ToastContext";

const useToast = () => {
  const { showToast, isInToastProvider } = useContext(ToastContext);

  if (!isInToastProvider) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    showToast,
  };
};

export default useToast;
