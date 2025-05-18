import { createContext } from "react";
import { ERROR_TYPE } from "../components/toastProvider/ToastProvider";

interface ToastContextType {
  showToast: (type: ERROR_TYPE) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
