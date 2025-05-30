import { ReactNode, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { createContext } from "react";
import ErrorToast from "../components/errorToast/ErrorToast";

const TOAST_TIME = 3000;

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  const showToast = useCallback((message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(""), TOAST_TIME);
  }, []);

  const renderLocation = document.querySelector(".container") ?? document.body;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(<ErrorToast errorMessage={message} />, renderLocation)}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
};
