import { createContext, useState, PropsWithChildren, useRef } from "react";
import ToastMessage from "../../components/product/ToastMessage/ToastMessage";

export const ToastContext = createContext<{
  showToast: ({
    message,
    type,
    duration,
  }: {
    message: string;
    type: "success" | "error";
    duration?: number;
  }) => void;
  isInToastProvider: boolean;
}>({
  showToast: () => {},
  isInToastProvider: false,
});

export function ToastProvider({ children }: PropsWithChildren) {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = ({
    message,
    type,
    duration = 3000,
  }: {
    message: string;
    type: "success" | "error";
    duration?: number;
  }) => {
    setToastMessage(message);
    setToastType(type);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      return;
    }

    setTimeout(() => {
      setToastMessage("");
      setToastType("pending");
    }, duration);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        isInToastProvider: true,
      }}
    >
      {toastMessage && (
        <ToastMessage toastMessage={toastMessage} toastType={toastType} />
      )}
      {children}
    </ToastContext.Provider>
  );
}
