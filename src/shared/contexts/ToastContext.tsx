import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { TOAST_TYPES, ToastType } from "../config/toast";
import Toast from "../../shared/ui/Toast/Toast";

interface ToastContextType {
  showToast: ({ message, type, duration }: ShowToastProps) => void;
}

interface ShowToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>(TOAST_TYPES.INFO);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, []);

  const showToast = useCallback(
    ({ message, type = TOAST_TYPES.INFO, duration = 4000 }: ShowToastProps) => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }

      setType(type);
      setMessage(message);

      toastTimer.current = setTimeout(() => {
        setMessage("");
        toastTimer.current = null;
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {!!message && <Toast message={message} type={type} />}
    </ToastContext.Provider>
  );
};
